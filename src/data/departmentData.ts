import cseLabImg from '../assets/images/vsb_cse_lab_1785403267144.jpg';
import cseAiLabImg from '../assets/images/vsb_cse_ai_lab_1785403281480.jpg';
import cseClassroomImg from '../assets/images/vsb_cse_classroom_1785403296227.jpg';
import cseExpoImg from '../assets/images/vsb_cse_expo_1785403309694.jpg';
import eceLabImg from '../assets/images/vsb_ece_lab_1785403727856.jpg';
import mechLabImg from '../assets/images/vsb_mech_lab_1785403746810.jpg';
import civilLabImg from '../assets/images/vsb_civil_lab_1785403763469.jpg';

export interface DepartmentGalleryItem {
  src: string;
  title: string;
  desc: string;
  category: string;
}

export interface DepartmentInfo {
  code: string;
  fullName: string;
  hodName: string;
  hodQualification: string;
  totalFaculty: number;
  totalStudents: number;
  labCount: number;
  placementRate: string;
  avgPackage: string;
  highestPackage: string;
  academicFocus: string;
  skillsAndTech: string[];
  topRecruiters: { name: string; package: string }[];
  images: DepartmentGalleryItem[];
}

export const departmentDetailsMap: Record<string, DepartmentInfo> = {
  CSE: {
    code: 'CSE',
    fullName: 'Department of Computer Science & Engineering',
    hodName: 'Dr. M. Anitha',
    hodQualification: 'M.E., Ph.D. (Anna University)',
    totalFaculty: 24,
    totalStudents: 480,
    labCount: 6,
    placementRate: '96.8%',
    avgPackage: '5.2 LPA',
    highestPackage: '18.5 LPA',
    academicFocus:
      'Focuses on Full Stack Web Development, Artificial Intelligence, Machine Learning, Cloud Architecture (AWS/GCP), and High-Performance Computing. Features 6 dedicated computer labs with gigabit fiber-optic connectivity.',
    skillsAndTech: ['Python & PyTorch', 'React & Node.js', 'AWS Cloud Architecture', 'Docker & Kubernetes', 'Spring Boot'],
    topRecruiters: [
      { name: 'Zoho Corp', package: '8.4 LPA' },
      { name: 'TCS Digital', package: '7.2 LPA' },
      { name: 'Virtusa', package: '6.5 LPA' },
      { name: 'Cognizant', package: '5.5 LPA' },
    ],
    images: [
      {
        src: cseLabImg,
        title: 'College Main Computer Science Lab',
        desc: 'State-of-the-art 120+ high-performance workstations with high-speed internet, Linux/Windows dual boot, and full stack dev tools.',
        category: 'Main Programming Lab',
      },
      {
        src: cseAiLabImg,
        title: 'AI & Cloud Computing Research Center',
        desc: 'Dedicated NVIDIA GPU cluster workstations for Deep Learning, Data Science, and Distributed Systems research.',
        category: 'Advanced AI Lab',
      },
      {
        src: cseClassroomImg,
        title: 'Smart Digital Lecture Hall',
        desc: 'Interactive presentation technology, surround acoustics, and comfortable tiered seating for engaging technical lectures.',
        category: 'Smart Classroom',
      },
      {
        src: cseExpoImg,
        title: 'College CS Annual Code Expo & Hackathon',
        desc: 'National-level student hackathons, open-source project showcases, and industry tech competition exhibitions.',
        category: 'Tech Expo & Hackathons',
      },
    ],
  },

  ECE: {
    code: 'ECE',
    fullName: 'Department of Electronics & Communication Engineering',
    hodName: 'Dr. K. Senthil Kumar',
    hodQualification: 'M.E., Ph.D. (Micro-electronics)',
    totalFaculty: 22,
    totalStudents: 420,
    labCount: 5,
    placementRate: '94.5%',
    avgPackage: '4.8 LPA',
    highestPackage: '14.0 LPA',
    academicFocus:
      'Specializes in VLSI Design, Embedded Systems, IoT, Signal Processing, and Optical Communications. Equipped with modern digital oscilloscopes, Cadence tools, and FPGA hardware kits.',
    skillsAndTech: ['VLSI Cadence Toolset', 'Embedded C & ARM', 'MATLAB & DSP', 'IoT Sensor Systems', 'Verilog HDL'],
    topRecruiters: [
      { name: 'Qualcomm', package: '12.0 LPA' },
      { name: 'Bosch India', package: '7.5 LPA' },
      { name: 'TCS Ninja', package: '4.5 LPA' },
      { name: 'Wipro Technologies', package: '4.2 LPA' },
    ],
    images: [
      {
        src: eceLabImg,
        title: 'College Electronics & VLSI Hardware Lab',
        desc: 'Advanced digital storage oscilloscopes, PCB prototyping stations, signal generators, and Cadence EDA VLSI tool suites.',
        category: 'Embedded & VLSI Lab',
      },
      {
        src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1200',
        title: 'IoT & Microcontroller Systems Station',
        desc: 'Hands-on training setup for ARM Cortex controllers, Raspberry Pi, Arduino IoT gateways, and wireless sensor nodes.',
        category: 'IoT Research Station',
      },
      {
        src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
        title: 'Communication Systems & Optical Lab',
        desc: 'Fiber optics trainer kits, microwave test benches, and spectrum analyzers for communication engineering experimentation.',
        category: 'Telecom & Optics Lab',
      },
    ],
  },

  EEE: {
    code: 'EEE',
    fullName: 'Department of Electrical & Electronics Engineering',
    hodName: 'Dr. R. Ramachandran',
    hodQualification: 'M.E., Ph.D. (Power Systems)',
    totalFaculty: 18,
    totalStudents: 320,
    labCount: 5,
    placementRate: '92.0%',
    avgPackage: '4.5 LPA',
    highestPackage: '12.5 LPA',
    academicFocus:
      'Covers Power Electronics, Electric Vehicles (EV) Technology, Renewable Energy Systems, PLC & SCADA Automation, and Smart Microgrids.',
    skillsAndTech: ['PLC & SCADA Automation', 'EV Motor Drives', 'Power World Simulator', 'MATLAB Simulink', 'Solar PV Design'],
    topRecruiters: [
      { name: 'Schneider Electric', package: '7.0 LPA' },
      { name: 'L&T Electrical', package: '6.2 LPA' },
      { name: 'TATA Power', package: '5.8 LPA' },
      { name: 'Cognizant', package: '4.5 LPA' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=1200',
        title: 'Power Systems & Electrical Machines Lab',
        desc: 'Heavy motor-generator test sets, transformer testing rigs, power quality analyzers, and high voltage test equipment.',
        category: 'Electrical Machines Lab',
      },
      {
        src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
        title: 'Renewable Energy & EV Tech Center',
        desc: 'Solar PV grid connection simulators, EV battery management test benches, and wind turbine emulator kits.',
        category: 'EV & Solar Lab',
      },
      {
        src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
        title: 'Industrial Automation PLC SCADA Lab',
        desc: 'Siemens and Allen-Bradley PLCs, pneumatics automation panels, and SCADA monitoring workstations.',
        category: 'Automation Lab',
      },
    ],
  },

  MECH: {
    code: 'MECH',
    fullName: 'Department of Mechanical Engineering',
    hodName: 'Dr. P. Velmurugan',
    hodQualification: 'M.E., Ph.D. (Manufacturing Engineering)',
    totalFaculty: 20,
    totalStudents: 360,
    labCount: 6,
    placementRate: '91.5%',
    avgPackage: '4.4 LPA',
    highestPackage: '10.8 LPA',
    academicFocus:
      'Excellence in Computer Aided Design (CAD), Thermal Engineering, CNC Machining, Mechatronics, and Robotics Automation.',
    skillsAndTech: ['SolidWorks & ANSYS', 'CNC G-Code Programming', 'Robotics Simulation', 'Thermal CFD Analysis', '3D Printing'],
    topRecruiters: [
      { name: 'Hyundai Motors', package: '6.8 LPA' },
      { name: 'TVS Motors', package: '6.0 LPA' },
      { name: 'Ashok Leyland', package: '5.5 LPA' },
      { name: 'Infosys', package: '4.5 LPA' },
    ],
    images: [
      {
        src: mechLabImg,
        title: 'College Mechanical CAD/CAM & Robotics Workshop',
        desc: 'Industrial CNC lathe, 3D printing rapid prototyping station, ANSYS simulation PCs, and thermal engine test rigs.',
        category: 'CAD/CAM & CNC Lab',
      },
      {
        src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200',
        title: 'Thermal Engineering & Internal Combustion Lab',
        desc: 'Multi-cylinder computerized petrol and diesel engine test setups with emissions measurement analyzers.',
        category: 'Thermal & IC Lab',
      },
      {
        src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
        title: 'Mechatronics & Robotics Automation Bay',
        desc: 'Pneumatic and hydraulic trainer kits, industrial robotic arms, and automated assembly conveyor models.',
        category: 'Robotics Bay',
      },
    ],
  },

  CIVIL: {
    code: 'CIVIL',
    fullName: 'Department of Civil Engineering',
    hodName: 'Dr. S. Karthikeyan',
    hodQualification: 'M.E., Ph.D. (Structural Engineering)',
    totalFaculty: 14,
    totalStudents: 240,
    labCount: 4,
    placementRate: '89.2%',
    avgPackage: '4.2 LPA',
    highestPackage: '9.5 LPA',
    academicFocus:
      'Specializes in Structural Analysis, Advanced Surveying with GPS/Total Station, Environmental Engineering, and BIM (Building Information Modeling).',
    skillsAndTech: ['AutoCAD & STAAD.Pro', 'Revit BIM Modeling', 'GIS & Remote Sensing', 'Total Station Surveying', 'Concrete Technology'],
    topRecruiters: [
      { name: 'L&T Construction', package: '6.5 LPA' },
      { name: 'Sobha Developers', package: '5.2 LPA' },
      { name: 'Afcons Infrastructure', package: '4.8 LPA' },
      { name: 'TCS', package: '4.0 LPA' },
    ],
    images: [
      {
        src: civilLabImg,
        title: 'College Surveying & Structural Mechanics Lab',
        desc: 'Electronic Total Stations, concrete compression strength test frames, soil mechanics apparatus, and 3D building modeling tools.',
        category: 'Structural & Survey Lab',
      },
      {
        src: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=1200',
        title: 'Building Information Modeling (BIM) Studio',
        desc: 'High-performance computers configured with Autodesk Revit, STAAD.Pro, and GIS mapping software for structural design.',
        category: 'BIM Design Studio',
      },
      {
        src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
        title: 'Environmental & Soil Mechanics Testing Lab',
        desc: 'Equipment for water quality testing, soil shear strength measurement, and bitumen compaction testing.',
        category: 'Soil & Material Testing',
      },
    ],
  },

  IT: {
    code: 'IT',
    fullName: 'Department of Information Technology',
    hodName: 'Dr. G. Loganathan',
    hodQualification: 'M.E., Ph.D. (Information Security)',
    totalFaculty: 20,
    totalStudents: 380,
    labCount: 5,
    placementRate: '96.2%',
    avgPackage: '5.4 LPA',
    highestPackage: '16.0 LPA',
    academicFocus:
      'Focused on Mobile App Development, Cyber Security, Cloud Native Computing, DevOps, and Big Data Analytics.',
    skillsAndTech: ['Flutter & Android', 'Ethical Hacking Tools', 'Kubernetes & CI/CD', 'MongoDB & SQL', 'React Native'],
    topRecruiters: [
      { name: 'Zoho Corp', package: '8.4 LPA' },
      { name: 'Amazon AWS', package: '14.0 LPA' },
      { name: 'Virtusa', package: '6.5 LPA' },
      { name: 'Mindtree', package: '5.0 LPA' },
    ],
    images: [
      {
        src: cseClassroomImg,
        title: 'College IT Innovation & App Development Center',
        desc: 'Workstations with iOS & Android emulators, cloud deployment pipelines, and cyber security sandbox environments.',
        category: 'Cloud & App Lab',
      },
      {
        src: cseLabImg,
        title: 'Cyber Security & Network Forensics Lab',
        desc: 'Isolated network configurations for penetration testing, packet analysis, and ethical hacking simulations.',
        category: 'Cyber Security Lab',
      },
      {
        src: cseExpoImg,
        title: 'College IT Project Showcase & CodeSprint',
        desc: 'Inter-departmental hackathons, web dev challenges, and mobile app deployment contests.',
        category: 'IT CodeSprint',
      },
    ],
  },

  AIDS: {
    code: 'AIDS',
    fullName: 'Department of Artificial Intelligence & Data Science',
    hodName: 'Dr. V. Deepa',
    hodQualification: 'M.E., Ph.D. (Machine Learning & NLP)',
    totalFaculty: 16,
    totalStudents: 300,
    labCount: 4,
    placementRate: '97.5%',
    avgPackage: '6.1 LPA',
    highestPackage: '20.0 LPA',
    academicFocus:
      'Pioneer in Generative AI, Large Language Models, Predictive Analytics, Computer Vision, and Neural Networks.',
    skillsAndTech: ['Python & PyTorch', 'TensorFlow & Keras', 'Spark & Hadoop', 'OpenCV Vision', 'LangChain & LLMs'],
    topRecruiters: [
      { name: 'PayPal India', package: '15.0 LPA' },
      { name: 'Mu Sigma Data', package: '7.5 LPA' },
      { name: 'TCS Digital AI', package: '7.2 LPA' },
      { name: 'LatentView', package: '6.8 LPA' },
    ],
    images: [
      {
        src: cseAiLabImg,
        title: 'College AI & Deep Learning GPU Supercomputing Lab',
        desc: 'NVIDIA GPU workstations running PyTorch, TensorFlow, LLM inference pipelines, and computer vision models.',
        category: 'Deep Learning GPU Lab',
      },
      {
        src: cseLabImg,
        title: 'Big Data & Predictive Analytics Lab',
        desc: 'Distributed Hadoop and Apache Spark clusters for processing petabyte-scale data sets and real-time streams.',
        category: 'Big Data Lab',
      },
      {
        src: cseClassroomImg,
        title: 'AI Research Seminar & Paper Presentation Studio',
        desc: 'Interactive digital classroom hosting AI research symposiums, IEEE paper discussions, and guest lectures.',
        category: 'AI Research Studio',
      },
    ],
  },

  AIML: {
    code: 'AIML',
    fullName: 'Department of Artificial Intelligence & Machine Learning',
    hodName: 'Dr. S. Prabakaran',
    hodQualification: 'M.E., Ph.D. (Neural Computing)',
    totalFaculty: 15,
    totalStudents: 280,
    labCount: 4,
    placementRate: '97.0%',
    avgPackage: '6.0 LPA',
    highestPackage: '19.2 LPA',
    academicFocus:
      'Specialized program covering Machine Learning Algorithms, Reinforcement Learning, Autonomous Systems, Natural Language Processing, and Edge AI.',
    skillsAndTech: ['Scikit-Learn', 'Reinforcement Learning', 'Edge AI (Jetson Nano)', 'NLP Transformers', 'OpenCV'],
    topRecruiters: [
      { name: 'Amazon Development', package: '16.0 LPA' },
      { name: 'Zoho AI Labs', package: '8.4 LPA' },
      { name: 'Bosch AI', package: '7.8 LPA' },
      { name: 'Cognizant AI', package: '5.5 LPA' },
    ],
    images: [
      {
        src: cseAiLabImg,
        title: 'College Machine Learning & Robotics Lab',
        desc: 'Jetson Nano edge AI development modules, high-spec GPU workstations, and autonomous rover test tracks.',
        category: 'Edge AI & ML Lab',
      },
      {
        src: cseLabImg,
        title: 'Natural Language Processing & Vision Studio',
        desc: 'High performance systems for training transformer models, image segmentation, and voice recognition.',
        category: 'NLP & Vision Lab',
      },
      {
        src: cseExpoImg,
        title: 'College AI & ML Student Innovation Summit',
        desc: 'Exhibition of autonomous robotics, smart medical image diagnostics, and voice AI assistant projects.',
        category: 'AI Innovation Expo',
      },
    ],
  },
};

export function getDepartmentDetails(code: string | null): DepartmentInfo {
  if (!code) return departmentDetailsMap['CSE'];
  const normalized = code.toUpperCase().trim();

  if (departmentDetailsMap[normalized]) {
    return departmentDetailsMap[normalized];
  }

  if (normalized.includes('COMPUTER') || normalized.includes('CS')) return departmentDetailsMap['CSE'];
  if (normalized.includes('ELECTRONIC') || normalized.includes('EC')) return departmentDetailsMap['ECE'];
  if (normalized.includes('ELECTRICAL') || normalized.includes('EE')) return departmentDetailsMap['EEE'];
  if (normalized.includes('MECHANICAL') || normalized.includes('MECH')) return departmentDetailsMap['MECH'];
  if (normalized.includes('CIVIL')) return departmentDetailsMap['CIVIL'];
  if (normalized.includes('INFO') || normalized.includes('IT')) return departmentDetailsMap['IT'];
  if (normalized.includes('DATA') || normalized.includes('AIDS')) return departmentDetailsMap['AIDS'];
  if (normalized.includes('MACHINE') || normalized.includes('AIML')) return departmentDetailsMap['AIML'];

  return departmentDetailsMap['CSE'];
}
