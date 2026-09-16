import React, { useState, useRef } from 'react';
import { FacultyProfile, LeaveRequest } from '../../types';
import {
  initialDepartmentStudents,
  DEPARTMENTS,
  ACADEMIC_YEARS,
  SECTIONS,
  DepartmentStudent,
} from '../../data/allStudentsData';
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Upload,
  FileCheck,
  Search,
  Check,
  X,
  Plus,
  BarChart2,
  Camera,
  Image as ImageIcon,
  FileText,
  Sparkles,
  Filter,
  UserPlus,
  RotateCcw,
  UserCheck,
  QrCode,
  Building2,
} from 'lucide-react';
import { ProfileQrCard } from '../qrcode/ProfileQrCard';

interface FacultyViewProps {
  faculty: FacultyProfile;
  leaveRequests: LeaveRequest[];
  onApproveLeave: (id: string, approve: boolean) => void;
  onUpdateAvatar?: (newUrl: string) => void;
  onOpenAuth?: () => void;
  onSelectDepartment?: (deptCode: string) => void;
  onOpenQrScanner?: () => void;
}

export const FacultyView: React.FC<FacultyViewProps> = ({ faculty, leaveRequests, onApproveLeave, onUpdateAvatar, onOpenAuth, onSelectDepartment, onOpenQrScanner }) => {
  const [showMyQrModal, setShowMyQrModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'mark_attendance' | 'marks_upload' | 'leave_approvals' | 'notes_upload'>('mark_attendance');

  // Department & Class Attendance Selection state
  const [selectedDept, setSelectedDept] = useState('CSE');
  const [selectedYear, setSelectedYear] = useState('III Year');
  const [selectedSection, setSelectedSection] = useState('Sec A');
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // All Students Database state
  const [studentList, setStudentList] = useState<DepartmentStudent[]>(initialDepartmentStudents);

  // Add New Student Modal state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    registerNo: '',
    department: 'CSE',
    year: 'III Year',
    section: 'Sec A',
    email: '',
    phone: '',
  });

  // Faculty avatar photo upload state
  const facultyFileInputRef = useRef<HTMLInputElement>(null);
  const [photoToast, setPhotoToast] = useState(false);

  // Upload Notes / Materials photo state
  const noteFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedNotePhoto, setUploadedNotePhoto] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('CS8651 - Mobile Application Development');
  const [noteToast, setNoteToast] = useState(false);

  // Upload Marks sheet photo & class selection state
  const marksFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedMarksPhoto, setUploadedMarksPhoto] = useState<string | null>(null);
  const [marksToast, setMarksToast] = useState(false);
  const [marksDept, setMarksDept] = useState('CSE');
  const [marksYear, setMarksYear] = useState('III Year');
  const [marksSection, setMarksSection] = useState('Sec A');
  const [marksAssessment, setMarksAssessment] = useState('Internal Assessment Test 1 (100 Marks)');
  const [marksSubject, setMarksSubject] = useState('CS8651 - Mobile Application Development');
  const [studentMarksMap, setStudentMarksMap] = useState<Record<string, number | string>>({
    'S-101': 92,
    'S-102': 88,
    'S-103': 76,
    'S-104': 0,
    'S-105': 85,
    'S-106': 94,
    'S-107': 81,
    'S-108': 89,
    'S-109': 87,
    'S-110': 91,
    'S-201': 90,
    'S-202': 86,
    'S-301': 78,
    'S-401': 95,
    'S-501': 84,
    'S-601': 82,
    'S-701': 88,
    'S-801': 79,
    'S-901': 93,
    'S-951': 91,
  });

  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);

  const handleFacultyAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdateAvatar?.(reader.result);
          setPhotoToast(true);
          setTimeout(() => setPhotoToast(false), 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setUploadedNotePhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    setNoteToast(true);
    setTimeout(() => {
      setNoteToast(false);
      setNoteTitle('');
      setUploadedNotePhoto(null);
    }, 3000);
  };

  const handleMarksPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setUploadedMarksPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMarksSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMarksToast(true);
    setTimeout(() => {
      setMarksToast(false);
      setUploadedMarksPhoto(null);
    }, 3000);
  };

  const toggleStudentStatus = (id: string, nextStatus: 'PRESENT' | 'ABSENT' | 'ON_DUTY') => {
    setStudentList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: nextStatus } : s))
    );
  };

  const handleMarkAll = (status: 'PRESENT' | 'ABSENT') => {
    const currentStudentIds = new Set(
      studentList
        .filter((s) => s.department === selectedDept && s.year === selectedYear && s.section === selectedSection)
        .map((s) => s.id)
    );
    setStudentList((prev) =>
      prev.map((s) => (currentStudentIds.has(s.id) ? { ...s, status } : s))
    );
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.rollNo) return;

    const createdStudent: DepartmentStudent = {
      id: `S-${Date.now()}`,
      rollNo: newStudent.rollNo,
      registerNo: newStudent.registerNo || `9225${newStudent.rollNo}`,
      name: newStudent.name,
      department: newStudent.department,
      year: newStudent.year,
      section: newStudent.section,
      email: newStudent.email || `${newStudent.rollNo.toLowerCase()}@smartcollege.edu.in`,
      phone: newStudent.phone || '+91 98765 00000',
      status: 'PRESENT',
    };

    setStudentList((prev) => [createdStudent, ...prev]);
    // Switch filter to match newly added student's dept & year
    setSelectedDept(newStudent.department);
    setSelectedYear(newStudent.year);
    setSelectedSection(newStudent.section);

    setNewStudent({
      name: '',
      rollNo: '',
      registerNo: '',
      department: 'CSE',
      year: 'III Year',
      section: 'Sec A',
      email: '',
      phone: '',
    });
    setShowAddStudentModal(false);
  };

  const handleAttendanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttendanceSubmitted(true);
    setTimeout(() => setAttendanceSubmitted(false), 3500);
  };

  // Filter students for current class view
  const filteredStudents = studentList.filter((s) => {
    const matchesDept = s.department === selectedDept;
    const matchesYear = s.year === selectedYear;
    const matchesSection = s.section === selectedSection;
    const matchesQuery =
      searchQuery.trim() === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.registerNo.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDept && matchesYear && matchesSection && matchesQuery;
  });

  // Calculate statistics for current class view
  const currentClassStudents = studentList.filter(
    (s) => s.department === selectedDept && s.year === selectedYear && s.section === selectedSection
  );
  const totalCount = currentClassStudents.length;
  const presentCount = currentClassStudents.filter((s) => s.status === 'PRESENT').length;
  const absentCount = currentClassStudents.filter((s) => s.status === 'ABSENT').length;
  const onDutyCount = currentClassStudents.filter((s) => s.status === 'ON_DUTY').length;
  const attendancePercentage = totalCount > 0 ? Math.round(((presentCount + onDutyCount) / totalCount) * 100) : 0;

  return (
    <div className="p-2 sm:p-5 max-w-5xl lg:max-w-6xl mx-auto space-y-5 bg-[#fcfcfc] text-[#1a1a1a]">
      {/* Toast Notification when Profile Photo Uploaded */}
      {photoToast && (
        <div className="p-3.5 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Faculty profile photo updated successfully for {faculty.name}!</span>
          </div>
          <button onClick={() => setPhotoToast(false)} className="text-xs font-mono text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Faculty Header - Editorial Aesthetic */}
      <div className="border-b-[3px] border-[#1a1a1a] pb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Interactive Faculty Photo Upload Container */}
          <div className="relative group shrink-0">
            <img src={faculty.avatarUrl} alt={faculty.name} className="w-20 h-20 rounded-sm object-cover border border-[#1a1a1a] shadow-sm transition group-hover:opacity-85" />
            <button
              type="button"
              onClick={() => facultyFileInputRef.current?.click()}
              className="absolute inset-0 bg-[#1a1a1a]/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-mono font-bold uppercase tracking-wider p-1 cursor-pointer"
              title="Upload Faculty Photo"
            >
              <Camera className="w-5 h-5 mb-0.5 text-white" />
              <span>Upload Photo</span>
            </button>
            <button
              type="button"
              onClick={() => facultyFileInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-[#1a1a1a] hover:bg-[#e11d48] text-white rounded-full border border-white flex items-center justify-center shadow transition cursor-pointer"
              title="Upload Photo"
            >
              <Upload className="w-3 h-3" />
            </button>
            <input
              type="file"
              ref={facultyFileInputRef}
              onChange={handleFacultyAvatarUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-serif italic font-bold tracking-tight text-[#1a1a1a]">{faculty.name}</h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-widest text-[#888888]">{faculty.designation} •</span>
              <button
                type="button"
                onClick={() => onSelectDepartment?.('CSE')}
                className="text-xs font-bold uppercase tracking-widest text-[#e11d48] hover:text-[#1a1a1a] transition-colors flex items-center gap-1 cursor-pointer"
                title="Click to view Computer Science Department Photos & Gallery"
              >
                <span>{faculty.department}</span>
                <span className="text-[10px] font-mono bg-[#1a1a1a] text-white px-1.5 py-0.2 rounded-xs">View Photos 📸</span>
              </button>

              <button
                type="button"
                onClick={() => setShowMyQrModal(true)}
                className="text-xs font-bold uppercase tracking-widest text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-xs border border-emerald-300"
                title="View & Download Faculty Digital QR Identity Badge"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                <span>Faculty QR Badge</span>
              </button>

              {onOpenQrScanner && (
                <button
                  type="button"
                  onClick={onOpenQrScanner}
                  className="text-xs font-bold uppercase tracking-widest text-rose-700 hover:text-rose-900 transition-colors flex items-center gap-1 cursor-pointer bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-xs border border-rose-300"
                  title="Scan Student or Faculty QR Badge"
                >
                  <UserCheck className="w-3.5 h-3.5 text-rose-600" />
                  <span>Scan Campus QR</span>
                </button>
              )}
            </div>
            <p className="text-[11px] font-mono text-[#888888] mt-0.5">Assigned Classes: {faculty.assignedClasses.join(', ')}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="editorial-card p-3 text-center min-w-[120px]">
            <div className="text-[9px] uppercase tracking-widest font-bold text-[#888888]">Handled Subjects</div>
            <div className="text-2xl font-serif font-bold text-[#1a1a1a] mt-0.5">{faculty.handledSubjects.length}</div>
          </div>
        </div>
      </div>

      {/* Tabs - Editorial Style */}
      <div className="flex items-center gap-2 border-b border-[#e0e0e0] pb-2 overflow-x-auto">
        {[
          { id: 'mark_attendance', label: 'Mark Attendance', icon: CheckCircle2 },
          { id: 'marks_upload', label: 'Internal Marks Entry', icon: BarChart2 },
          { id: 'leave_approvals', label: 'Student Leave Approvals', icon: FileCheck },
          { id: 'notes_upload', label: 'Upload Study Notes', icon: Upload },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                isActive
                  ? 'border-b-2 border-[#1a1a1a] text-[#1a1a1a]'
                  : 'text-[#888888] hover:text-[#1a1a1a]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Mark Attendance - All Departments & All Years */}
      {activeTab === 'mark_attendance' && (
        <div className="editorial-card p-6 space-y-6">
          {/* Header & Department/Year Selection Controls */}
          <div className="space-y-4 pb-4 border-b border-[#e0e0e0]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif italic font-bold text-[#1a1a1a]">
                  Daily Class Attendance Entry (All Departments & Academic Years)
                </h2>
                <p className="text-xs font-mono text-[#888888] mt-0.5">
                  Select Department, Year & Section to take period attendance.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddStudentModal(true)}
                className="editorial-btn text-xs py-2 px-3 flex items-center justify-center gap-1.5 shrink-0"
              >
                <UserPlus className="w-4 h-4" /> Add Student to Roll
              </button>
            </div>

            {/* Department, Year, Section, Period Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-[#f9f9f9] p-3.5 border border-[#1a1a1a]">
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Department</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full p-2 border border-[#1a1a1a] bg-white text-[#1a1a1a] font-mono text-xs font-bold"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} - {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Academic Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-2 border border-[#1a1a1a] bg-white text-[#1a1a1a] font-mono text-xs font-bold"
                >
                  {ACADEMIC_YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full p-2 border border-[#1a1a1a] bg-white text-[#1a1a1a] font-mono text-xs font-bold"
                >
                  {SECTIONS.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Period Slot</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                  className="w-full p-2 border border-[#1a1a1a] bg-white text-[#1a1a1a] font-mono text-xs font-bold"
                >
                  <option value={1}>Period 1 (09:15 - 10:05 AM)</option>
                  <option value={2}>Period 2 (10:05 - 10:55 AM)</option>
                  <option value={3}>Period 3 (11:10 - 12:00 PM)</option>
                  <option value={4}>Period 4 (12:00 - 12:50 PM)</option>
                  <option value={5}>Period 5 (01:45 - 02:35 PM)</option>
                  <option value={6}>Period 6 (02:35 - 03:25 PM)</option>
                  <option value={7}>Period 7 (03:25 - 04:15 PM)</option>
                </select>
              </div>
            </div>

            {/* Attendance Analytics & Class Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2 border border-[#1a1a1a] bg-white">
                <div className="text-[9px] uppercase font-bold text-[#888888]">Total Students</div>
                <div className="text-lg font-bold font-serif text-[#1a1a1a]">{totalCount}</div>
              </div>
              <div className="p-2 border border-[#1a1a1a] bg-emerald-50">
                <div className="text-[9px] uppercase font-bold text-emerald-800">Present</div>
                <div className="text-lg font-bold font-serif text-emerald-700">{presentCount}</div>
              </div>
              <div className="p-2 border border-[#1a1a1a] bg-rose-50">
                <div className="text-[9px] uppercase font-bold text-rose-800">Absent</div>
                <div className="text-lg font-bold font-serif text-rose-700">{absentCount}</div>
              </div>
              <div className="p-2 border border-[#1a1a1a] bg-cyan-50">
                <div className="text-[9px] uppercase font-bold text-cyan-800">On Duty (OD)</div>
                <div className="text-lg font-bold font-serif text-cyan-700">{onDutyCount}</div>
              </div>
              <div className="p-2 border border-[#1a1a1a] bg-[#1a1a1a] text-white col-span-2 sm:col-span-1">
                <div className="text-[9px] uppercase font-bold text-slate-300">Class Attendance %</div>
                <div className="text-lg font-bold font-serif text-emerald-400">{attendancePercentage}%</div>
              </div>
            </div>

            {/* Search Bar & Quick Bulk Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${selectedYear} ${selectedDept} ${selectedSection} students by name or roll no...`}
                  className="w-full pl-9 pr-3 py-2 border border-[#1a1a1a] bg-white text-xs font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-[#1a1a1a]"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleMarkAll('PRESENT')}
                  className="editorial-btn-outline text-[10px] py-1.5 px-2.5 flex items-center gap-1"
                  title="Mark All Present"
                >
                  <Check className="w-3 h-3 text-emerald-600" /> All Present
                </button>
                <button
                  type="button"
                  onClick={() => handleMarkAll('ABSENT')}
                  className="editorial-btn-outline text-[10px] py-1.5 px-2.5 flex items-center gap-1"
                  title="Mark All Absent"
                >
                  <X className="w-3 h-3 text-rose-600" /> All Absent
                </button>
              </div>
            </div>
          </div>

          {attendanceSubmitted && (
            <div className="p-3 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Attendance successfully recorded for {selectedYear} {selectedDept} ({selectedSection}) - Period {selectedPeriod}!
            </div>
          )}

          {/* Student Roll Call List */}
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {filteredStudents.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#1a1a1a] bg-[#f9f9f9]">
                <p className="text-xs font-bold uppercase text-[#1a1a1a]">No students found for this filter</p>
                <p className="text-[11px] font-mono text-[#888888] mt-1">
                  Department: {selectedDept} | Year: {selectedYear} | Section: {selectedSection}
                </p>
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(true)}
                  className="mt-3 editorial-btn text-xs py-1.5 px-3 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Student to Roll
                </button>
              </div>
            ) : (
              filteredStudents.map((s) => (
                <div
                  key={s.id}
                  className="p-3.5 border border-[#e0e0e0] bg-[#f9f9f9] hover:bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs transition shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1a1a1a] text-sm">{s.name}</span>
                      <span className="editorial-tag bg-white font-mono text-[9px] py-0.5 px-1.5">
                        {s.department} • {s.year} ({s.section})
                      </span>
                    </div>
                    <div className="text-[#888888] font-mono text-[10px] mt-0.5 flex flex-wrap gap-x-3">
                      <span>Roll No: <strong>{s.rollNo}</strong></span>
                      <span>Reg No: <strong>{s.registerNo}</strong></span>
                      <span>{s.email}</span>
                    </div>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => toggleStudentStatus(s.id, 'PRESENT')}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition ${
                        s.status === 'PRESENT'
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-white text-[#888888] border-[#e0e0e0] hover:border-[#1a1a1a]'
                      }`}
                    >
                      PRESENT
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStudentStatus(s.id, 'ABSENT')}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition ${
                        s.status === 'ABSENT'
                          ? 'bg-[#e11d48] text-white border-[#e11d48]'
                          : 'bg-white text-[#888888] border-[#e0e0e0] hover:border-[#e11d48]'
                      }`}
                    >
                      ABSENT
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStudentStatus(s.id, 'ON_DUTY')}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition ${
                        s.status === 'ON_DUTY'
                          ? 'bg-cyan-800 text-white border-cyan-800'
                          : 'bg-white text-[#888888] border-[#e0e0e0] hover:border-cyan-800'
                      }`}
                    >
                      ON DUTY
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleAttendanceSubmit}
            className="w-full editorial-btn py-3 text-xs flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Submit {selectedYear} {selectedDept} ({selectedSection}) Attendance Record
          </button>
        </div>
      )}

      {/* Add New Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="editorial-card bg-white p-6 max-w-lg w-full space-y-4 border-2 border-[#1a1a1a]">
            <div className="flex items-center justify-between pb-3 border-b border-[#e0e0e0]">
              <h3 className="text-lg font-serif italic font-bold text-[#1a1a1a]">Add New Student to Roll</h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-xs font-mono text-[#888888] hover:text-[#1a1a1a]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g. GN Nithish"
                  className="w-full p-2 border border-[#1a1a1a] bg-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Roll Number *</label>
                  <input
                    type="text"
                    required
                    value={newStudent.rollNo}
                    onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                    placeholder="e.g. 21CS042"
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Register Number</label>
                  <input
                    type="text"
                    value={newStudent.registerNo}
                    onChange={(e) => setNewStudent({ ...newStudent, registerNo: e.target.value })}
                    placeholder="e.g. 922521104042"
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Department</label>
                  <select
                    value={newStudent.department}
                    onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                    className="w-full p-2 border border-[#1a1a1a] bg-white font-mono text-xs font-bold"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Year</label>
                  <select
                    value={newStudent.year}
                    onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                    className="w-full p-2 border border-[#1a1a1a] bg-white font-mono text-xs font-bold"
                  >
                    {ACADEMIC_YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Section</label>
                  <select
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                    className="w-full p-2 border border-[#1a1a1a] bg-white font-mono text-xs font-bold"
                  >
                    {SECTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Email ID</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="student@smartcollege.edu.in"
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button type="submit" className="flex-1 editorial-btn">
                  Save Student
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="editorial-btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Leave Approvals */}
      {activeTab === 'leave_approvals' && (
        <div className="editorial-card p-6 space-y-4">
          <h2 className="text-xl font-serif italic font-bold text-[#1a1a1a]">Pending Student Leave / OD Requests</h2>
          <div className="space-y-3">
            {leaveRequests.map((req) => (
              <div key={req.id} className="p-4 border border-[#e0e0e0] bg-[#f9f9f9] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1a1a1a]">
                    {req.studentName} ({req.rollNo})
                  </span>
                  <span className="editorial-tag bg-white">
                    {req.type}
                  </span>
                </div>
                <p className="text-[#1a1a1a]">{req.reason}</p>
                <div className="text-[10px] font-mono text-[#888888]">
                  Dates: {req.fromDate} to {req.toDate} ({req.totalDays} Days)
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => onApproveLeave(req.id, true)}
                    className="editorial-btn flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => onApproveLeave(req.id, false)}
                    className="editorial-btn-outline flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Internal Marks Entry & Photo Scan */}
      {activeTab === 'marks_upload' && (
        <div className="editorial-card p-6 space-y-6">
          <div>
            <h2 className="text-xl font-serif italic font-bold text-[#1a1a1a]">
              Internal Marks Upload & Answer Sheet Photo Scan
            </h2>
            <p className="text-xs font-mono text-[#888888] mt-1">
              Select any Department & Year to enter Anna University Internal Assessment marks or scan physical answer sheets.
            </p>
          </div>

          {marksToast && (
            <div className="p-3.5 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Internal Assessment Marks & Answer Sheet Photos for {marksYear} {marksDept} ({marksSection}) synchronized with COE Controller!
            </div>
          )}

          <form onSubmit={handleMarksSubmit} className="space-y-6">
            {/* Class, Department & Assessment Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-[#f9f9f9] p-4 border border-[#1a1a1a]">
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Department</label>
                <select
                  value={marksDept}
                  onChange={(e) => setMarksDept(e.target.value)}
                  className="w-full p-2 border border-[#1a1a1a] bg-white text-[#1a1a1a] font-mono text-xs font-bold"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} - {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Academic Year</label>
                <select
                  value={marksYear}
                  onChange={(e) => setMarksYear(e.target.value)}
                  className="w-full p-2 border border-[#1a1a1a] bg-white text-[#1a1a1a] font-mono text-xs font-bold"
                >
                  {ACADEMIC_YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Section</label>
                <select
                  value={marksSection}
                  onChange={(e) => setMarksSection(e.target.value)}
                  className="w-full p-2 border border-[#1a1a1a] bg-white text-[#1a1a1a] font-mono text-xs font-bold"
                >
                  {SECTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Assessment Type</label>
                <select
                  value={marksAssessment}
                  onChange={(e) => setMarksAssessment(e.target.value)}
                  className="w-full p-2 border border-[#1a1a1a] bg-white text-[#1a1a1a] font-mono text-xs font-bold"
                >
                  <option value="Internal Assessment Test 1 (100 Marks)">Internal Assessment Test 1 (100 Marks)</option>
                  <option value="Internal Assessment Test 2 (100 Marks)">Internal Assessment Test 2 (100 Marks)</option>
                  <option value="Internal Assessment Test 3 (100 Marks)">Internal Assessment Test 3 (100 Marks)</option>
                  <option value="Model Examination (100 Marks)">Model Examination (100 Marks)</option>
                  <option value="Lab Practical Internal (100 Marks)">Lab Practical Internal (100 Marks)</option>
                </select>
              </div>
            </div>

            {/* Subject Code / Title */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#1a1a1a] mb-1">Subject Code & Name</label>
              <input
                type="text"
                value={marksSubject}
                onChange={(e) => setMarksSubject(e.target.value)}
                placeholder="e.g. CS8651 - Mobile Application Development"
                required
                className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs font-mono"
              />
            </div>

            {/* Answer Sheet / Marksheet Photo Upload & Optical Scan */}
            <div className="p-4 border-2 border-dashed border-[#1a1a1a] bg-[#f9f9f9] space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase text-[#1a1a1a] flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-[#e11d48]" /> Upload Evaluated Answer Sheet / Marksheet Photo
                  </span>
                  <p className="text-[10px] font-mono text-[#888888] mt-0.5">
                    Capture or attach photo of physical evaluated answer register for AI Optical Mark Recognition (OMR/OCR)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => marksFileInputRef.current?.click()}
                  className="editorial-btn-outline text-xs py-1.5 px-3 flex items-center gap-1 shrink-0"
                >
                  <Upload className="w-3.5 h-3.5" /> Attach Photo
                </button>
                <input
                  type="file"
                  ref={marksFileInputRef}
                  onChange={handleMarksPhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {uploadedMarksPhoto && (
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-3 border border-[#1a1a1a]">
                  <img src={uploadedMarksPhoto} alt="Uploaded Marksheet" className="w-24 h-24 object-cover border border-[#1a1a1a]" />
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Answer sheet photo attached successfully
                    </div>
                    <div className="text-[11px] text-[#1a1a1a] font-mono">
                      AI OMR Scanner: Verified evaluated marksheet image for <strong>{marksYear} {marksDept} ({marksSection})</strong>.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Student Marks Entry Table */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm font-serif italic font-bold text-[#1a1a1a]">
                  Student Marks Roll ({marksYear} {marksDept} - {marksSection})
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const currentStudents = studentList.filter(
                        (s) => s.department === marksDept && s.year === marksYear && s.section === marksSection
                      );
                      const updated = { ...studentMarksMap };
                      currentStudents.forEach((s) => {
                        updated[s.id] = 85;
                      });
                      setStudentMarksMap(updated);
                    }}
                    className="editorial-btn-outline text-[10px] py-1 px-2.5 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-amber-600" /> Fill Default High Marks (85)
                  </button>
                </div>
              </div>

              {/* Student Marks List */}
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {studentList.filter(
                  (s) => s.department === marksDept && s.year === marksYear && s.section === marksSection
                ).length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-[#1a1a1a] bg-[#f9f9f9]">
                    <p className="text-xs font-bold uppercase text-[#1a1a1a]">No registered students in {marksYear} {marksDept} ({marksSection})</p>
                    <p className="text-[10px] font-mono text-[#888888] mt-1">Switch department or year using the selector above.</p>
                  </div>
                ) : (
                  studentList
                    .filter((s) => s.department === marksDept && s.year === marksYear && s.section === marksSection)
                    .map((s) => {
                      const currentMark = studentMarksMap[s.id] !== undefined ? studentMarksMap[s.id] : 80;
                      const numMark = Number(currentMark) || 0;
                      const isPass = numMark >= 50;

                      return (
                        <div
                          key={s.id}
                          className="p-3 border border-[#e0e0e0] bg-[#f9f9f9] hover:bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs transition"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#1a1a1a]">{s.name}</span>
                              <span className="text-[10px] font-mono text-[#888888]">
                                Roll: {s.rollNo} | Reg: {s.registerNo}
                              </span>
                            </div>
                            <div className="text-[10px] font-mono text-[#888888]">
                              {s.department} • {s.year} ({s.section})
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <div className="flex items-center gap-1.5">
                              <label className="text-[10px] font-bold uppercase text-[#888888]">Marks / 100:</label>
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={currentMark}
                                onChange={(e) =>
                                  setStudentMarksMap({
                                    ...studentMarksMap,
                                    [s.id]: e.target.value === '' ? '' : Number(e.target.value),
                                  })
                                }
                                className="w-20 p-1.5 border border-[#1a1a1a] bg-white font-mono font-bold text-center text-xs"
                              />
                            </div>

                            <span
                              className={`px-2 py-0.5 text-[9px] font-bold uppercase font-mono border ${
                                isPass
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-rose-50 text-rose-800 border-rose-300'
                              }`}
                            >
                              {isPass ? 'PASS' : 'FAIL'}
                            </span>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>

            <button type="submit" className="w-full editorial-btn py-3 text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Synchronize {marksYear} {marksDept} Internal Marks Record
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Upload Study Notes & Photos */}
      {activeTab === 'notes_upload' && (
        <div className="editorial-card p-6 space-y-6">
          <div>
            <h2 className="text-xl font-serif italic font-bold text-[#1a1a1a]">Upload Lecture Notes, Question Banks & Photo Sheets</h2>
            <p className="text-xs font-mono text-[#888888] mt-1">Share handwritten notes photos or PDF study materials with students.</p>
          </div>

          {noteToast && (
            <div className="p-3.5 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Study Material and Note photo uploaded and published to Student Portal!
            </div>
          )}

          <form onSubmit={handleSaveNotes} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#1a1a1a] mb-1">Subject Name & Code</label>
                <select
                  value={noteSubject}
                  onChange={(e) => setNoteSubject(e.target.value)}
                  className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs font-mono"
                >
                  <option value="CS8651 - Mobile Application Development">CS8651 - Mobile Application Development</option>
                  <option value="CS8691 - Artificial Intelligence">CS8691 - Artificial Intelligence</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#1a1a1a] mb-1">Document / Note Title</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="e.g. Unit 3 React Native & Flutter Notes"
                  required
                  className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs"
                />
              </div>
            </div>

            {/* Note Photo Attachment */}
            <div className="p-4 border-2 border-dashed border-[#1a1a1a] bg-[#f9f9f9] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-[#1a1a1a] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#e11d48]" /> Upload Handwritten Photo or Note Sheet
                  </span>
                  <p className="text-[10px] font-mono text-[#888888]">JPG/PNG photo or document scan</p>
                </div>
                <button
                  type="button"
                  onClick={() => noteFileInputRef.current?.click()}
                  className="editorial-btn-outline text-xs py-1.5 px-3 flex items-center gap-1"
                >
                  <Camera className="w-3.5 h-3.5" /> Take/Upload Photo
                </button>
                <input
                  type="file"
                  ref={noteFileInputRef}
                  onChange={handleNotePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {uploadedNotePhoto && (
                <div className="pt-2 flex items-center gap-3">
                  <img src={uploadedNotePhoto} alt="Uploaded Note" className="w-24 h-24 object-cover border border-[#1a1a1a]" />
                  <div className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Photo attached successfully
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="w-full editorial-btn">
              Publish Material to Student Dashboard
            </button>
          </form>
        </div>
      )}

      {/* Faculty QR ID Badge Modal */}
      {showMyQrModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative">
            <button
              onClick={() => setShowMyQrModal(false)}
              className="absolute -top-3 -right-3 z-10 p-1.5 bg-[#e11d48] text-white rounded-full shadow-lg hover:bg-rose-700 transition cursor-pointer"
              title="Close Faculty QR Badge"
            >
              <X className="w-5 h-5" />
            </button>
            <ProfileQrCard
              profile={{
                id: faculty.id,
                name: faculty.name,
                role: 'FACULTY',
                identifier: faculty.employeeId,
                department: faculty.department,
                email: faculty.email,
                phone: faculty.phone,
                subTitle: faculty.designation,
                avatarUrl: faculty.avatarUrl,
              }}
              onOpenScanner={() => {
                setShowMyQrModal(false);
                if (onOpenQrScanner) onOpenQrScanner();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
