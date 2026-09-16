import {
  StudentProfile,
  FacultyProfile,
  HodProfile,
  AdminProfile,
  TimetableSlot,
  SubjectAttendance,
  InternalMark,
  LeaveRequest,
  HallTicketInfo,
  FeeStatus,
  StudyMaterial,
  Assignment,
  PlacementDrive,
  Notice,
} from '../types';
import nitheeswaranPhoto from '../assets/images/k_nitheeswaran_1789578329475.jpg';

export const mockStudent: StudentProfile = {
  id: 'STU-2023-042',
  name: 'K NITHEESWARAN',
  email: 'knitheeswaran.cse23@smartcollege.edu.in',
  role: 'STUDENT',
  rollNo: '21CS042',
  registerNo: '922521104042',
  department: 'Computer Science & Engineering',
  batch: '2021-2025',
  semester: 6,
  section: 'A',
  cgpa: 8.42,
  overallAttendance: 78.5,
  pendingAssignments: 2,
  feeDueAmount: 0,
  phone: '+91 98765 43210',
  mentorName: 'Dr. S. Ramesh, Associate Professor',
  avatarUrl: nitheeswaranPhoto,
};

export const mockFaculty: FacultyProfile = {
  id: 'FAC-108',
  name: 'Dr. S. Ramesh',
  email: 's.ramesh@smartcollege.edu.in',
  role: 'FACULTY',
  employeeId: 'EMP-CSE-018',
  department: 'Computer Science & Engineering',
  designation: 'Associate Professor & Class Advisor',
  phone: '+91 94432 10987',
  handledSubjects: ['CS8651 - Mobile Application Development', 'CS8691 - Artificial Intelligence'],
  assignedClasses: ['III Year CSE - Sec A', 'IV Year CSE - Sec B'],
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
};

export const mockHod: FacultyProfile = {
  id: 'HOD-CSE-01',
  name: 'Dr. M. Anitha',
  email: 'hod.cse@smartcollege.edu.in',
  role: 'HOD',
  employeeId: 'EMP-CSE-001',
  department: 'Computer Science & Engineering',
  designation: 'Professor & Head of Department',
  phone: '+91 98421 55678',
  handledSubjects: ['CS8079 - Structural Software Architecture'],
  assignedClasses: ['Dept of CSE - All Batches'],
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
};

export const mockAdmin = {
  id: 'ADM-001',
  name: 'Admin Controller',
  email: 'admin@smartcollege.edu.in',
  role: 'ADMIN' as const,
  department: 'Central Administration & COE',
  phone: '+91 04324 265555',
};

export const mockTimetable: TimetableSlot[] = [
  { id: '1', period: 1, timeSlot: '09:15 - 10:05 AM', subjectCode: 'CS8651', subjectName: 'Mobile Application Dev', facultyName: 'Dr. S. Ramesh', roomNo: 'CS-Lab 2', day: 'Monday' },
  { id: '2', period: 2, timeSlot: '10:05 - 10:55 AM', subjectCode: 'CS8691', subjectName: 'Artificial Intelligence', facultyName: 'Mrs. K. Priya', roomNo: 'Hall 302', day: 'Monday' },
  { id: '3', period: 3, timeSlot: '11:10 - 12:00 PM', subjectCode: 'CS8601', subjectName: 'Compiler Design', facultyName: 'Mr. P. Karthik', roomNo: 'Hall 302', day: 'Monday' },
  { id: '4', period: 4, timeSlot: '12:00 - 12:50 PM', subjectCode: 'CS8602', subjectName: 'Compiler Design Lab', facultyName: 'Mr. P. Karthik', roomNo: 'CS-Lab 1', day: 'Monday' },
  { id: '5', period: 5, timeSlot: '01:45 - 02:35 PM', subjectCode: 'CS8603', subjectName: 'Distributed Systems', facultyName: 'Dr. M. Anitha', roomNo: 'Hall 302', day: 'Monday' },
  { id: '6', period: 6, timeSlot: '02:35 - 03:25 PM', subjectCode: 'CS8604', subjectName: 'Cloud Computing', facultyName: 'Mrs. R. Deepa', roomNo: 'Hall 302', day: 'Monday' },
  { id: '7', period: 7, timeSlot: '03:25 - 04:15 PM', subjectCode: 'CS8611', subjectName: 'Mini Project & Placement Seminar', facultyName: 'Dr. S. Ramesh', roomNo: 'Auditorium', day: 'Monday' },
];

export const mockSubjectAttendance: SubjectAttendance[] = [
  { subjectCode: 'CS8651', subjectName: 'Mobile Application Development', facultyName: 'Dr. S. Ramesh', totalClasses: 48, attendedClasses: 42, percentage: 87.5, status: 'SAFE' },
  { subjectCode: 'CS8691', subjectName: 'Artificial Intelligence', facultyName: 'Mrs. K. Priya', totalClasses: 52, attendedClasses: 44, percentage: 84.6, status: 'SAFE' },
  { subjectCode: 'CS8601', subjectName: 'Compiler Design', facultyName: 'Mr. P. Karthik', totalClasses: 50, attendedClasses: 36, percentage: 72.0, status: 'CRITICAL' },
  { subjectCode: 'CS8603', subjectName: 'Distributed Systems', facultyName: 'Dr. M. Anitha', totalClasses: 46, attendedClasses: 35, percentage: 76.1, status: 'WARNING' },
  { subjectCode: 'CS8604', subjectName: 'Cloud Computing', facultyName: 'Mrs. R. Deepa', totalClasses: 44, attendedClasses: 38, percentage: 86.4, status: 'SAFE' },
  { subjectCode: 'CS8611', subjectName: 'Mobile Application Lab', facultyName: 'Dr. S. Ramesh', totalClasses: 30, attendedClasses: 28, percentage: 93.3, status: 'SAFE' },
];

export const mockInternalMarks: InternalMark[] = [
  { subjectCode: 'CS8651', subjectName: 'Mobile Application Dev', internal1: 88, internal2: 92, modelExam: 90, assignmentAvg: 9.5, attendanceMarks: 5, totalCalculatedInternal: 18.8, gradePrediction: 'O' },
  { subjectCode: 'CS8691', subjectName: 'Artificial Intelligence', internal1: 82, internal2: 85, modelExam: 86, assignmentAvg: 9.0, attendanceMarks: 4.5, totalCalculatedInternal: 17.6, gradePrediction: 'A+' },
  { subjectCode: 'CS8601', subjectName: 'Compiler Design', internal1: 62, internal2: 68, modelExam: 65, assignmentAvg: 8.0, attendanceMarks: 3.5, totalCalculatedInternal: 13.8, gradePrediction: 'B+' },
  { subjectCode: 'CS8603', subjectName: 'Distributed Systems', internal1: 74, internal2: 78, modelExam: 75, assignmentAvg: 8.5, attendanceMarks: 4, totalCalculatedInternal: 15.7, gradePrediction: 'A' },
  { subjectCode: 'CS8604', subjectName: 'Cloud Computing', internal1: 85, internal2: 88, modelExam: 87, assignmentAvg: 9.5, attendanceMarks: 5, totalCalculatedInternal: 18.2, gradePrediction: 'A+' },
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'LR-2026-104',
    studentId: 'STU-2023-042',
    studentName: 'K NITHEESWARAN',
    rollNo: '21CS042',
    type: 'ON_DUTY',
    fromDate: '2026-08-02',
    toDate: '2026-08-03',
    totalDays: 2,
    reason: 'Attending State Level Hackathon organized by IIT Madras Innovation Cell.',
    status: 'APPROVED_BY_HOD',
    appliedOn: '2026-07-25',
    remarks: 'Approved. Produce participation certificate upon return.',
  },
  {
    id: 'LR-2026-118',
    studentId: 'STU-2023-042',
    studentName: 'K NITHEESWARAN',
    rollNo: '21CS042',
    type: 'MEDICAL',
    fromDate: '2026-07-15',
    toDate: '2026-07-16',
    totalDays: 2,
    reason: 'Fever and viral infection. Medical certificate attached.',
    status: 'APPROVED_BY_FACULTY',
    appliedOn: '2026-07-17',
    remarks: 'Verified medical certificate.',
  },
];

export const mockHallTicket: HallTicketInfo = {
  rollNo: '21CS042',
  studentName: 'K NITHEESWARAN',
  registerNo: '922521104042',
  degree: 'B.E.',
  branch: 'Computer Science and Engineering',
  semester: 6,
  examCenter: 'College Exam Hall Block - B (Center Code: 9225)',
  photoUrl: nitheeswaranPhoto,
  qrCodeData: 'COLLEGE-HALLTICKET-922521104042-SEM6-PASSED_VERIFIED',
  courses: [
    { subjectCode: 'CS8651', subjectName: 'Mobile Application Development', examDate: '2026-08-10', session: 'FN' },
    { subjectCode: 'CS8691', subjectName: 'Artificial Intelligence', examDate: '2026-08-12', session: 'FN' },
    { subjectCode: 'CS8601', subjectName: 'Compiler Design', examDate: '2026-08-14', session: 'AN' },
    { subjectCode: 'CS8603', subjectName: 'Distributed Systems', examDate: '2026-08-17', session: 'FN' },
    { subjectCode: 'CS8604', subjectName: 'Cloud Computing', examDate: '2026-08-19', session: 'AN' },
  ],
};

export const mockFeeStatus: FeeStatus = {
  tuitionFee: { total: 85000, paid: 85000, pending: 0 },
  hostelFee: { total: 45000, paid: 45000, pending: 0 },
  busFee: { total: 18000, paid: 18000, pending: 0 },
  examFee: { total: 2200, paid: 2200, pending: 0 },
  dueDate: '2026-09-15',
  transactionHistory: [
    { id: 'TXN-98231', date: '2026-06-10', amount: 85000, description: 'Semester 6 Tuition Fee Payment', status: 'SUCCESS' },
    { id: 'TXN-98232', date: '2026-06-10', amount: 45000, description: 'Annual Hostel & Mess Renewal', status: 'SUCCESS' },
    { id: 'TXN-99104', date: '2026-07-02', amount: 2200, description: 'Anna University End-Sem Exam Fee', status: 'SUCCESS' },
  ],
};

export const mockStudyMaterials: StudyMaterial[] = [
  { id: 'MAT-1', title: 'Flutter State Management & Clean Architecture Notes', subjectCode: 'CS8651', subjectName: 'Mobile Application Dev', unitNo: 3, facultyName: 'Dr. S. Ramesh', uploadedDate: '2026-07-20', fileSize: '4.2 MB', downloadUrl: '#', fileType: 'pdf' },
  { id: 'MAT-2', title: 'Compiler Design Syntax Tree & Parsing Tables Question Bank', subjectCode: 'CS8601', subjectName: 'Compiler Design', unitNo: 2, facultyName: 'Mr. P. Karthik', uploadedDate: '2026-07-18', fileSize: '2.8 MB', downloadUrl: '#', fileType: 'pdf' },
  { id: 'MAT-3', title: 'Spring Boot REST API & Microservices Presentation', subjectCode: 'CS8603', subjectName: 'Distributed Systems', unitNo: 4, facultyName: 'Dr. M. Anitha', uploadedDate: '2026-07-22', fileSize: '8.5 MB', downloadUrl: '#', fileType: 'ppt' },
];

export const mockAssignments: Assignment[] = [
  { id: 'ASN-1', title: 'Build a Flutter UI for Student Attendance Tracking', subjectCode: 'CS8651', subjectName: 'Mobile Application Dev', dueDate: '2026-08-01', maxMarks: 20, status: 'SUBMITTED', obtainedMarks: 19, description: 'Implement Material 3 components with Provider state management.' },
  { id: 'ASN-2', title: 'LL(1) & LALR Parser Implementation in C/Python', subjectCode: 'CS8601', subjectName: 'Compiler Design', dueDate: '2026-08-05', maxMarks: 20, status: 'PENDING', description: 'Construct canonical collection of LR(0) items for given grammar.' },
  { id: 'ASN-3', title: 'Deploy Spring Boot Service on Docker Container', subjectCode: 'CS8604', subjectName: 'Cloud Computing', dueDate: '2026-08-08', maxMarks: 20, status: 'PENDING', description: 'Create Dockerfile and docker-compose.yml for Spring Boot + MySQL.' },
];

export const mockPlacementDrives: PlacementDrive[] = [
  {
    id: 'DRV-2026-01',
    companyName: 'Zoho Corporation',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200',
    role: 'Software Development Engineer (SDE-1)',
    packageLpa: '8.5 - 12.0 LPA',
    driveDate: '2026-08-25',
    eligibilityCgpa: 7.5,
    eligibleBranches: ['CSE', 'IT', 'ECE', 'AI&DS'],
    maxArrearsAllowed: 0,
    venue: 'College Placement Cell & Lab 4',
    rounds: ['Aptitude & C Programming', 'Advanced Coding Round', 'Technical Interview 1', 'HR Round'],
    registrationDeadline: '2026-08-20',
    appliedStatus: true,
  },
  {
    id: 'DRV-2026-02',
    companyName: 'TCS Digital / Ninja',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    role: 'Systems Engineer & Digital Associate',
    packageLpa: '7.0 LPA',
    driveDate: '2026-09-05',
    eligibilityCgpa: 6.5,
    eligibleBranches: ['ALL BRANCHES'],
    maxArrearsAllowed: 1,
    venue: 'Online NQT Portal / Campus Auditorium',
    rounds: ['TCS NQT Cognitive + Coding', 'Technical + HR Interview'],
    registrationDeadline: '2026-08-28',
    appliedStatus: true,
  },
];

export const mockNotices: Notice[] = [
  {
    id: 'NTC-501',
    title: 'Schedule for Semester 6 Model Examinations - August 2026',
    category: 'EXAM',
    content: 'Model examinations for all III-year B.E./B.Tech branches will commence from August 10th, 2026. Hall tickets can be downloaded directly from the Smart College Mobile App.',
    postedBy: 'Controller of Examinations (COE)',
    postedDate: '2026-07-27',
    isImportant: true,
    targetRole: 'ALL',
  },
  {
    id: 'NTC-502',
    title: 'Zoho Campus Placement Registration Open for 2025/2026 Batch',
    category: 'PLACEMENT',
    content: 'All eligible students with CGPA >= 7.5 and no active arrears are instructed to register on the placement tab before August 20th.',
    postedBy: 'Head - Training & Placements',
    postedDate: '2026-07-26',
    isImportant: true,
    targetRole: 'STUDENT',
  },
];
