// Mock seed data — replace with real API in Phase 3.
export const SCHOOLS = [
  { id: "S001", name: "Bole International Academy", city: "Addis Ababa", students: 1284, plan: "Standard", status: "active", joined: "2023-08-15" },
  { id: "S002", name: "Hawassa Lake View School", city: "Hawassa", students: 642, plan: "Starter", status: "active", joined: "2024-01-22" },
  { id: "S003", name: "Mekelle Heritage School", city: "Mekelle", students: 1830, plan: "Premium", status: "active", joined: "2022-11-03" },
  { id: "S004", name: "Adama Future Academy", city: "Adama", students: 412, plan: "Trial", status: "trial", joined: "2025-03-10" },
  { id: "S005", name: "Bahir Dar Sunshine School", city: "Bahir Dar", students: 890, plan: "Standard", status: "active", joined: "2023-05-18" },
  { id: "S006", name: "Gondar Highland School", city: "Gondar", students: 533, plan: "Starter", status: "suspended", joined: "2024-04-12" },
  { id: "S007", name: "Jimma Coffee Valley School", city: "Jimma", students: 720, plan: "Standard", status: "active", joined: "2024-07-29" },
  { id: "S008", name: "Dire Dawa Modern School", city: "Dire Dawa", students: 1110, plan: "Premium", status: "active", joined: "2022-02-14" },
];

export const APPROVALS = [
  { id: "A001", school: "Wolaita Sodo Academy", type: "New school", submitted: "2025-04-18", contact: "principal@wolaita.edu" },
  { id: "A002", school: "Adigrat International", type: "Plan upgrade", submitted: "2025-04-19", contact: "owner@adigrat.edu" },
  { id: "A003", school: "Arba Minch Lakeside", type: "New school", submitted: "2025-04-20", contact: "info@arbaminch.edu" },
  { id: "A004", school: "Debre Birhan College Prep", type: "New school", submitted: "2025-04-21", contact: "admin@debrebirhan.edu" },
];

export const SUBSCRIPTIONS = SCHOOLS.map((s, i) => ({
  id: `SUB${1000 + i}`,
  school: s.name,
  plan: s.plan,
  amount: s.plan === "Premium" ? 12000 : s.plan === "Standard" ? 4500 : s.plan === "Starter" ? 1500 : 0,
  status: s.status === "trial" ? "trial" : i % 5 === 0 ? "past_due" : "active",
  renewsOn: "2025-05-15",
}));

export const PAYMENTS = [
  { id: "P9001", school: "Bole International Academy", method: "Telebirr", amount: 4500, ref: "TB-9XKL-2025", date: "2025-04-20", status: "pending" },
  { id: "P9002", school: "Mekelle Heritage School", method: "CBE Birr", amount: 12000, ref: "CBE-7723-2025", date: "2025-04-21", status: "pending" },
  { id: "P9003", school: "Bahir Dar Sunshine School", method: "Bank Transfer", amount: 4500, ref: "BT-2025-44", date: "2025-04-19", status: "verified" },
  { id: "P9004", school: "Jimma Coffee Valley", method: "Telebirr", amount: 4500, ref: "TB-3FFP-2025", date: "2025-04-18", status: "rejected" },
];

export const GLOBAL_USERS = [
  { id: "U001", name: "Selamawit Tesfaye", email: "selam@bole.edu", role: "Principal", school: "Bole International", status: "active" },
  { id: "U002", name: "Abdi Geleta", email: "abdi@hawassa.edu", role: "Owner", school: "Hawassa Lake View", status: "active" },
  { id: "U003", name: "Hanna Girma", email: "hanna@mekelle.edu", role: "Accountant", school: "Mekelle Heritage", status: "active" },
  { id: "U004", name: "Yonas Bekele", email: "yonas@adama.edu", role: "Teacher", school: "Adama Future", status: "invited" },
  { id: "U005", name: "Marta Alemu", email: "marta@bahirdar.edu", role: "Librarian", school: "Bahir Dar Sunshine", status: "active" },
  { id: "U006", name: "Dawit Lemma", email: "dawit@gondar.edu", role: "Owner", school: "Gondar Highland", status: "suspended" },
];

export const ANNOUNCEMENTS = [
  { id: "AN1", title: "Platform maintenance Saturday 2 AM", audience: "All schools", date: "2025-04-22", status: "published" },
  { id: "AN2", title: "New: Telebirr direct integration", audience: "All schools", date: "2025-04-15", status: "published" },
  { id: "AN3", title: "Term 3 reporting templates available", audience: "Principals", date: "2025-04-10", status: "published" },
  { id: "AN4", title: "Holiday schedule reminder", audience: "All users", date: "2025-04-02", status: "draft" },
];

export const TICKETS = [
  { id: "T2401", subject: "Cannot mark attendance offline", school: "Bole International", priority: "high", status: "open", updated: "2h ago" },
  { id: "T2402", subject: "Payroll PDF export issue", school: "Hawassa Lake View", priority: "medium", status: "in_progress", updated: "5h ago" },
  { id: "T2403", subject: "Add Tigrigna report cards", school: "Mekelle Heritage", priority: "low", status: "open", updated: "1d ago" },
  { id: "T2404", subject: "Reset 2FA for owner", school: "Adama Future", priority: "medium", status: "resolved", updated: "2d ago" },
];

export const AUDIT_LOGS = [
  { id: "L1", actor: "Selamawit T.", action: "Updated student record", target: "STU-1284", ip: "10.0.0.4", time: "09:42 AM" },
  { id: "L2", actor: "Abdi G.", action: "Approved payment", target: "P9003", ip: "10.0.0.7", time: "09:30 AM" },
  { id: "L3", actor: "System", action: "Auto-distributed sections", target: "Grade 9", ip: "internal", time: "09:15 AM" },
  { id: "L4", actor: "Hanna G.", action: "Issued invoice", target: "INV-2025-0412", ip: "10.0.0.12", time: "08:58 AM" },
  { id: "L5", actor: "Dawit L.", action: "Login failed", target: "—", ip: "10.0.0.99", time: "08:30 AM" },
];

export const TEACHERS = [
  { id: "T01", name: "Bethel Asfaw", subject: "Mathematics", classes: 4, email: "bethel@school.edu", phone: "+251911223344", status: "active" },
  { id: "T02", name: "Mekonnen Tadesse", subject: "Physics", classes: 3, email: "mekonnen@school.edu", phone: "+251911334455", status: "active" },
  { id: "T03", name: "Tigist Hailu", subject: "English", classes: 5, email: "tigist@school.edu", phone: "+251911445566", status: "active" },
  { id: "T04", name: "Robel Demissie", subject: "Biology", classes: 3, email: "robel@school.edu", phone: "+251911556677", status: "on_leave" },
  { id: "T05", name: "Liya Mengistu", subject: "Amharic", classes: 4, email: "liya@school.edu", phone: "+251911667788", status: "active" },
  { id: "T06", name: "Solomon Berhane", subject: "Chemistry", classes: 3, email: "solomon@school.edu", phone: "+251911778899", status: "active" },
  { id: "T07", name: "Hewan Negash", subject: "History", classes: 4, email: "hewan@school.edu", phone: "+251911889900", status: "active" },
];

const FIRST = ["Abel", "Bethel", "Caleb", "Dani", "Eden", "Fikir", "Genet", "Henok", "Iman", "Jossy", "Kalkidan", "Liya", "Mahder", "Nahom", "Olana", "Petros", "Ruth", "Samuel", "Tsion", "Yared", "Zemen", "Aster", "Bereket", "Dagim", "Ebenezer", "Feben"];
const LAST = ["Tadesse", "Hailu", "Bekele", "Girma", "Kebede", "Asfaw", "Tesfaye", "Demissie", "Mengistu", "Negash", "Solomon", "Worku", "Zewde", "Lemma"];
const GENDERS: ("M" | "F")[] = ["M", "F"];

export const STUDENTS = Array.from({ length: 64 }).map((_, i) => {
  const grade = 5 + (i % 8);
  const section = ["A", "B", "C", "D"][i % 4];
  const gender = GENDERS[i % 2];
  return {
    id: `STU${(1000 + i).toString()}`,
    name: `${FIRST[i % FIRST.length]} ${LAST[(i * 3) % LAST.length]}`,
    grade,
    section,
    gender,
    guardian: `${LAST[(i * 5) % LAST.length]}`,
    phone: `+25191${(1000000 + i * 137).toString().slice(-7)}`,
    feeStatus: i % 4 === 0 ? "overdue" : i % 7 === 0 ? "partial" : "paid",
    attendance: 88 + ((i * 11) % 12),
    average: 65 + ((i * 7) % 30),
  };
});

export const CLASSES = Array.from({ length: 8 }).flatMap((_, gIdx) => {
  const grade = gIdx + 5;
  return ["A", "B", "C", "D"].map((sec) => ({
    id: `G${grade}-${sec}`,
    grade,
    section: sec,
    teacher: TEACHERS[(gIdx + sec.charCodeAt(0)) % TEACHERS.length].name,
    students: 28 + ((gIdx + sec.charCodeAt(0)) % 8),
    room: `Room ${100 + gIdx * 4 + sec.charCodeAt(0) - 65}`,
  }));
});

export const TIMETABLE = [
  { day: "Mon", periods: ["Math", "English", "Physics", "Break", "Biology", "Amharic"] },
  { day: "Tue", periods: ["Chemistry", "Math", "History", "Break", "PE", "English"] },
  { day: "Wed", periods: ["Biology", "Amharic", "Math", "Break", "Physics", "Civics"] },
  { day: "Thu", periods: ["English", "Chemistry", "Math", "Break", "Geography", "Art"] },
  { day: "Fri", periods: ["Math", "Physics", "English", "Break", "ICT", "Library"] },
];

export const FEE_COLLECTIONS = STUDENTS.slice(0, 24).map((s, i) => ({
  id: `FC${2000 + i}`,
  student: s.name,
  grade: `${s.grade}-${s.section}`,
  term: "Term 3",
  amount: 1500 + (i % 5) * 250,
  paid: s.feeStatus === "paid" ? 1500 + (i % 5) * 250 : s.feeStatus === "partial" ? 800 : 0,
  method: ["Telebirr", "CBE Birr", "Cash", "Bank"][i % 4],
  date: "2025-04-1" + (i % 9),
  status: s.feeStatus,
}));

export const EXPENSES = [
  { id: "E1", category: "Utilities", vendor: "Ethio Telecom", amount: 12500, date: "2025-04-18", status: "approved" },
  { id: "E2", category: "Maintenance", vendor: "Bole Plumbing", amount: 4800, date: "2025-04-15", status: "approved" },
  { id: "E3", category: "Supplies", vendor: "Addis Stationery", amount: 9200, date: "2025-04-12", status: "pending" },
  { id: "E4", category: "Transport", vendor: "Selam Bus", amount: 18000, date: "2025-04-10", status: "approved" },
  { id: "E5", category: "Food", vendor: "Hawassa Catering", amount: 31200, date: "2025-04-08", status: "approved" },
];

export const PAYROLL = TEACHERS.map((t, i) => ({
  id: `PR${3000 + i}`,
  name: t.name,
  role: t.subject + " Teacher",
  base: 12000 + i * 500,
  bonus: i % 3 === 0 ? 1500 : 0,
  deductions: 800,
  net: 12000 + i * 500 + (i % 3 === 0 ? 1500 : 0) - 800,
  status: i === 6 ? "pending" : "paid",
}));

export const INVOICES = SCHOOLS.slice(0, 6).map((s, i) => ({
  id: `INV-2025-${(412 + i).toString().padStart(4, "0")}`,
  to: s.name,
  amount: 4500 + i * 300,
  issued: "2025-04-1" + (i % 9),
  due: "2025-04-2" + (i % 9),
  status: ["paid", "paid", "sent", "overdue", "draft", "paid"][i],
}));

export const BOOKS = [
  { id: "B001", title: "Fikir Eske Mekabir", author: "Haddis Alemayehu", category: "Literature", copies: 12, available: 7 },
  { id: "B002", title: "Oromay", author: "Bealu Girma", category: "Literature", copies: 8, available: 3 },
  { id: "B003", title: "Things Fall Apart", author: "Chinua Achebe", category: "Literature", copies: 10, available: 6 },
  { id: "B004", title: "Algebra Foundations", author: "Various", category: "Mathematics", copies: 25, available: 18 },
  { id: "B005", title: "Modern Biology", author: "P. H. Raven", category: "Science", copies: 15, available: 9 },
  { id: "B006", title: "Ethiopian History", author: "Bahru Zewde", category: "History", copies: 14, available: 11 },
  { id: "B007", title: "Physics Concepts", author: "Hewitt", category: "Science", copies: 12, available: 4 },
  { id: "B008", title: "Atlas of Ethiopia", author: "EMA", category: "Geography", copies: 6, available: 6 },
];

export const BORROWS = STUDENTS.slice(0, 10).map((s, i) => ({
  id: `BR${4000 + i}`,
  student: s.name,
  grade: `${s.grade}-${s.section}`,
  book: BOOKS[i % BOOKS.length].title,
  borrowed: "2025-04-0" + ((i % 9) + 1),
  due: "2025-04-2" + ((i % 9) + 1),
  status: i % 4 === 0 ? "overdue" : "borrowed",
}));

export const FINES = BORROWS.filter((b) => b.status === "overdue").map((b, i) => ({
  id: `FN${5000 + i}`,
  student: b.student,
  book: b.book,
  daysLate: 3 + i * 2,
  amount: (3 + i * 2) * 5,
  status: i === 0 ? "paid" : "unpaid",
}));

export const REVENUE_MONTHLY = [
  { m: "Nov", v: 142000 }, { m: "Dec", v: 168000 }, { m: "Jan", v: 195000 },
  { m: "Feb", v: 211000 }, { m: "Mar", v: 248000 }, { m: "Apr", v: 287000 },
];

export const ATTENDANCE_TREND = [
  { d: "Mon", v: 96.2 }, { d: "Tue", v: 95.8 }, { d: "Wed", v: 97.1 },
  { d: "Thu", v: 94.6 }, { d: "Fri", v: 93.2 },
];

export const ANNOUNCEMENTS_FEED = [
  { id: "F1", title: "Term 3 exams begin May 12", date: "2 days ago", body: "Please ensure all coursework is submitted before May 8." },
  { id: "F2", title: "Library closed Friday for inventory", date: "4 days ago", body: "The library will reopen Monday morning." },
  { id: "F3", title: "Parent-teacher meetings", date: "1 week ago", body: "Sign up via the parent portal." },
];

export const FILES = [
  { id: "DOC1", name: "Term 3 Syllabus.pdf", subject: "All", size: "1.2 MB", date: "2025-04-15" },
  { id: "DOC2", name: "Math Worksheet 12.pdf", subject: "Mathematics", size: "340 KB", date: "2025-04-18" },
  { id: "DOC3", name: "Physics Lab Manual.pdf", subject: "Physics", size: "2.1 MB", date: "2025-04-10" },
  { id: "DOC4", name: "English Reading List.pdf", subject: "English", size: "180 KB", date: "2025-04-05" },
];
