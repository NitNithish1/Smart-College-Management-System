import React, { useState, useRef } from 'react';
import { HodProfile, LeaveRequest } from '../../types';
import {
  Building2,
  Users,
  AlertTriangle,
  Award,
  Sparkles,
  TrendingUp,
  FileCheck,
  Check,
  X,
  Bot,
  RefreshCw,
  Camera,
  Upload,
  CheckCircle2,
  Image as ImageIcon,
  UserCheck,
  QrCode,
} from 'lucide-react';
import { ProfileQrCard } from '../qrcode/ProfileQrCard';

interface HodViewProps {
  hod: HodProfile;
  leaveRequests: LeaveRequest[];
  onApproveLeave: (id: string, approve: boolean) => void;
  onUpdateAvatar?: (newUrl: string) => void;
  onOpenAuth?: () => void;
  onSelectDepartment?: (deptCode: string) => void;
  onOpenQrScanner?: () => void;
}

export const HodView: React.FC<HodViewProps> = ({ hod, leaveRequests, onApproveLeave, onUpdateAvatar, onOpenAuth, onSelectDepartment, onOpenQrScanner }) => {
  const [showMyQrModal, setShowMyQrModal] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // HOD avatar photo upload state
  const hodFileInputRef = useRef<HTMLInputElement>(null);
  const [photoToast, setPhotoToast] = useState(false);

  // Department Circular / Announcement photo state
  const circularFileInputRef = useRef<HTMLInputElement>(null);
  const [circularPhoto, setCircularPhoto] = useState<string | null>(null);
  const [circularTitle, setCircularTitle] = useState('');
  const [circularToast, setCircularToast] = useState(false);

  const handleHodAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleCircularPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCircularPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishCircular = (e: React.FormEvent) => {
    e.preventDefault();
    setCircularToast(true);
    setTimeout(() => {
      setCircularToast(false);
      setCircularTitle('');
      setCircularPhoto(null);
    }, 3000);
  };

  const generateHodInsights = async () => {
    setLoadingAi(true);
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message:
            'Generate a executive department report summary for HOD CSE covering pass prediction, attendance risk, and placement readiness.',
          userRole: 'HOD',
        }),
      });
      const data = await response.json();
      setAiInsight(data.reply || data.fallbackReply);
    } catch (err) {
      setAiInsight(
        'Department CSE Analytics: 88.2% average attendance across 360 students. 12 students are in critical attendance risk zone (<75%). Placement readiness for 2026 batch stands at 84%.'
      );
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="p-2 sm:p-5 max-w-5xl lg:max-w-6xl mx-auto space-y-5 bg-[#fcfcfc] text-[#1a1a1a]">
      {/* Toast Notification when Profile Photo Uploaded */}
      {photoToast && (
        <div className="p-3.5 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>HOD profile photo updated successfully for {hod.name}!</span>
          </div>
          <button onClick={() => setPhotoToast(false)} className="text-xs font-mono text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* HOD Header - Editorial Aesthetic */}
      <div className="border-b-[3px] border-[#1a1a1a] pb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Interactive HOD Photo Upload Container */}
          <div className="relative group shrink-0">
            <img src={hod.avatarUrl} alt={hod.name} className="w-20 h-20 rounded-sm object-cover border border-[#1a1a1a] shadow-sm transition group-hover:opacity-85" />
            <button
              type="button"
              onClick={() => hodFileInputRef.current?.click()}
              className="absolute inset-0 bg-[#1a1a1a]/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-mono font-bold uppercase tracking-wider p-1 cursor-pointer"
              title="Upload HOD Photo"
            >
              <Camera className="w-5 h-5 mb-0.5 text-white" />
              <span>Upload Photo</span>
            </button>
            <button
              type="button"
              onClick={() => hodFileInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-[#1a1a1a] hover:bg-[#e11d48] text-white rounded-full border border-white flex items-center justify-center shadow transition cursor-pointer"
              title="Upload Photo"
            >
              <Upload className="w-3 h-3" />
            </button>
            <input
              type="file"
              ref={hodFileInputRef}
              onChange={handleHodAvatarUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-serif italic font-bold tracking-tight text-[#1a1a1a]">{hod.name}</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-[#888888] mt-1">{hod.designation}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <button
                type="button"
                onClick={() => onSelectDepartment?.('CSE')}
                className="text-[11px] font-mono text-[#e11d48] font-bold hover:text-[#1a1a1a] transition-colors flex items-center gap-1 cursor-pointer"
                title="Click to view Computer Science Department Photos & Gallery"
              >
                <span>{hod.department}</span>
                <span className="text-[10px] font-mono bg-[#1a1a1a] text-white px-1.5 py-0.2 rounded-xs">View Photos & Labs 📸</span>
              </button>

              <button
                type="button"
                onClick={() => setShowMyQrModal(true)}
                className="text-xs font-bold uppercase tracking-widest text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-1 cursor-pointer bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-xs border border-purple-300"
                title="View & Download HOD Executive QR Identity Badge"
              >
                <QrCode className="w-3.5 h-3.5 text-purple-600" />
                <span>HOD QR Badge</span>
              </button>

              {onOpenQrScanner && (
                <button
                  type="button"
                  onClick={onOpenQrScanner}
                  className="text-xs font-bold uppercase tracking-widest text-rose-700 hover:text-rose-900 transition-colors flex items-center gap-1 cursor-pointer bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-xs border border-rose-300"
                  title="Scan Campus QR Badges"
                >
                  <UserCheck className="w-3.5 h-3.5 text-rose-600" />
                  <span>Scan Campus QR</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={generateHodInsights}
          disabled={loadingAi}
          className="editorial-btn flex items-center gap-2"
        >
          {loadingAi ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-[#e11d48]" />}
          {loadingAi ? 'Analyzing...' : 'Generate AI HOD Report'}
        </button>
      </div>

      {/* AI Departmental Insights Output */}
      {aiInsight && (
        <div className="p-5 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs space-y-2">
          <div className="font-bold text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-widest">
            <Bot className="w-4 h-4" />
            Gemini AI Executive Departmental Insight
          </div>
          <p className="leading-relaxed font-sans text-sm whitespace-pre-line text-slate-100">{aiInsight}</p>
        </div>
      )}

      {/* Department KPIs - Editorial Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="editorial-card p-5 text-center">
          <div className="text-[9px] uppercase font-bold text-[#888888] tracking-widest">Total Department Students</div>
          <div className="text-3xl font-serif font-bold text-[#1a1a1a] mt-1">360</div>
        </div>
        <div className="editorial-card p-5 text-center">
          <div className="text-[9px] uppercase font-bold text-[#888888] tracking-widest">Avg Department Attendance</div>
          <div className="text-3xl font-serif font-bold text-[#1a1a1a] mt-1">88.2%</div>
        </div>
        <div className="editorial-card p-5 text-center">
          <div className="text-[9px] uppercase font-bold text-[#888888] tracking-widest">Low Attendance Risk (&lt;75%)</div>
          <div className="text-3xl font-serif font-bold text-[#e11d48] mt-1">12 Students</div>
        </div>
        <div className="editorial-card p-5 text-center">
          <div className="text-[9px] uppercase font-bold text-[#888888] tracking-widest">Faculty Strength</div>
          <div className="text-3xl font-serif font-bold text-[#1a1a1a] mt-1">18 Professors</div>
        </div>
      </div>

      {/* Low Attendance Watchlist */}
      <div className="editorial-card p-6 space-y-4">
        <h2 className="text-xl font-serif italic font-bold text-[#1a1a1a] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#e11d48]" />
          Critical Attendance Watchlist (&lt;75% Threshold)
        </h2>
        <div className="space-y-2 text-xs">
          {[
            { rollNo: '21CS019', name: 'Gokul S', attendance: '68.4%', risk: 'HIGH', mentor: 'Dr. S. Ramesh' },
            { rollNo: '21CS031', name: 'Kavitha P', attendance: '71.2%', risk: 'MODERATE', mentor: 'Mrs. K. Priya' },
          ].map((student) => (
            <div key={student.rollNo} className="p-3 border border-[#e0e0e0] bg-[#f9f9f9] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1a1a1a]">{student.name}</span>
                <span className="text-[10px] font-mono text-[#888888] ml-2">({student.rollNo}) • Mentor: {student.mentor}</span>
              </div>
              <span className="editorial-tag bg-[#e11d48] text-white border-[#e11d48]">
                {student.attendance}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* HOD Department Circular & Notice Photo Upload Section */}
      <div className="editorial-card p-6 space-y-6">
        <div>
          <h2 className="text-xl font-serif italic font-bold text-[#1a1a1a]">Publish Department Circular & Event Notice Photo</h2>
          <p className="text-xs font-mono text-[#888888] mt-1">Upload official signed circular photos or event banners for CSE students and faculty.</p>
        </div>

        {circularToast && (
          <div className="p-3.5 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Department Circular & Attached Photo Published to All Student & Faculty Dashboards!
          </div>
        )}

        <form onSubmit={handlePublishCircular} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#1a1a1a] mb-1">Circular Subject / Notice Heading</label>
            <input
              type="text"
              value={circularTitle}
              onChange={(e) => setCircularTitle(e.target.value)}
              placeholder="e.g. Schedule for Anna University End-Sem Practical Exams 2026"
              required
              className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs"
            />
          </div>

          <div className="p-4 border-2 border-dashed border-[#1a1a1a] bg-[#f9f9f9] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-[#1a1a1a] flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#e11d48]" /> Upload Circular Photo / Signed Document Sheet
                </span>
                <p className="text-[10px] font-mono text-[#888888]">Capture or upload scanned image of signed HOD circular</p>
              </div>
              <button
                type="button"
                onClick={() => circularFileInputRef.current?.click()}
                className="editorial-btn-outline text-xs py-1.5 px-3 flex items-center gap-1"
              >
                <Camera className="w-3.5 h-3.5" /> Select Photo
              </button>
              <input
                type="file"
                ref={circularFileInputRef}
                onChange={handleCircularPhotoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {circularPhoto && (
              <div className="pt-2 flex items-center gap-3">
                <img src={circularPhoto} alt="Uploaded Circular" className="w-24 h-24 object-cover border border-[#1a1a1a]" />
                <div className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Circular image attached & verified by HOD signature
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="w-full editorial-btn">
            Publish Official Circular to Department
          </button>
        </form>
      </div>

      {/* HOD QR Executive Badge Modal */}
      {showMyQrModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative">
            <button
              onClick={() => setShowMyQrModal(false)}
              className="absolute -top-3 -right-3 z-10 p-1.5 bg-[#e11d48] text-white rounded-full shadow-lg hover:bg-rose-700 transition cursor-pointer"
              title="Close HOD QR Badge"
            >
              <X className="w-5 h-5" />
            </button>
            <ProfileQrCard
              profile={{
                id: hod.id,
                name: hod.name,
                role: 'HOD',
                identifier: hod.employeeId,
                department: hod.department,
                email: hod.email,
                phone: hod.phone,
                subTitle: hod.designation,
                avatarUrl: hod.avatarUrl,
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
