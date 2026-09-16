export type UserRole = 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department: string;
  phone: string;
}

export interface StudentProfile extends UserProfile {
  rollNo: string;
  registerNo: string;
  batch: string;
  semester: number;
  section: string;
  cgpa: number;
  overallAttendance: number;
  pendingAssignments: number;
  feeDueAmount: number;
  mentorName: string;
}

export interface FacultyProfile extends UserProfile {
  employeeId: string;
  designation: string;
  handledSubjects: string[];
  assignedClasses: string[];
}

export interface HodProfile extends FacultyProfile {
  departmentCode?: string;
}

export interface AdminProfile extends UserProfile {
  adminLevel?: string;
}

export interface TimetableSlot {
  id: string;
  period: number;
  timeSlot: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  roomNo: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
}

export interface SubjectAttendance {
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
}

export interface InternalMark {
  subjectCode: string;
  subjectName: string;
  internal1: number; // Out of 100
  internal2: number; // Out of 100
  modelExam: number; // Out of 100
  assignmentAvg: number; // Out of 10
  attendanceMarks: number; // Out of 5
  totalCalculatedInternal: number; // Out of 20 or 40
  gradePrediction: string;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  type: 'LEAVE' | 'ON_DUTY' | 'MEDICAL';
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  documentUrl?: string;
  status: 'PENDING' | 'APPROVED_BY_FACULTY' | 'APPROVED_BY_HOD' | 'REJECTED';
  appliedOn: string;
  remarks?: string;
}

export interface HallTicketInfo {
  rollNo: string;
  studentName: string;
  registerNo: string;
  degree: string;
  branch: string;
  semester: number;
  examCenter: string;
  photoUrl: string;
  qrCodeData: string;
  courses: {
    subjectCode: string;
    subjectName: string;
    examDate: string;
    session: 'FN' | 'AN';
  }[];
}

export interface FeeStatus {
  tuitionFee: { total: number; paid: number; pending: number };
  hostelFee?: { total: number; paid: number; pending: number };
  busFee?: { total: number; paid: number; pending: number };
  examFee: { total: number; paid: number; pending: number };
  dueDate: string;
  transactionHistory: { id: string; date: string; amount: number; description: string; status: 'SUCCESS' | 'PENDING' }[];
}

export interface StudyMaterial {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  unitNo: number;
  facultyName: string;
  uploadedDate: string;
  fileSize: string;
  downloadUrl: string;
  fileType: 'pdf' | 'doc' | 'ppt' | 'zip';
}

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  dueDate: string;
  maxMarks: number;
  status: 'SUBMITTED' | 'PENDING' | 'GRADED';
  obtainedMarks?: number;
  description: string;
}

export interface PlacementDrive {
  id: string;
  companyName: string;
  companyLogo: string;
  role: string;
  packageLpa: string;
  driveDate: string;
  eligibilityCgpa: number;
  eligibleBranches: string[];
  maxArrearsAllowed: number;
  venue: string;
  rounds: string[];
  registrationDeadline: string;
  appliedStatus: boolean;
}

export interface Notice {
  id: string;
  title: string;
  category: 'ACADEMIC' | 'EXAM' | 'PLACEMENT' | 'EVENT' | 'GENERAL';
  content: string;
  postedBy: string;
  postedDate: string;
  isImportant: boolean;
  targetRole: 'ALL' | 'STUDENT' | 'FACULTY';
}

export interface CodeDeliverableFile {
  path: string;
  name: string;
  language: 'dart' | 'java' | 'sql' | 'json' | 'markdown' | 'yaml' | 'xml';
  category: 'FLUTTER' | 'SPRING_BOOT' | 'MYSQL' | 'ER_DIAGRAM' | 'REST_APIS' | 'DOCUMENTATION';
  content: string;
}

export interface AiRiskPredictionResult {
  riskLevel: 'CRITICAL' | 'MODERATE' | 'SAFE';
  predictedEndSemAttendance: number;
  safeLeavesRemaining: number;
  classesNeededFor75: number;
  riskAnalysis: string;
  recommendations: string[];
  subjectAlerts?: { subjectCode: string; status: 'DANGER' | 'WARNING' | 'GOOD'; advice: string }[];
}

export interface AiPerformancePredictionResult {
  predictedSGPA: number;
  confidenceScore: string;
  weakSubjects: string[];
  strongSubjects: string[];
  strategicAdvice: string[];
  gradeDistribution: { subject: string; expectedGrade: string }[];
}

export interface AiPlacementReadinessResult {
  readinessScore: number;
  eligibilityStatus: 'ELIGIBLE' | 'CONDITIONALLY_ELIGIBLE' | 'INELIGIBLE';
  skillGaps: string[];
  strengths: string[];
  recommendedCompanies: string[];
  roadmap30Days: string[];
}
