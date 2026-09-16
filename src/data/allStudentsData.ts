export interface DepartmentStudent {
  id: string;
  rollNo: string;
  registerNo: string;
  name: string;
  department: string; // 'CSE' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL' | 'IT' | 'AIDS'
  year: string; // 'I Year' | 'II Year' | 'III Year' | 'IV Year'
  section: string; // 'Sec A' | 'Sec B'
  email: string;
  phone: string;
  status: 'PRESENT' | 'ABSENT' | 'ON_DUTY';
}

export const DEPARTMENTS = [
  { code: 'CSE', name: 'Computer Science & Engineering', hodName: 'Dr. M. Anitha', totalLabs: 6, totalFaculty: 24 },
  { code: 'ECE', name: 'Electronics & Communication Engineering', hodName: 'Dr. K. Senthil Kumar', totalLabs: 5, totalFaculty: 20 },
  { code: 'EEE', name: 'Electrical & Electronics Engineering', hodName: 'Dr. R. Vijayaraghavan', totalLabs: 4, totalFaculty: 16 },
  { code: 'MECH', name: 'Mechanical Engineering', hodName: 'Dr. P. Sundaram', totalLabs: 5, totalFaculty: 18 },
  { code: 'CIVIL', name: 'Civil Engineering', hodName: 'Dr. V. Murugan', totalLabs: 4, totalFaculty: 12 },
  { code: 'IT', name: 'Information Technology', hodName: 'Dr. S. Balamurugan', totalLabs: 5, totalFaculty: 18 },
  { code: 'AIDS', name: 'Artificial Intelligence & Data Science', hodName: 'Dr. G. Preethi', totalLabs: 4, totalFaculty: 15 },
  { code: 'AIML', name: 'Artificial Intelligence & Machine Learning', hodName: 'Dr. N. Rajesh', totalLabs: 4, totalFaculty: 14 },
  { code: 'CSBS', name: 'Computer Science & Business Systems', hodName: 'Dr. T. Kavitha', totalLabs: 3, totalFaculty: 12 },
  { code: 'BME', name: 'Biomedical Engineering', hodName: 'Dr. A. Meenakshi', totalLabs: 4, totalFaculty: 11 },
  { code: 'BIOTECH', name: 'Biotechnology', hodName: 'Dr. C. Saravanan', totalLabs: 4, totalFaculty: 10 },
  { code: 'S&H', name: 'Science & Humanities (1st Year)', hodName: 'Dr. K. Loganathan', totalLabs: 6, totalFaculty: 28 },
  { code: 'MBA', name: 'Master of Business Administration', hodName: 'Dr. J. Prasanna', totalLabs: 2, totalFaculty: 10 },
  { code: 'MCA', name: 'Master of Computer Applications', hodName: 'Dr. E. Soundararajan', totalLabs: 3, totalFaculty: 12 },
];

export const ACADEMIC_YEARS = ['I Year', 'II Year', 'III Year', 'IV Year'];
export const SECTIONS = ['Sec A', 'Sec B'];

export const initialDepartmentStudents: DepartmentStudent[] = [
  // --- III YEAR CSE SEC A ---
  { id: 'S-101', rollNo: '21CS042', registerNo: '922521104042', name: 'K NITHEESWARAN', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'knitheeswaran.cse23@smartcollege.edu.in', phone: '+91 98765 43210', status: 'PRESENT' },
  { id: 'S-102', rollNo: '21CS001', registerNo: '922521104001', name: 'Aakash R', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'aakash.cse23@smartcollege.edu.in', phone: '+91 98765 11001', status: 'PRESENT' },
  { id: 'S-103', rollNo: '21CS002', registerNo: '922521104002', name: 'Abinaya S', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'abinaya.cse23@smartcollege.edu.in', phone: '+91 98765 11002', status: 'PRESENT' },
  { id: 'S-104', rollNo: '21CS003', registerNo: '922521104003', name: 'Anand P', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'anand.cse23@smartcollege.edu.in', phone: '+91 98765 11003', status: 'ABSENT' },
  { id: 'S-105', rollNo: '21CS004', registerNo: '922521104004', name: 'Anitha M', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'anitha.cse23@smartcollege.edu.in', phone: '+91 98765 11004', status: 'PRESENT' },
  { id: 'S-106', rollNo: '21CS005', registerNo: '922521104005', name: 'Aravind Swamy K', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'aravind.cse23@smartcollege.edu.in', phone: '+91 98765 11005', status: 'PRESENT' },
  { id: 'S-107', rollNo: '21CS006', registerNo: '922521104006', name: 'Archana V', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'archana.cse23@smartcollege.edu.in', phone: '+91 98765 11006', status: 'PRESENT' },
  { id: 'S-108', rollNo: '21CS043', registerNo: '922521104043', name: 'Balaji K', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'balaji.cse23@smartcollege.edu.in', phone: '+91 98765 11043', status: 'ON_DUTY' },
  { id: 'S-109', rollNo: '21CS044', registerNo: '922521104044', name: 'Bhavani M', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'bhavani.cse23@smartcollege.edu.in', phone: '+91 98765 11044', status: 'PRESENT' },
  { id: 'S-110', rollNo: '21CS045', registerNo: '922521104045', name: 'Chandru V', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'chandru.cse23@smartcollege.edu.in', phone: '+91 98765 11045', status: 'PRESENT' },
  { id: 'S-111', rollNo: '21CS046', registerNo: '922521104046', name: 'Deepika T', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'deepika.cse23@smartcollege.edu.in', phone: '+91 98765 11046', status: 'PRESENT' },
  { id: 'S-112', rollNo: '21CS047', registerNo: '922521104047', name: 'Dhanalakshmi S', department: 'CSE', year: 'III Year', section: 'Sec A', email: 'dhanalakshmi.cse23@smartcollege.edu.in', phone: '+91 98765 11047', status: 'PRESENT' },

  // --- III YEAR CSE SEC B ---
  { id: 'S-113', rollNo: '21CS061', registerNo: '922521104061', name: 'Dinesh Kumar M', department: 'CSE', year: 'III Year', section: 'Sec B', email: 'dinesh.cse23@smartcollege.edu.in', phone: '+91 98765 11061', status: 'PRESENT' },
  { id: 'S-114', rollNo: '21CS062', registerNo: '922521104062', name: 'Divya Bharathi R', department: 'CSE', year: 'III Year', section: 'Sec B', email: 'divya.cse23@smartcollege.edu.in', phone: '+91 98765 11062', status: 'PRESENT' },
  { id: 'S-115', rollNo: '21CS063', registerNo: '922521104063', name: 'Gokulnath S', department: 'CSE', year: 'III Year', section: 'Sec B', email: 'gokul.cse23@smartcollege.edu.in', phone: '+91 98765 11063', status: 'ABSENT' },
  { id: 'S-116', rollNo: '21CS064', registerNo: '922521104064', name: 'Hariharan B', department: 'CSE', year: 'III Year', section: 'Sec B', email: 'hari.cse23@smartcollege.edu.in', phone: '+91 98765 11064', status: 'PRESENT' },
  { id: 'S-117', rollNo: '21CS065', registerNo: '922521104065', name: 'Haripriya N', department: 'CSE', year: 'III Year', section: 'Sec B', email: 'haripriya.cse23@smartcollege.edu.in', phone: '+91 98765 11065', status: 'PRESENT' },
  { id: 'S-118', rollNo: '21CS066', registerNo: '922521104066', name: 'Indhumathi P', department: 'CSE', year: 'III Year', section: 'Sec B', email: 'indhumathi.cse23@smartcollege.edu.in', phone: '+91 98765 11066', status: 'PRESENT' },
  { id: 'S-119', rollNo: '21CS067', registerNo: '922521104067', name: 'Jagadeesh K', department: 'CSE', year: 'III Year', section: 'Sec B', email: 'jagadeesh.cse23@smartcollege.edu.in', phone: '+91 98765 11067', status: 'ON_DUTY' },

  // --- IV YEAR CSE SEC A & B ---
  { id: 'S-201', rollNo: '20CS001', registerNo: '922520104001', name: 'Karthik Raja S', department: 'CSE', year: 'IV Year', section: 'Sec A', email: 'karthik.cse22@smartcollege.edu.in', phone: '+91 98765 22001', status: 'PRESENT' },
  { id: 'S-202', rollNo: '20CS002', registerNo: '922520104002', name: 'Kavitha P', department: 'CSE', year: 'IV Year', section: 'Sec A', email: 'kavitha.cse22@smartcollege.edu.in', phone: '+91 98765 22002', status: 'PRESENT' },
  { id: 'S-203', rollNo: '20CS003', registerNo: '922520104003', name: 'Lokesh Kumar T', department: 'CSE', year: 'IV Year', section: 'Sec A', email: 'lokesh.cse22@smartcollege.edu.in', phone: '+91 98765 22003', status: 'ON_DUTY' },
  { id: 'S-204', rollNo: '20CS004', registerNo: '922520104004', name: 'Manoj Prabhakar V', department: 'CSE', year: 'IV Year', section: 'Sec A', email: 'manoj.cse22@smartcollege.edu.in', phone: '+91 98765 22004', status: 'PRESENT' },
  { id: 'S-205', rollNo: '20CS005', registerNo: '922520104005', name: 'Meenakshi Sundaram', department: 'CSE', year: 'IV Year', section: 'Sec B', email: 'meenakshi.cse22@smartcollege.edu.in', phone: '+91 98765 22005', status: 'PRESENT' },
  { id: 'S-206', rollNo: '20CS006', registerNo: '922520104006', name: 'Mohan Raj R', department: 'CSE', year: 'IV Year', section: 'Sec B', email: 'mohan.cse22@smartcollege.edu.in', phone: '+91 98765 22006', status: 'PRESENT' },

  // --- II YEAR CSE SEC A & B ---
  { id: 'S-301', rollNo: '22CS001', registerNo: '922522104001', name: 'Naveen Kumar K', department: 'CSE', year: 'II Year', section: 'Sec A', email: 'naveen.cse24@smartcollege.edu.in', phone: '+91 98765 33001', status: 'PRESENT' },
  { id: 'S-302', rollNo: '22CS002', registerNo: '922522104002', name: 'Nivedha M', department: 'CSE', year: 'II Year', section: 'Sec A', email: 'nivedha.cse24@smartcollege.edu.in', phone: '+91 98765 33002', status: 'PRESENT' },
  { id: 'S-303', rollNo: '22CS003', registerNo: '922522104003', name: 'Praveen Raj S', department: 'CSE', year: 'II Year', section: 'Sec A', email: 'praveen.cse24@smartcollege.edu.in', phone: '+91 98765 33003', status: 'ABSENT' },
  { id: 'S-304', rollNo: '22CS004', registerNo: '922522104004', name: 'Priya Dharshini A', department: 'CSE', year: 'II Year', section: 'Sec B', email: 'priya.cse24@smartcollege.edu.in', phone: '+91 98765 33004', status: 'PRESENT' },
  { id: 'S-305', rollNo: '22CS005', registerNo: '922522104005', name: 'Rahul Dev G', department: 'CSE', year: 'II Year', section: 'Sec B', email: 'rahul.cse24@smartcollege.edu.in', phone: '+91 98765 33005', status: 'PRESENT' },

  // --- I YEAR CSE ---
  { id: 'S-401', rollNo: '23CS001', registerNo: '922523104001', name: 'Raghavan R', department: 'CSE', year: 'I Year', section: 'Sec A', email: 'raghavan.cse25@smartcollege.edu.in', phone: '+91 98765 44001', status: 'PRESENT' },
  { id: 'S-402', rollNo: '23CS002', registerNo: '922523104002', name: 'Ramya Krishnan G', department: 'CSE', year: 'I Year', section: 'Sec A', email: 'ramya.cse25@smartcollege.edu.in', phone: '+91 98765 44002', status: 'PRESENT' },
  { id: 'S-403', rollNo: '23CS003', registerNo: '922523104003', name: 'Sanjay Kumar B', department: 'CSE', year: 'I Year', section: 'Sec A', email: 'sanjay.cse25@smartcollege.edu.in', phone: '+91 98765 44003', status: 'PRESENT' },
  { id: 'S-404', rollNo: '23CS004', registerNo: '922523104004', name: 'Santhosh S', department: 'CSE', year: 'I Year', section: 'Sec B', email: 'santhosh.cse25@smartcollege.edu.in', phone: '+91 98765 44004', status: 'PRESENT' },
  { id: 'S-405', rollNo: '23CS005', registerNo: '922523104005', name: 'Sharmila Devi M', department: 'CSE', year: 'I Year', section: 'Sec B', email: 'sharmila.cse25@smartcollege.edu.in', phone: '+91 98765 44005', status: 'ABSENT' },

  // --- ECE (ELECTRONICS & COMMUNICATION) ---
  { id: 'S-501', rollNo: '23EC001', registerNo: '922523106001', name: 'Ashwin Kumar M', department: 'ECE', year: 'I Year', section: 'Sec A', email: 'ashwin.ece25@smartcollege.edu.in', phone: '+91 98765 55001', status: 'PRESENT' },
  { id: 'S-502', rollNo: '23EC002', registerNo: '922523106002', name: 'Dharshini V', department: 'ECE', year: 'I Year', section: 'Sec A', email: 'dharshini.ece25@smartcollege.edu.in', phone: '+91 98765 55002', status: 'PRESENT' },
  { id: 'S-510', rollNo: '22EC015', registerNo: '922522106015', name: 'Gowtham R', department: 'ECE', year: 'II Year', section: 'Sec A', email: 'gowtham.ece24@smartcollege.edu.in', phone: '+91 98765 55015', status: 'PRESENT' },
  { id: 'S-511', rollNo: '22EC016', registerNo: '922522106016', name: 'Harini S', department: 'ECE', year: 'II Year', section: 'Sec A', email: 'harini.ece24@smartcollege.edu.in', phone: '+91 98765 55016', status: 'ABSENT' },
  { id: 'S-520', rollNo: '21EC030', registerNo: '922521106030', name: 'Jaya Surya P', department: 'ECE', year: 'III Year', section: 'Sec A', email: 'jayasurya.ece23@smartcollege.edu.in', phone: '+91 98765 55030', status: 'PRESENT' },
  { id: 'S-521', rollNo: '21EC031', registerNo: '922521106031', name: 'Kavya Dharshini M', department: 'ECE', year: 'III Year', section: 'Sec A', email: 'kavyad.ece23@smartcollege.edu.in', phone: '+91 98765 55031', status: 'ON_DUTY' },
  { id: 'S-522', rollNo: '21EC032', registerNo: '922521106032', name: 'Kishore Kumar N', department: 'ECE', year: 'III Year', section: 'Sec B', email: 'kishore.ece23@smartcollege.edu.in', phone: '+91 98765 55032', status: 'PRESENT' },
  { id: 'S-530', rollNo: '20EC045', registerNo: '922520106045', name: 'Mani Kandan K', department: 'ECE', year: 'IV Year', section: 'Sec A', email: 'manikandan.ece22@smartcollege.edu.in', phone: '+91 98765 55045', status: 'PRESENT' },
  { id: 'S-531', rollNo: '20EC046', registerNo: '922520106046', name: 'Monika B', department: 'ECE', year: 'IV Year', section: 'Sec B', email: 'monika.ece22@smartcollege.edu.in', phone: '+91 98765 55046', status: 'PRESENT' },

  // --- EEE (ELECTRICAL & ELECTRONICS) ---
  { id: 'S-601', rollNo: '23EE005', registerNo: '922523105005', name: 'Arjun Swaminathan', department: 'EEE', year: 'I Year', section: 'Sec A', email: 'arjun.eee25@smartcollege.edu.in', phone: '+91 98765 66005', status: 'PRESENT' },
  { id: 'S-602', rollNo: '22EE012', registerNo: '922522105012', name: 'Balamurugan T', department: 'EEE', year: 'II Year', section: 'Sec A', email: 'balamurugan.eee24@smartcollege.edu.in', phone: '+91 98765 66012', status: 'PRESENT' },
  { id: 'S-603', rollNo: '21EE028', registerNo: '922521105028', name: 'Charulatha N', department: 'EEE', year: 'III Year', section: 'Sec A', email: 'charu.eee23@smartcollege.edu.in', phone: '+91 98765 66028', status: 'ABSENT' },
  { id: 'S-604', rollNo: '20EE040', registerNo: '922520105040', name: 'Dhanush Kumar S', department: 'EEE', year: 'IV Year', section: 'Sec A', email: 'dhanush.eee22@smartcollege.edu.in', phone: '+91 98765 66040', status: 'PRESENT' },
  { id: 'S-605', rollNo: '21EE029', registerNo: '922521105029', name: 'Divakar P', department: 'EEE', year: 'III Year', section: 'Sec B', email: 'divakar.eee23@smartcollege.edu.in', phone: '+91 98765 66029', status: 'PRESENT' },

  // --- MECH (MECHANICAL ENGINEERING) ---
  { id: 'S-701', rollNo: '23ME008', registerNo: '922523114008', name: 'Elango R', department: 'MECH', year: 'I Year', section: 'Sec A', email: 'elango.mech25@smartcollege.edu.in', phone: '+91 98765 77008', status: 'PRESENT' },
  { id: 'S-702', rollNo: '22ME020', registerNo: '922522114020', name: 'Ganesh Moorthy K', department: 'MECH', year: 'II Year', section: 'Sec A', email: 'ganesh.mech24@smartcollege.edu.in', phone: '+91 98765 77020', status: 'PRESENT' },
  { id: 'S-703', rollNo: '21ME035', registerNo: '92252114035', name: 'Hari Prasad V', department: 'MECH', year: 'III Year', section: 'Sec A', email: 'hariprasad.mech23@smartcollege.edu.in', phone: '+91 98765 77035', status: 'ON_DUTY' },
  { id: 'S-704', rollNo: '20ME050', registerNo: '922520114050', name: 'Karthikeyan B', department: 'MECH', year: 'IV Year', section: 'Sec A', email: 'karthik.mech22@smartcollege.edu.in', phone: '+91 98765 77050', status: 'PRESENT' },
  { id: 'S-705', rollNo: '21ME036', registerNo: '92252114036', name: 'Kalyanasundaram M', department: 'MECH', year: 'III Year', section: 'Sec B', email: 'kalyan.mech23@smartcollege.edu.in', phone: '+91 98765 77036', status: 'PRESENT' },

  // --- CIVIL ENGINEERING ---
  { id: 'S-801', rollNo: '23CE004', registerNo: '922523103004', name: 'Inba Kumar S', department: 'CIVIL', year: 'I Year', section: 'Sec A', email: 'inba.civil25@smartcollege.edu.in', phone: '+91 98765 88004', status: 'PRESENT' },
  { id: 'S-802', rollNo: '22CE010', registerNo: '922522103010', name: 'Janani M', department: 'CIVIL', year: 'II Year', section: 'Sec A', email: 'janani.civil24@smartcollege.edu.in', phone: '+91 98765 88010', status: 'PRESENT' },
  { id: 'S-803', rollNo: '21CE022', registerNo: '922521103022', name: 'Logeshwaran P', department: 'CIVIL', year: 'III Year', section: 'Sec A', email: 'logesh.civil23@smartcollege.edu.in', phone: '+91 98765 88022', status: 'ABSENT' },
  { id: 'S-804', rollNo: '20CE033', registerNo: '922520103033', name: 'Madhavan R', department: 'CIVIL', year: 'IV Year', section: 'Sec A', email: 'madhavan.civil22@smartcollege.edu.in', phone: '+91 98765 88033', status: 'PRESENT' },

  // --- IT (INFORMATION TECHNOLOGY) ---
  { id: 'S-901', rollNo: '23IT002', registerNo: '922523205002', name: 'Monisha S', department: 'IT', year: 'I Year', section: 'Sec A', email: 'monisha.it25@smartcollege.edu.in', phone: '+91 98765 99002', status: 'PRESENT' },
  { id: 'S-902', rollNo: '22IT018', registerNo: '922522205018', name: 'Narendran K', department: 'IT', year: 'II Year', section: 'Sec A', email: 'narendran.it24@smartcollege.edu.in', phone: '+91 98765 99018', status: 'PRESENT' },
  { id: 'S-903', rollNo: '21IT034', registerNo: '922521205034', name: 'Oviya Shree R', department: 'IT', year: 'III Year', section: 'Sec A', email: 'oviya.it23@smartcollege.edu.in', phone: '+91 98765 99034', status: 'PRESENT' },
  { id: 'S-904', rollNo: '20IT048', registerNo: '922520205048', name: 'Pradeep Kumar V', department: 'IT', year: 'IV Year', section: 'Sec A', email: 'pradeep.it22@smartcollege.edu.in', phone: '+91 98765 99048', status: 'ON_DUTY' },
  { id: 'S-905', rollNo: '21IT035', registerNo: '922521205035', name: 'Pooja Sri K', department: 'IT', year: 'III Year', section: 'Sec B', email: 'pooja.it23@smartcollege.edu.in', phone: '+91 98765 99035', status: 'PRESENT' },

  // --- AIDS (ARTIFICIAL INTELLIGENCE & DATA SCIENCE) ---
  { id: 'S-951', rollNo: '23AD005', registerNo: '922523243005', name: 'Rithika B', department: 'AIDS', year: 'I Year', section: 'Sec A', email: 'rithika.aids25@smartcollege.edu.in', phone: '+91 98765 99505', status: 'PRESENT' },
  { id: 'S-952', rollNo: '22AD014', registerNo: '922522243014', name: 'Saravanan M', department: 'AIDS', year: 'II Year', section: 'Sec A', email: 'saravanan.aids24@smartcollege.edu.in', phone: '+91 98765 99514', status: 'PRESENT' },
  { id: 'S-953', rollNo: '21AD027', registerNo: '922521243027', name: 'Shalini P', department: 'AIDS', year: 'III Year', section: 'Sec A', email: 'shalini.aids23@smartcollege.edu.in', phone: '+91 98765 99527', status: 'PRESENT' },
  { id: 'S-954', rollNo: '20AD040', registerNo: '922520243040', name: 'Sriram Karthik T', department: 'AIDS', year: 'IV Year', section: 'Sec A', email: 'sriram.aids22@smartcollege.edu.in', phone: '+91 98765 99540', status: 'ABSENT' },
  { id: 'S-955', rollNo: '21AD028', registerNo: '922521243028', name: 'Sujatha N', department: 'AIDS', year: 'III Year', section: 'Sec B', email: 'sujatha.aids23@smartcollege.edu.in', phone: '+91 98765 99528', status: 'PRESENT' },

  // --- AIML (ARTIFICIAL INTELLIGENCE & MACHINE LEARNING) ---
  { id: 'S-960', rollNo: '23AM003', registerNo: '922523244003', name: 'Tharun Kumar R', department: 'AIML', year: 'I Year', section: 'Sec A', email: 'tharun.aiml25@smartcollege.edu.in', phone: '+91 98765 99603', status: 'PRESENT' },
  { id: 'S-961', rollNo: '22AM012', registerNo: '922522244012', name: 'Uma Maheshwari S', department: 'AIML', year: 'II Year', section: 'Sec A', email: 'uma.aiml24@smartcollege.edu.in', phone: '+91 98765 99612', status: 'PRESENT' },
  { id: 'S-962', rollNo: '21AM025', registerNo: '922521244025', name: 'Vigneshwaran K', department: 'AIML', year: 'III Year', section: 'Sec A', email: 'vignesh.aiml23@smartcollege.edu.in', phone: '+91 98765 99625', status: 'ON_DUTY' },

  // --- CSBS (COMPUTER SCIENCE & BUSINESS SYSTEMS) ---
  { id: 'S-970', rollNo: '23CB002', registerNo: '922523245002', name: 'Varun Sharma P', department: 'CSBS', year: 'I Year', section: 'Sec A', email: 'varun.csbs25@smartcollege.edu.in', phone: '+91 98765 99702', status: 'PRESENT' },
  { id: 'S-971', rollNo: '22CB011', registerNo: '922522245011', name: 'Vishnu Priya M', department: 'CSBS', year: 'II Year', section: 'Sec A', email: 'vishnu.csbs24@smartcollege.edu.in', phone: '+91 98765 99711', status: 'PRESENT' },
  { id: 'S-972', rollNo: '21CB024', registerNo: '922521245024', name: 'Yogeshwaran B', department: 'CSBS', year: 'III Year', section: 'Sec A', email: 'yogesh.csbs23@smartcollege.edu.in', phone: '+91 98765 99724', status: 'ABSENT' },

  // --- BME (BIOMEDICAL ENGINEERING) ---
  { id: 'S-980', rollNo: '23BM004', registerNo: '922523121004', name: 'Aarthy S', department: 'BME', year: 'I Year', section: 'Sec A', email: 'aarthy.bme25@smartcollege.edu.in', phone: '+91 98765 99804', status: 'PRESENT' },
  { id: 'S-981', rollNo: '22BM016', registerNo: '922522121016', name: 'Deepak Raj V', department: 'BME', year: 'II Year', section: 'Sec A', email: 'deepak.bme24@smartcollege.edu.in', phone: '+91 98765 99816', status: 'PRESENT' },

  // --- BIOTECH (BIOTECHNOLOGY) ---
  { id: 'S-985', rollNo: '23BT006', registerNo: '922523122006', name: 'Gowri Shankar N', department: 'BIOTECH', year: 'I Year', section: 'Sec A', email: 'gowri.biotech25@smartcollege.edu.in', phone: '+91 98765 99856', status: 'PRESENT' },
  { id: 'S-986', rollNo: '22BT018', registerNo: '922522122018', name: 'Kavitha Devi K', department: 'BIOTECH', year: 'II Year', section: 'Sec A', email: 'kavithad.biotech24@smartcollege.edu.in', phone: '+91 98765 99868', status: 'PRESENT' },

  // --- S&H (SCIENCE & HUMANITIES) ---
  { id: 'S-990', rollNo: '23SH001', registerNo: '922523101001', name: 'Abhishek R', department: 'S&H', year: 'I Year', section: 'Sec A', email: 'abhishek.sh25@smartcollege.edu.in', phone: '+91 98765 99901', status: 'PRESENT' },
  { id: 'S-991', rollNo: '23SH002', registerNo: '922523101002', name: 'Bhavana S', department: 'S&H', year: 'I Year', section: 'Sec B', email: 'bhavana.sh25@smartcollege.edu.in', phone: '+91 98765 99902', status: 'PRESENT' },

  // --- MBA (MASTER OF BUSINESS ADMINISTRATION) ---
  { id: 'S-995', rollNo: '23MB001', registerNo: '922523631001', name: 'Anandakrishnan K', department: 'MBA', year: 'I Year', section: 'Sec A', email: 'anand.mba25@smartcollege.edu.in', phone: '+91 98765 99951', status: 'PRESENT' },
  { id: 'S-996', rollNo: '22MB015', registerNo: '922522631015', name: 'Divya Prabha R', department: 'MBA', year: 'II Year', section: 'Sec A', email: 'divyap.mba24@smartcollege.edu.in', phone: '+91 98765 99965', status: 'ON_DUTY' },

  // --- MCA (MASTER OF COMPUTER APPLICATIONS) ---
  { id: 'S-998', rollNo: '23MC002', registerNo: '922523621002', name: 'Karthik Raja M', department: 'MCA', year: 'I Year', section: 'Sec A', email: 'karthik.mca25@smartcollege.edu.in', phone: '+91 98765 99982', status: 'PRESENT' },
  { id: 'S-999', rollNo: '22MC020', registerNo: '922522621020', name: 'Sangeetha P', department: 'MCA', year: 'II Year', section: 'Sec A', email: 'sangeetha.mca24@smartcollege.edu.in', phone: '+91 98765 99999', status: 'PRESENT' },
];
