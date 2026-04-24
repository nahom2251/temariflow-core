package com.temariflow.service;

import com.temariflow.dto.ErpDtos.*; import com.temariflow.entity.*; import com.temariflow.repository.*; import lombok.RequiredArgsConstructor; import org.springframework.stereotype.Service; import java.util.*; import java.util.stream.*;

@Service @RequiredArgsConstructor
public class SectionDistributionService {
  private final ErpLookup lookup; private final StudentProfileRepository students; private final SectionRepository sections;
  public Map<String, Long> distribute(DistributionRequest r) {
    var sid = lookup.schoolId(); var targetSections = r.sectionIds().stream().map(id -> sections.findById(id).orElseThrow()).toList(); var pool = new ArrayList<>(students.findBySchoolIdAndGradeId(sid, r.gradeId())); Collections.shuffle(pool);
    var male = pool.stream().filter(s -> s.getGender() == Gender.MALE).collect(Collectors.toCollection(ArrayList::new)); var female = pool.stream().filter(s -> s.getGender() == Gender.FEMALE).collect(Collectors.toCollection(ArrayList::new)); var other = pool.stream().filter(s -> s.getGender() != Gender.MALE && s.getGender() != Gender.FEMALE).collect(Collectors.toCollection(ArrayList::new));
    int i = 0; for (var group : List.of(male, female, other)) for (var student : group) { student.setSection(targetSections.get(i % targetSections.size())); students.save(student); i++; }
    return targetSections.stream().collect(Collectors.toMap(Section::getName, sec -> students.findBySchoolIdAndGradeId(sid, r.gradeId()).stream().filter(s -> s.getSection()!=null && s.getSection().getId().equals(sec.getId())).count()));
  }
  public StudentProfile move(ManualMoveRequest r) { var student = students.findById(r.studentId()).orElseThrow(); student.setSection(sections.findById(r.sectionId()).orElseThrow()); return students.save(student); }
}
