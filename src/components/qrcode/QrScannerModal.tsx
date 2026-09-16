import React, { useState } from 'react';
import {
  X,
  QrCode,
  Search,
  Camera,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Building2,
  Mail,
  Phone,
  Sparkles,
  CheckCircle2,
  Upload,
  RefreshCw,
  Award,
  ExternalLink,
  BookOpen,
  Users,
  Clock,
  Zap,
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { UserRole } from '../../types';
import { initialDepartmentStudents } from '../../data/allStudentsData';
import { mockStudent, mockFaculty, mockHod, mockAdmin } from '../../data/mockData';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole?: (role: UserRole) => void;
}

export interface UnifiedProfile {
  id: string;
  name: string;
  role: UserRole;
  identifier: string; // Roll No or Employee ID
  department: string;
  email: string;
  phone: string;
  subTitle: string;
  avatarUrl: string;
  bio?: string;
  status?: string;
  year?: string;
  section?: string;
  cgpa?: number;
  subjects?: string[];
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
}) => {
  const [activeTab, setActiveTab] = useState<'scan' | 'directory' | 'my_qr'>('scan');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<UnifiedProfile | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [scannedResult, setScannedResult] = useState<UnifiedProfile | null>(null);

  if (!isOpen) return null;

  // Compile full campus directory combining Students, Faculty, HODs, and Admins
  const allProfiles: UnifiedProfile[] = [
    {
      id: mockStudent.id,
      name: mockStudent.name,
      role: 'STUDENT',
      identifier: mockStudent.rollNo,
      department: mockStudent.department,
      email: mockStudent.email,
      phone: mockStudent.phone,
      subTitle: `Batch ${mockStudent.batch} • Sem ${mockStudent.semester} (${mockStudent.section})`,
      avatarUrl: mockStudent.avatarUrl,
      cgpa: mockStudent.cgpa,
      year: 'III Year',
      section: mockStudent.section,
      bio: 'Pursuing B.E. Computer Science & Engineering. Passionate about AI & Full Stack Web Development.',
    },
    {
      id: mockFaculty.id,
      name: mockFaculty.name,
      role: 'FACULTY',
      identifier: mockFaculty.employeeId,
      department: mockFaculty.department,
      email: mockFaculty.email,
      phone: mockFaculty.phone,
      subTitle: mockFaculty.designation,
      avatarUrl: mockFaculty.avatarUrl,
      subjects: mockFaculty.handledSubjects,
      bio: 'Associate Professor with 12+ years teaching experience in Mobile Apps, Systems Architecture & AI.',
    },
    {
      id: mockHod.id,
      name: mockHod.name,
      role: 'HOD',
      identifier: mockHod.employeeId,
      department: mockHod.department,
      email: mockHod.email,
      phone: mockHod.phone,
      subTitle: mockHod.designation,
      avatarUrl: mockHod.avatarUrl,
      bio: 'Head of Computer Science & Engineering Department. Leading academic excellence, research & placement drives.',
    },
    {
      id: mockAdmin.id,
      name: mockAdmin.name,
      role: 'ADMIN',
      identifier: 'EMP-ADM-001',
      department: 'Central Administration',
      email: mockAdmin.email,
      phone: mockAdmin.phone,
      subTitle: 'Systems Administrator & Controller of Examinations',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      bio: 'Controller of Examinations & Campus Portal Administrator. Managing academic records, fees & timetable.',
    },
    // Add additional faculty members
    {
      id: 'FAC-109',
      name: 'Dr. K. Senthil Kumar',
      role: 'FACULTY',
      identifier: 'EMP-ECE-005',
      department: 'Electronics & Communication Engineering',
      email: 'senthil.ece@smartcollege.edu.in',
      phone: '+91 94432 88776',
      subTitle: 'Professor & ECE Lab Director',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      bio: 'VLSI & Embedded Systems Specialist. Research supervisor for IoT projects.',
    },
    {
      id: 'FAC-[#110]',
      name: 'Dr. G. Preethi',
      role: 'FACULTY',
      identifier: 'EMP-AIDS-002',
      department: 'Artificial Intelligence & Data Science',
      email: 'preethi.aids@smartcollege.edu.in',
      phone: '+91 94432 55443',
      subTitle: 'Associate Professor - AI Research Lead',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      bio: 'Specializing in Neural Networks, Deep Learning & Natural Language Processing.',
    },
    // Map list of department students
    ...initialDepartmentStudents.slice(0, 30).map((s) => ({
      id: s.id,
      name: s.name,
      role: 'STUDENT' as UserRole,
      identifier: s.rollNo,
      department: `${s.department} Department`,
      email: s.email,
      phone: s.phone,
      subTitle: `${s.year} • ${s.section}`,
      avatarUrl: s.id === 'S-101' ? mockStudent.avatarUrl : `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300`,
      year: s.year,
      section: s.section,
    })),
  ];

  const filteredProfiles = allProfiles.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.identifier.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q)
    );
  });

  const handleSimulateScan = (profileToScan?: UnifiedProfile) => {
    setIsScanning(true);
    setScanSuccess(false);
    setScannedResult(null);

    setTimeout(() => {
      const target = profileToScan || allProfiles[Math.floor(Math.random() * allProfiles.length)];
      setScannedResult(target);
      setIsScanning(false);
      setScanSuccess(true);
    }, 1200);
  };

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'STUDENT':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'FACULTY':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'HOD':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'ADMIN':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0f172a] text-white border-2 border-slate-700 w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e1e38] to-[#0f172a] p-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-[#e11d48] text-white flex items-center justify-center shadow-md">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif italic font-bold text-lg text-white">
                  Smart College Official QR Identity Hub
                </h2>
                <span className="text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-xs uppercase">
                  Encrypted & Verified
                </span>
              </div>
              <p className="text-xs font-mono text-slate-300">
                Scan ID badges or search directory to verify Students, Faculty, HODs & Admins
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xs transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-2 bg-[#1e293b] border-b border-slate-700 shrink-0">
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase rounded-xs transition cursor-pointer ${
              activeTab === 'scan'
                ? 'bg-[#e11d48] text-white shadow-md'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Live QR Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase rounded-xs transition cursor-pointer ${
              activeTab === 'directory'
                ? 'bg-[#e11d48] text-white shadow-md'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Campus QR Directory ({allProfiles.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('scan');
              handleSimulateScan(allProfiles[0]);
            }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase rounded-xs transition cursor-pointer ml-auto bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 border border-emerald-500/40`}
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Quick Scan Nitheeswaran</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'scan' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scanner View Finder */}
              <div className="bg-slate-900 border-2 border-slate-700 rounded-xs p-5 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[300px]">
                {/* Viewfinder Corners */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#e11d48]" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#e11d48]" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#e11d48]" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#e11d48]" />

                {isScanning ? (
                  <div className="space-y-4 py-8">
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin" />
                      <div className="absolute inset-2 border-4 border-emerald-400 border-b-transparent rounded-full animate-spin direction-reverse" />
                      <QrCode className="w-10 h-10 text-white absolute inset-0 m-auto" />
                    </div>
                    <div className="text-xs font-mono text-rose-300 font-bold uppercase animate-pulse">
                      Scanning Digital ID Badge...
                    </div>
                  </div>
                ) : scanSuccess && scannedResult ? (
                  <div className="space-y-3 py-4 w-full">
                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="text-xs font-mono text-emerald-300 font-bold uppercase">
                      ID Badge Decoded & Verified!
                    </div>
                    <button
                      onClick={() => handleSimulateScan()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold uppercase rounded-xs transition cursor-pointer border border-slate-600"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Scan Another Card</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 py-6">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-rose-400">
                      <Camera className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-serif italic font-bold text-base text-white">
                        Camera & Badge Reader Active
                      </h4>
                      <p className="text-xs font-mono text-slate-400 max-w-xs mx-auto mt-1">
                        Point camera at any Student, Faculty, HOD or Admin QR code badge
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col gap-2 w-full max-w-xs mx-auto">
                      <button
                        onClick={() => handleSimulateScan()}
                        className="w-full py-2.5 bg-[#e11d48] hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xs transition cursor-pointer shadow-lg flex items-center justify-center gap-2"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>Simulate Scan Random Badge</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Presets */}
                <div className="w-full pt-4 border-t border-slate-800 mt-4 text-left">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">
                    Quick Demo Scan Profiles:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                    <button
                      onClick={() => handleSimulateScan(allProfiles[0])}
                      className="p-1.5 bg-slate-800 hover:bg-rose-950/60 hover:border-rose-500/50 border border-slate-700 text-slate-200 hover:text-white rounded-xs text-left truncate transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span className="truncate">Student: Nitheeswaran</span>
                    </button>

                    <button
                      onClick={() => handleSimulateScan(allProfiles[1])}
                      className="p-1.5 bg-slate-800 hover:bg-blue-950/60 hover:border-blue-500/50 border border-slate-700 text-slate-200 hover:text-white rounded-xs text-left truncate transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                      <span className="truncate">Faculty: Dr. S. Ramesh</span>
                    </button>

                    <button
                      onClick={() => handleSimulateScan(allProfiles[2])}
                      className="p-1.5 bg-slate-800 hover:bg-purple-950/60 hover:border-purple-500/50 border border-slate-700 text-slate-200 hover:text-white rounded-xs text-left truncate transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                      <span className="truncate">HOD: Dr. M. Anitha</span>
                    </button>

                    <button
                      onClick={() => handleSimulateScan(allProfiles[3])}
                      className="p-1.5 bg-slate-800 hover:bg-rose-950/60 hover:border-rose-500/50 border border-slate-700 text-slate-200 hover:text-white rounded-xs text-left truncate transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                      <span className="truncate">Admin: COE Portal</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Scanned Result Card View */}
              <div className="bg-slate-900 border-2 border-slate-700 rounded-xs p-5 flex flex-col justify-between">
                {scannedResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1 bg-emerald-950/80 px-2 py-0.5 rounded-xs border border-emerald-500/40">
                        <ShieldCheck className="w-3.5 h-3.5" /> Identity Verified
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs border ${getRoleBadgeStyle(
                          scannedResult.role
                        )}`}
                      >
                        {scannedResult.role}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <img
                        src={scannedResult.avatarUrl}
                        alt={scannedResult.name}
                        className="w-16 h-16 rounded-xs object-cover border-2 border-slate-600 shadow-md shrink-0"
                      />
                      <div className="space-y-1 min-w-0 flex-1">
                        <h3 className="font-serif italic font-bold text-lg text-white truncate">
                          {scannedResult.name}
                        </h3>
                        <div className="text-xs font-mono font-bold text-rose-400">
                          {scannedResult.identifier}
                        </div>
                        <div className="text-xs text-slate-300 font-medium">
                          {scannedResult.department}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {scannedResult.subTitle}
                        </div>
                      </div>
                    </div>

                    {scannedResult.bio && (
                      <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-xs text-xs text-slate-300 leading-relaxed font-sans">
                        "{scannedResult.bio}"
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800">
                      <div className="p-2 bg-slate-800/60 rounded-xs">
                        <span className="text-[9px] text-slate-400 block uppercase">Email Address</span>
                        <span className="text-white font-bold text-[11px] truncate block">
                          {scannedResult.email}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-800/60 rounded-xs">
                        <span className="text-[9px] text-slate-400 block uppercase">Phone Number</span>
                        <span className="text-white font-bold text-[11px] block">
                          {scannedResult.phone}
                        </span>
                      </div>
                    </div>

                    {scannedResult.subjects && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                          Handled Subjects:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {scannedResult.subjects.map((sub, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono bg-blue-950 text-blue-200 border border-blue-800 px-2 py-0.5 rounded-xs"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-3">
                      <button
                        onClick={() => {
                          if (onSelectRole) onSelectRole(scannedResult.role);
                          onClose();
                        }}
                        className="w-full py-2 bg-[#0f172a] hover:bg-[#1e293b] border border-slate-600 text-white font-mono text-xs font-bold uppercase rounded-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <UserCheck className="w-4 h-4 text-rose-400" />
                        <span>Switch View to {scannedResult.role} Portal</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="my-auto text-center space-y-3 py-12">
                    <QrCode className="w-12 h-12 text-slate-600 mx-auto" />
                    <div>
                      <h4 className="font-serif italic font-bold text-base text-slate-300">
                        No ID Card Scanned Yet
                      </h4>
                      <p className="text-xs font-mono text-slate-500 max-w-xs mx-auto mt-1">
                        Click "Simulate Scan" or choose a person from the directory tab to inspect their verified QR identity profile card.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'directory' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students, faculty, HODs, admins by Name, Roll No, Employee ID, Department..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 text-white text-xs font-mono rounded-xs focus:outline-none focus:border-[#e11d48]"
                />
              </div>

              {/* People Directory Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredProfiles.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProfile(p);
                      setScannedResult(p);
                      setActiveTab('scan');
                    }}
                    className="p-3 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/50 rounded-xs transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={p.avatarUrl}
                          alt={p.name}
                          className="w-10 h-10 rounded-xs object-cover border border-slate-700 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-serif italic font-bold text-sm text-white truncate group-hover:text-rose-400 transition-colors">
                            {p.name}
                          </h4>
                          <span className="text-xs font-mono text-rose-400 font-bold block">
                            {p.identifier}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-xs border shrink-0 uppercase ${getRoleBadgeStyle(
                          p.role
                        )}`}
                      >
                        {p.role}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono space-y-0.5 pt-1 border-t border-slate-800">
                      <div className="truncate font-semibold text-slate-300">{p.department}</div>
                      <div className="text-[10px] text-slate-500 truncate">{p.subTitle}</div>
                    </div>

                    {/* QR Preview Mini Bar */}
                    <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> QR Active
                      </span>
                      <span className="text-rose-400 group-hover:underline flex items-center gap-0.5 font-bold">
                        View Card <QrCode className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#1e293b] border-t border-slate-700 flex items-center justify-between text-xs font-mono shrink-0">
          <span className="text-slate-400">
            College Identity Portal • Total {allProfiles.length} Registered QR Badges
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#e11d48] hover:bg-rose-700 text-white font-bold uppercase transition rounded-xs cursor-pointer"
          >
            Close Scanner
          </button>
        </div>
      </div>
    </div>
  );
};
