import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  CheckSquare,
  CreditCard,
  Banknote,
  TrendingUp,
  Users,
  Megaphone,
  LifeBuoy,
  ScrollText,
  Activity,
  Settings,
  GraduationCap,
  School,
  ClipboardList,
  CalendarCheck,
  BarChart3,
  Wallet,
  BookOpen,
  Pencil,
  CalendarDays,
  Award,
  User,
  Bell,
  Download,
  Baby,
  Receipt,
  HandCoins,
  FileText,
  Library,
  PlusSquare,
  ArrowRightLeft,
  Undo2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import type { AppRole } from "@/store/role";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const ROLE_NAV: Record<AppRole, NavSection[]> = {
  super_admin: [
    {
      items: [{ to: "/app", label: "Overview", icon: LayoutDashboard }],
    },
    {
      title: "Platform",
      items: [
        { to: "/app/schools", label: "All Schools", icon: Building2 },
        { to: "/app/approvals", label: "Approvals", icon: CheckSquare },
        { to: "/app/subscriptions", label: "Subscriptions", icon: CreditCard },
        { to: "/app/payments", label: "Payment Verification", icon: Banknote },
        { to: "/app/revenue", label: "Revenue Analytics", icon: TrendingUp },
        { to: "/app/global-users", label: "Global Users", icon: Users },
      ],
    },
    {
      title: "Operations",
      items: [
        { to: "/app/announcements", label: "Announcements", icon: Megaphone },
        { to: "/app/tickets", label: "Support Tickets", icon: LifeBuoy },
        { to: "/app/audit", label: "Audit Logs", icon: ScrollText },
        { to: "/app/health", label: "Server Health", icon: Activity },
        { to: "/app/settings", label: "Settings", icon: Settings },
      ],
    },
  ],
  school_owner: schoolMgmtNav(),
  principal: schoolMgmtNav(),
  teacher: [
    { items: [{ to: "/app", label: "Dashboard", icon: LayoutDashboard }] },
    {
      title: "Teaching",
      items: [
        { to: "/app/my-classes", label: "My Classes", icon: BookOpen },
        { to: "/app/attendance-entry", label: "Attendance Entry", icon: CalendarCheck },
        { to: "/app/marks-entry", label: "Marks Entry", icon: Pencil },
        { to: "/app/timetable", label: "Timetable", icon: CalendarDays },
        { to: "/app/student-results", label: "Student Results", icon: Award },
      ],
    },
  ],
  student: [
    { items: [{ to: "/app", label: "Dashboard", icon: LayoutDashboard }] },
    {
      title: "My School",
      items: [
        { to: "/app/profile", label: "Profile", icon: User },
        { to: "/app/my-attendance", label: "Attendance", icon: CalendarCheck },
        { to: "/app/grades", label: "Grades", icon: Award },
        { to: "/app/timetable", label: "Timetable", icon: CalendarDays },
        { to: "/app/announcements-feed", label: "Announcements", icon: Bell },
        { to: "/app/files", label: "Files", icon: Download },
      ],
    },
  ],
  parent: [
    { items: [{ to: "/app", label: "Child Dashboard", icon: Baby }] },
    {
      title: "Tracking",
      items: [
        { to: "/app/grades", label: "Results", icon: Award },
        { to: "/app/my-attendance", label: "Attendance", icon: CalendarCheck },
        { to: "/app/fees-status", label: "Fees Status", icon: Wallet },
      ],
    },
  ],
  accountant: [
    { items: [{ to: "/app", label: "Overview", icon: LayoutDashboard }] },
    {
      title: "Finance",
      items: [
        { to: "/app/fee-collection", label: "Fee Collection", icon: HandCoins },
        { to: "/app/expenses", label: "Expenses", icon: Receipt },
        { to: "/app/payroll", label: "Payroll", icon: Banknote },
        { to: "/app/invoices", label: "Invoices", icon: FileText },
        { to: "/app/finance-reports", label: "Reports", icon: BarChart3 },
      ],
    },
  ],
  librarian: [
    { items: [{ to: "/app", label: "Overview", icon: LayoutDashboard }] },
    {
      title: "Library",
      items: [
        { to: "/app/books", label: "Books", icon: Library },
        { to: "/app/add-book", label: "Add Book", icon: PlusSquare },
        { to: "/app/borrow", label: "Borrow", icon: ArrowRightLeft },
        { to: "/app/return", label: "Return", icon: Undo2 },
        { to: "/app/fines", label: "Fines", icon: AlertCircle },
      ],
    },
  ],
};

function schoolMgmtNav(): NavSection[] {
  return [
    { items: [{ to: "/app", label: "Overview", icon: LayoutDashboard }] },
    {
      title: "School",
      items: [
        { to: "/app/school-profile", label: "School Profile", icon: School },
        { to: "/app/teachers", label: "Teachers", icon: GraduationCap },
        { to: "/app/students", label: "Students", icon: Users },
        { to: "/app/classes", label: "Classes & Sections", icon: BookOpen },
        { to: "/app/section-distribution", label: "Section Distribution", icon: Sparkles },
      ],
    },
    {
      title: "Insights",
      items: [
        { to: "/app/attendance-overview", label: "Attendance", icon: ClipboardList },
        { to: "/app/reports", label: "Reports", icon: BarChart3 },
        { to: "/app/finance-overview", label: "Finance", icon: Wallet },
      ],
    },
  ];
}
