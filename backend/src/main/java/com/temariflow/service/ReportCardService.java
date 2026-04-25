package com.temariflow.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.qrcode.QRCodeWriter;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.temariflow.entity.*;
import com.temariflow.exception.ApiException;
import com.temariflow.repository.MarkEntryRepository;
import com.temariflow.repository.ResultSummaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Service @RequiredArgsConstructor
public class ReportCardService {
  private final ResultSummaryRepository summaries;
  private final MarkEntryRepository marks;
  private final FileStorageService storage;
  private final ErpLookup lookup;
  @Value("${app.public-base-url:http://localhost:8080}") private String publicBaseUrl;

  public StoredFile generate(UUID resultId, String signature) {
    var rs = summaries.findById(resultId).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Result not found"));
    if (!rs.getSchool().getId().equals(lookup.schoolId())) throw new ApiException(HttpStatus.FORBIDDEN, "Cross-tenant access");
    if (signature != null) rs.setSignature(signature);

    var pdf = buildPdf(rs);
    var stored = storage.store("REPORT_CARD",
        "report-" + rs.getStudent().getStudentNumber() + "-" + rs.getExam().getName().replaceAll("\\s+", "_") + ".pdf",
        "application/pdf", pdf, "ResultSummary", rs.getId());
    rs.setReportCardToken(stored.getDownloadToken());
    summaries.save(rs);
    return stored;
  }

  private byte[] buildPdf(ResultSummary rs) {
    try {
      var out = new ByteArrayOutputStream();
      var doc = new Document(PageSize.A4, 36, 36, 36, 36);
      PdfWriter.getInstance(doc, out);
      doc.open();

      var school = rs.getSchool();
      var student = rs.getStudent();
      var exam = rs.getExam();

      var titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
      var headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
      var body = FontFactory.getFont(FontFactory.HELVETICA, 11);

      doc.add(new Paragraph(school.getName(), titleFont));
      doc.add(new Paragraph("Official Student Report Card", headerFont));
      doc.add(new Paragraph("Issued: " + LocalDate.now(), body));
      doc.add(Chunk.NEWLINE);

      var info = new PdfPTable(2); info.setWidthPercentage(100);
      info.addCell(cell("Student", headerFont)); info.addCell(cell(student.getUser() != null ? student.getUser().getFullName() : student.getStudentNumber(), body));
      info.addCell(cell("Student #", headerFont)); info.addCell(cell(student.getStudentNumber(), body));
      info.addCell(cell("Grade", headerFont)); info.addCell(cell(student.getGrade() != null ? student.getGrade().getName() : "-", body));
      info.addCell(cell("Section", headerFont)); info.addCell(cell(student.getSection() != null ? student.getSection().getName() : "-", body));
      info.addCell(cell("Exam", headerFont)); info.addCell(cell(exam.getName(), body));
      doc.add(info); doc.add(Chunk.NEWLINE);

      var marksTbl = new PdfPTable(new float[]{4f, 2f, 2f, 2f}); marksTbl.setWidthPercentage(100);
      marksTbl.addCell(cell("Subject", headerFont)); marksTbl.addCell(cell("Mark", headerFont));
      marksTbl.addCell(cell("Max", headerFont)); marksTbl.addCell(cell("%", headerFont));
      var rows = marks.findBySchoolIdAndExamId(rs.getSchool().getId(), rs.getExam().getId()).stream()
          .filter(m -> m.getStudent().getId().equals(student.getId())).toList();
      for (var m : rows) {
        marksTbl.addCell(cell(m.getSubject().getName(), body));
        marksTbl.addCell(cell(m.getMark().toPlainString(), body));
        marksTbl.addCell(cell(m.getMaxMark().toPlainString(), body));
        var pct = m.getMark().multiply(BigDecimal.valueOf(100)).divide(m.getMaxMark(), 2, java.math.RoundingMode.HALF_UP);
        marksTbl.addCell(cell(pct.toPlainString() + "%", body));
      }
      doc.add(marksTbl); doc.add(Chunk.NEWLINE);

      var summary = new PdfPTable(2); summary.setWidthPercentage(60);
      summary.addCell(cell("Average", headerFont)); summary.addCell(cell(rs.getAverage().toPlainString() + "%", body));
      summary.addCell(cell("Class Rank", headerFont)); summary.addCell(cell("#" + rs.getRankInClass(), body));
      summary.addCell(cell("Decision", headerFont)); summary.addCell(cell(rs.getDecision(), body));
      doc.add(summary); doc.add(Chunk.NEWLINE);

      if (rs.getTeacherComment() != null) {
        doc.add(new Paragraph("Teacher Comment:", headerFont));
        doc.add(new Paragraph(rs.getTeacherComment(), body));
        doc.add(Chunk.NEWLINE);
      }
      doc.add(new Paragraph("Authorized Signature: " + (rs.getSignature() != null ? rs.getSignature() : "_______________"), body));

      var verifyUrl = publicBaseUrl + "/api/files/verify/" + rs.getId();
      var qr = qrPng(verifyUrl);
      var img = Image.getInstance(qr);
      img.scaleToFit(110, 110);
      img.setAlignment(Image.ALIGN_RIGHT);
      doc.add(img);
      doc.add(new Paragraph("Verify: " + verifyUrl, FontFactory.getFont(FontFactory.HELVETICA, 8)));
      doc.close();
      return out.toByteArray();
    } catch (Exception e) {
      throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "PDF error: " + e.getMessage());
    }
  }

  private PdfPCell cell(String txt, Font f) {
    var c = new PdfPCell(new Phrase(txt, f)); c.setPadding(6f); return c;
  }

  private byte[] qrPng(String text) throws Exception {
    var matrix = new QRCodeWriter().encode(text, BarcodeFormat.QR_CODE, 220, 220);
    BufferedImage img = MatrixToImageWriter.toBufferedImage(matrix);
    var baos = new ByteArrayOutputStream();
    ImageIO.write(img, "PNG", baos);
    return baos.toByteArray();
  }
}
