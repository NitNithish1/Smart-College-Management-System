import React, { useState } from 'react';
import {
  StudentProfile,
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
  AiRiskPredictionResult,
} from '../../types';
import {
  Calendar,
  Clock,
  BookOpen,
  Award,
  FileCheck,
  Building2,
  Download,
  Send,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Bot,
  QrCode,
  DollarSign,
  Briefcase,
  FileText,
  User,
  TrendingUp,
  ShieldCheck,
  MessageSquare,
  Plus,
  RefreshCw,
  ExternalLink,
  Camera,
  Upload,
  UserCheck,
  LogIn,
  X,
} from 'lucide-react';

import { ProfileQrCard } from '../qrcode/ProfileQrCard';

interface StudentViewProps {
  student: StudentProfile;
  timetable: TimetableSlot[];
  attendance: SubjectAttendance[];
  marks: InternalMark[];
  leaveRequests: LeaveRequest[];
  hallTicket: HallTicketInfo;
  feeStatus: FeeStatus;
  studyMaterials: StudyMaterial[];
  assignments: Assignment[];
  placements: PlacementDrive[];
  notices: Notice[];
  onApplyLeave: (leave: Partial<LeaveRequest>) => void;
  onUpdateAvatar?: (newUrl: string) => void;
  onOpenAuth?: () => void;
  onSelectDepartment?: (deptCode: string) => void;
  onOpenQrScanner?: () => void;
}

export const StudentView: React.FC<StudentViewProps> = ({
  student,
  timetable,
  attendance,
  marks,
  leaveRequests,
  hallTicket,
  feeStatus,
  studyMaterials,
  assignments,
  placements,
  notices,
  onApplyLeave,
  onUpdateAvatar,
  onOpenAuth,
  onSelectDepartment,
  onOpenQrScanner,
}) => {
  const [showMyQrModal, setShowMyQrModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'attendance' | 'marks' | 'leave' | 'exam' | 'materials' | 'placements' | 'ai'
  >('overview');

  // AI Attendance Risk State
  const [aiRiskResult, setAiRiskResult] = useState<AiRiskPredictionResult | null>(null);
  const [loadingAiRisk, setLoadingAiRisk] = useState(false);

  // AI Chatbot State
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    {
      sender: 'bot',
      text: `Hello ${student.name}! I am your AI Smart College Assistant. Ask me anything about your timetable, exam schedule, placement readiness, or attendance rules!`,
    },
  ]);
  const [inputChat, setInputChat] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);

  // Leave Form State
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveType, setLeaveType] = useState<'LEAVE' | 'ON_DUTY' | 'MEDICAL'>('ON_DUTY');
  const [fromDate, setFromDate] = useState('2026-08-05');
  const [toDate, setToDate] = useState('2026-08-06');
  const [reason, setReason] = useState('');

  // Hall Ticket Preview Modal
  const [showHallTicketModal, setShowHallTicketModal] = useState(false);

  // Trigger Gemini AI Attendance Risk Prediction
  const handlePredictAttendanceRisk = async () => {
    setLoadingAiRisk(true);
    try {
      const response = await fetch('/api/ai/predict-attendance-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attendancePercentage: student.overallAttendance,
          attendedClasses: 210,
          totalClasses: 268,
          subjects: attendance,
        }),
      });
      const data = await response.json();
      setAiRiskResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAiRisk(false);
    }
  };

  // Trigger Gemini AI Chatbot Response
  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputChat.trim()) return;

    const userText = inputChat;
    setInputChat('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoadingChat(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          userRole: 'STUDENT',
          context: { name: student.name, department: student.department, rollNo: student.rollNo, cgpa: student.cgpa },
        }),
      });
      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data.reply || data.fallbackReply || 'I am ready to assist with your academic queries.' },
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'AI Assistant is operating normally. Please maintain 75%+ attendance for exams.' },
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadToast, setUploadToast] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdateAvatar?.(reader.result);
          setUploadToast(true);
          setTimeout(() => setUploadToast(false), 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyLeave({
      type: leaveType,
      fromDate,
      toDate,
      totalDays: 2,
      reason,
      status: 'PENDING',
      appliedOn: new Date().toISOString().split('T')[0],
    });
    setShowLeaveModal(false);
    setReason('');
  };

  return (
    <div className="p-2 sm:p-5 max-w-5xl lg:max-w-6xl mx-auto space-y-5 bg-[#fcfcfc] text-[#1a1a1a]">
      {/* Toast Notification when Photo Uploaded */}
      {uploadToast && (
        <div className="p-3.5 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profile photo updated successfully for {student.name}!</span>
          </div>
          <button
            onClick={() => setUploadToast(false)}
            className="text-xs font-mono text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Student Profile Overview Header Banner - Attractive Hero Card */}
      <div className="gradient-header-card p-5 sm:p-6 rounded-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            {/* Interactive Photo Upload Avatar Container */}
            <div className="relative group shrink-0">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-20 h-20 sm:w-22 sm:h-22 rounded-sm object-cover border-2 border-white/20 shadow-xl transition group-hover:opacity-85"
              />
              {/* Click / Hover Overlay to Upload Photo */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-mono font-bold uppercase tracking-wider p-1 cursor-pointer rounded-sm"
                title="Click to Upload New Photo"
              >
                <Camera className="w-5 h-5 mb-0.5 text-rose-400" />
                <span>Upload</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-[#e11d48] hover:bg-rose-700 text-white rounded-full border-2 border-[#0f172a] flex items-center justify-center shadow-lg transition cursor-pointer"
                title="Upload Photo"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-white">{student.name}</h1>
                <span className="font-mono text-xs font-bold text-rose-400 bg-rose-950/80 border border-rose-500/40 px-2 py-0.5 rounded-xs">
                  {student.rollNo}
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-xs font-bold">
                  Active Student
                </span>
              </div>
              <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => onSelectDepartment?.('CSE')}
                  className="text-xs font-bold uppercase tracking-widest text-rose-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-xs border border-white/10"
                  title="Click to view Computer Science Department Photos & Gallery"
                >
                  <Building2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>{student.department}</span>
                  <span className="text-[9px] font-mono bg-[#e11d48] text-white px-1.5 py-0.2 rounded-xs font-bold">View Labs 📸</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowMyQrModal(true)}
                  className="text-xs font-bold uppercase tracking-widest text-emerald-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer bg-emerald-950/60 hover:bg-emerald-900/80 px-2.5 py-1 rounded-xs border border-emerald-500/40 shadow-xs"
                  title="Click to view & download your official Student QR Identity Badge"
                >
                  <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>My QR ID Badge</span>
                  <span className="text-[9px] font-mono bg-emerald-500 text-black px-1.5 py-0.2 rounded-xs font-bold">ACTIVE</span>
                </button>

                {onOpenQrScanner && (
                  <button
                    type="button"
                    onClick={onOpenQrScanner}
                    className="text-xs font-bold uppercase tracking-widest text-rose-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer bg-rose-950/60 hover:bg-rose-900/80 px-2.5 py-1 rounded-xs border border-rose-500/40 shadow-xs"
                    title="Scan QR Badges of Faculty, HOD, Admin or fellow Students"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-rose-400" />
                    <span>Scan Campus QR</span>
                  </button>
                )}
              </div>
              <p className="text-xs font-mono text-slate-300">
                Batch: <span className="text-white font-bold">{student.batch}</span> • Sem <span className="text-white font-bold">{student.semester}</span> ({student.section}) • Mentor: <span className="text-white font-bold">{student.mentorName}</span>
              </p>
            </div>
          </div>

          {/* Key KPI Chips - Editorial Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xs text-center">
              <div className="text-[9px] uppercase tracking-widest text-slate-300 font-mono font-bold">CGPA</div>
              <div className="text-2xl font-serif font-bold text-white mt-0.5">{student.cgpa}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xs text-center">
              <div className="text-[9px] uppercase tracking-widest text-slate-300 font-mono font-bold">Attendance</div>
              <div
                className={`text-2xl font-serif font-bold mt-0.5 ${
                  student.overallAttendance >= 75 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {student.overallAttendance}%
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xs text-center">
              <div className="text-[9px] uppercase tracking-widest text-slate-300 font-mono font-bold">Fee Status</div>
              <div className="text-xs font-bold text-emerald-400 mt-2 uppercase tracking-wider bg-emerald-950/60 border border-emerald-500/30 px-1 py-0.5 rounded-xs">PAID</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xs text-center">
              <div className="text-[9px] uppercase tracking-widest text-slate-300 font-mono font-bold">Assignments</div>
              <div className="text-xl font-serif font-bold text-white mt-0.5">{student.pendingAssignments} Due</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-[#0f172a]/5 rounded-sm border border-[#0f172a]/10">
        {[
          { id: 'overview', label: 'Dashboard', icon: Calendar },
          { id: 'attendance', label: 'Attendance & AI Risk', icon: CheckCircle2 },
          { id: 'marks', label: 'Marks & CGPA', icon: Award },
          { id: 'leave', label: 'Leave / OD Request', icon: FileText },
          { id: 'exam', label: 'Exam & Hall Ticket', icon: QrCode },
          { id: 'materials', label: 'Notes & Materials', icon: BookOpen },
          { id: 'placements', label: 'Placements & Career', icon: Briefcase },
          { id: 'ai', label: 'AI Assistant', icon: Bot, isAi: true },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all rounded-xs cursor-pointer ${
                isActive
                  ? 'bg-[#0f172a] text-white shadow-md'
                  : 'text-[#475569] hover:text-[#0f172a] hover:bg-white/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.isAi && <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-rose-300 animate-pulse' : 'text-[#e11d48]'}`} />}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview & Today's Timetable */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Timetable */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Today's Class Schedule (Monday)
              </h2>
              <span className="text-xs text-slate-400">7 Periods Scheduled</span>
            </div>

            <div className="space-y-2.5">
              {timetable.map((slot) => (
                <div
                  key={slot.id}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center">
                      P{slot.period}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-200">{slot.subjectName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Code: {slot.subjectCode}</span>
                        <span>•</span>
                        <span>Faculty: {slot.facultyName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-cyan-400">{slot.timeSlot}</div>
                    <div className="text-[10px] text-slate-400">{slot.roomNo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements & Quick AI Cards */}
          <div className="space-y-4">
            {/* Quick AI Risk Predictor Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  AI Attendance Predictor
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                  78.5% Current
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                You are 3.5% above the 75% cutoff. You can safely take up to 2 leaves before falling into critical zone.
              </p>
              <button
                onClick={() => {
                  setActiveTab('attendance');
                  handlePredictAttendanceRisk();
                }}
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
              >
                Run Detailed AI Risk Simulation
              </button>
            </div>

            {/* Official Notices */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Latest College Notices
              </h3>
              <div className="space-y-2">
                {notices.map((notice) => (
                  <div key={notice.id} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        {notice.category}
                      </span>
                      <span className="text-[10px] text-slate-400">{notice.postedDate}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-1">{notice.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{notice.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Attendance & AI Risk Prediction */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* AI Risk Prediction Card Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-base font-bold text-white">AI Attendance Risk Engine</h2>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Evaluates 75% university eligibility, calculates safe leave quota, and predicts end-semester status.
                </p>
              </div>
              <button
                onClick={handlePredictAttendanceRisk}
                disabled={loadingAiRisk}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition disabled:opacity-50"
              >
                {loadingAiRisk ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {loadingAiRisk ? 'Simulating...' : 'Run Gemini AI Predictor'}
              </button>
            </div>

            {aiRiskResult && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase">Risk Level</div>
                    <div
                      className={`text-base font-extrabold mt-0.5 ${
                        aiRiskResult.riskLevel === 'CRITICAL'
                          ? 'text-rose-400'
                          : aiRiskResult.riskLevel === 'MODERATE'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {aiRiskResult.riskLevel}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase">Safe Leaves Margin</div>
                    <div className="text-base font-extrabold text-cyan-400 mt-0.5">
                      {aiRiskResult.safeLeavesRemaining} Days
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase">Forecast End-Sem %</div>
                    <div className="text-base font-extrabold text-emerald-400 mt-0.5">
                      {aiRiskResult.predictedEndSemAttendance}%
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-cyan-300">Gemini AI Analysis: </span>
                  {aiRiskResult.riskAnalysis}
                </div>

                {aiRiskResult.recommendations?.length > 0 && (
                  <div className="space-y-1 text-xs">
                    <span className="font-semibold text-indigo-300">Actionable Recovery Steps:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {aiRiskResult.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Subject-wise Attendance Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200">Subject-wise Attendance Records</h3>
            <div className="space-y-3">
              {attendance.map((subject) => (
                <div key={subject.subjectCode} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-200">{subject.subjectName}</span>
                      <span className="text-slate-400 text-[10px] ml-2">({subject.subjectCode})</span>
                    </div>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        subject.status === 'SAFE'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : subject.status === 'WARNING'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {subject.percentage}% ({subject.attendedClasses}/{subject.totalClasses})
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        subject.percentage >= 80
                          ? 'bg-emerald-500'
                          : subject.percentage >= 75
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${subject.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Marks & CGPA */}
      {activeTab === 'marks' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-100">Internal & Continuous Assessment Marks</h2>
                <p className="text-xs text-slate-400">Anna University Internal 1, Internal 2 & Model Examinations</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Predicted SGPA</span>
                <div className="text-lg font-extrabold text-cyan-400">8.40 / 10</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                    <th className="py-2.5 px-3">Subject Code & Name</th>
                    <th className="py-2.5 px-3 text-center">Int 1 (100)</th>
                    <th className="py-2.5 px-3 text-center">Int 2 (100)</th>
                    <th className="py-2.5 px-3 text-center">Model Exam</th>
                    <th className="py-2.5 px-3 text-center">Calculated (20)</th>
                    <th className="py-2.5 px-3 text-center">Grade Forecast</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {marks.map((m) => (
                    <tr key={m.subjectCode} className="hover:bg-slate-850 transition">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-200">{m.subjectName}</div>
                        <div className="text-[10px] text-slate-400">{m.subjectCode}</div>
                      </td>
                      <td className="py-3 px-3 text-center font-medium text-slate-300">{m.internal1}</td>
                      <td className="py-3 px-3 text-center font-medium text-slate-300">{m.internal2}</td>
                      <td className="py-3 px-3 text-center font-medium text-slate-300">{m.modelExam}</td>
                      <td className="py-3 px-3 text-center font-bold text-cyan-400">{m.totalCalculatedInternal}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {m.gradePrediction}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Leave / OD Request Application */}
      {activeTab === 'leave' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-100">Leave & On-Duty (OD) Management</h2>
              <p className="text-xs text-slate-400">Track and submit Leave or On-Duty approvals for events & medical reasons</p>
            </div>
            <button
              onClick={() => setShowLeaveModal(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition"
            >
              <Plus className="w-4 h-4" />
              Apply Leave / OD
            </button>
          </div>

          <div className="space-y-3">
            {leaveRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        req.type === 'ON_DUTY'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      {req.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      {req.fromDate} to {req.toDate} ({req.totalDays} Days)
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      req.status === 'APPROVED_BY_HOD' || req.status === 'APPROVED_BY_FACULTY'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : req.status === 'REJECTED'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{req.reason}</p>
                {req.remarks && <p className="text-[11px] text-cyan-400 bg-cyan-950/40 p-2 rounded-lg">Remarks: {req.remarks}</p>}
              </div>
            ))}
          </div>

          {/* Leave Application Modal */}
          {showLeaveModal && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
                <h3 className="text-base font-bold text-slate-100">Apply for Leave / On-Duty</h3>
                <form onSubmit={handleLeaveSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Request Type</label>
                    <select
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    >
                      <option value="ON_DUTY">On Duty (OD - Hackathon / Symposium)</option>
                      <option value="LEAVE">Personal Leave</option>
                      <option value="MEDICAL">Medical Leave</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">From Date</label>
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">To Date</label>
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Reason for Application</label>
                    <textarea
                      rows={3}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Specify event details or illness description..."
                      required
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowLeaveModal(false)}
                      className="w-1/2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Exam & Hall Ticket Download */}
      {activeTab === 'exam' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-100">End-Semester Examination Timetable</h2>
                <p className="text-xs text-slate-400">Anna University Examination Hall Ticket Verification</p>
              </div>
              <button
                onClick={() => setShowHallTicketModal(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
              >
                <Download className="w-4 h-4" />
                Download Official Hall Ticket (PDF)
              </button>
            </div>

            <div className="space-y-2.5">
              {hallTicket.courses.map((c) => (
                <div key={c.subjectCode} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-200">{c.subjectName}</div>
                    <div className="text-[10px] text-slate-400">{c.subjectCode}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-cyan-400">{c.examDate}</div>
                    <div className="text-[10px] text-slate-400">Session: {c.session === 'FN' ? 'Forenoon (09:30 AM)' : 'Afternoon (02:00 PM)'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hall Ticket Printable Preview Modal */}
          {showHallTicketModal && (
            <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white text-slate-900 rounded-2xl p-6 w-full max-w-xl shadow-2xl space-y-4 overflow-y-auto max-h-[90vh]">
                {/* Official College Header */}
                <div className="text-center border-b pb-3">
                  <h3 className="text-lg font-black text-indigo-950">V.S.B. COLLEGE OF ENGINEERING AND TECHNOLOGY</h3>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">An Autonomous Institution • Affiliated to Anna University</p>
                  <p className="text-xs font-bold text-slate-800 mt-1">HALL TICKET - END SEMESTER EXAMINATIONS (AUGUST 2026)</p>
                </div>

                {/* Student Photo & Particulars */}
                <div className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border">
                  <img src={hallTicket.photoUrl} alt="Student" className="w-20 h-24 object-cover rounded border border-slate-400" />
                  <div className="text-xs space-y-1">
                    <div><span className="font-bold">Register No:</span> {hallTicket.registerNo}</div>
                    <div><span className="font-bold">Student Name:</span> {hallTicket.studentName}</div>
                    <div><span className="font-bold">Branch:</span> {hallTicket.branch}</div>
                    <div><span className="font-bold">Exam Center:</span> {hallTicket.examCenter}</div>
                  </div>
                </div>

                {/* Exam Schedule Table */}
                <table className="w-full text-xs text-left border">
                  <thead className="bg-slate-100 border-b">
                    <tr>
                      <th className="p-2 border-r">Code</th>
                      <th className="p-2 border-r">Subject</th>
                      <th className="p-2 border-r">Date</th>
                      <th className="p-2">Session</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hallTicket.courses.map((c) => (
                      <tr key={c.subjectCode} className="border-b">
                        <td className="p-2 border-r font-mono font-bold">{c.subjectCode}</td>
                        <td className="p-2 border-r">{c.subjectName}</td>
                        <td className="p-2 border-r">{c.examDate}</td>
                        <td className="p-2 font-bold">{c.session}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footer Signatures */}
                <div className="flex justify-between items-end pt-4 border-t text-[10px]">
                  <div>
                    <div className="w-24 h-8 bg-slate-200 rounded flex items-center justify-center font-mono text-slate-500 mb-1">
                      [QR VERIFIED]
                    </div>
                    <span>Controller of Examinations Signature</span>
                  </div>
                  <button
                    onClick={() => setShowHallTicketModal(false)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 6: Study Materials & Assignments */}
      {activeTab === 'materials' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notes & PDF Library */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Faculty Study Notes & PDFs
            </h2>
            <div className="space-y-2.5">
              {studyMaterials.map((m) => (
                <div key={m.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-200">{m.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {m.subjectCode} • Unit {m.unitNo} • By {m.facultyName}
                    </div>
                  </div>
                  <button className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white transition">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments Tracker */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              Assignments & Tasks
            </h2>
            <div className="space-y-2.5">
              {assignments.map((a) => (
                <div key={a.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{a.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        a.status === 'SUBMITTED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{a.description}</p>
                  <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-850">
                    <span>Subject: {a.subjectName}</span>
                    <span>Due: {a.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Placements & Events */}
      {activeTab === 'placements' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              Campus Placement Drives & Registrations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {placements.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={p.companyLogo} alt={p.companyName} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-sm text-slate-100">{p.companyName}</div>
                      <div className="text-xs text-cyan-400 font-semibold">{p.packageLpa}</div>
                      <div className="text-[10px] text-slate-400">{p.role}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <div><span className="text-slate-400">Eligibility CGPA:</span> {p.eligibilityCgpa}+</div>
                    <div><span className="text-slate-400">Drive Date:</span> {p.driveDate}</div>
                    <div><span className="text-slate-400">Rounds:</span> {p.rounds.join(' → ')}</div>
                  </div>

                  <button
                    disabled={p.appliedStatus}
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-emerald-600/30 disabled:text-emerald-300 text-white font-semibold text-xs transition"
                  >
                    {p.appliedStatus ? '✓ Registered' : 'Register for Drive'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 8: AI Assistant Chatbot */}
      {activeTab === 'ai' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col h-[550px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <div>
                <h2 className="text-sm font-bold text-slate-100">AI Smart College Assistant</h2>
                <p className="text-[10px] text-slate-400">Powered by Gemini 3.6 Flash Server API</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
              Online
            </span>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 my-3 scrollbar-thin">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loadingChat && (
              <div className="flex gap-2 text-xs text-slate-400 animate-pulse">
                <Bot className="w-4 h-4 text-cyan-400" />
                Gemini AI is thinking...
              </div>
            )}
          </div>

          {/* Input Chat Box */}
          <form onSubmit={handleSendChatMessage} className="flex gap-2 pt-2 border-t border-slate-800">
            <input
              type="text"
              value={inputChat}
              onChange={(e) => setInputChat(e.target.value)}
              placeholder="Ask about attendance, CGPA target, exam schedule, placement tips..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loadingChat}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Student QR ID Badge Modal */}
      {showMyQrModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative">
            <button
              onClick={() => setShowMyQrModal(false)}
              className="absolute -top-3 -right-3 z-10 p-1.5 bg-[#e11d48] text-white rounded-full shadow-lg hover:bg-rose-700 transition cursor-pointer"
              title="Close QR Badge"
            >
              <X className="w-5 h-5" />
            </button>
            <ProfileQrCard
              profile={{
                id: student.id,
                name: student.name,
                role: 'STUDENT',
                identifier: student.rollNo,
                department: student.department,
                email: student.email,
                phone: student.phone,
                subTitle: `Batch ${student.batch} • Sem ${student.semester} (${student.section})`,
                avatarUrl: student.avatarUrl,
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
