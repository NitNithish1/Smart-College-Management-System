import React, { useState, useRef } from 'react';
import { UserRole } from '../../types';
import nitheeswaranPhoto from '../../assets/images/k_nitheeswaran_1789578329475.jpg';
import {
  DEPARTMENTS,
  ACADEMIC_YEARS,
  SECTIONS,
} from '../../data/allStudentsData';
import {
  Lock,
  Mail,
  User,
  GraduationCap,
  Building2,
  ShieldAlert,
  Camera,
  Upload,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  UserPlus,
  LogIn,
  KeyRound,
  IdCard,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: {
    role: UserRole;
    name: string;
    email: string;
    rollNo?: string;
    avatarUrl?: string;
  }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Login Form State
  const [loginRole, setLoginRole] = useState<UserRole>('STUDENT');
  const [loginIdentifier, setLoginIdentifier] = useState('knitheeswaran.cse23@smartcollege.edu.in');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('STUDENT');
  const [regRollNo, setRegRollNo] = useState('');
  const [regRegisterNo, setRegRegisterNo] = useState('');
  const [regDept, setRegDept] = useState('CSE');
  const [regYear, setRegYear] = useState('III Year');
  const [regSection, setRegSection] = useState('Sec A');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPhoto, setRegPhoto] = useState<string | null>(null);
  const [regTerms, setRegTerms] = useState(true);
  const [regToast, setRegToast] = useState(false);

  const regFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Photo Upload in Registration
  const handleRegPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setRegPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick Demo Login Handler
  const handleQuickDemoLogin = (role: UserRole) => {
    if (role === 'STUDENT') {
      onLoginSuccess({
        role: 'STUDENT',
        name: 'K NITHEESWARAN',
        email: 'knitheeswaran.cse23@smartcollege.edu.in',
        rollNo: '21CS042',
        avatarUrl: nitheeswaranPhoto,
      });
    } else if (role === 'FACULTY') {
      onLoginSuccess({
        role: 'FACULTY',
        name: 'Dr. S. Ramesh',
        email: 's.ramesh@smartcollege.edu.in',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      });
    } else if (role === 'HOD') {
      onLoginSuccess({
        role: 'HOD',
        name: 'Dr. M. Anitha',
        email: 'hod.cse@smartcollege.edu.in',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      });
    } else {
      onLoginSuccess({
        role: 'ADMIN',
        name: 'Central Admin Controller',
        email: 'admin.coe@smartcollege.edu.in',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      });
    }
    onClose();
  };

  // Handle Login Submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setLoginError('Please enter valid Email ID or Register Number');
      return;
    }

    let defaultName = 'College Portal User';
    if (loginRole === 'STUDENT') defaultName = 'GN Nithish';
    if (loginRole === 'FACULTY') defaultName = 'Dr. S. Ramesh';
    if (loginRole === 'HOD') defaultName = 'Dr. M. Anitha';
    if (loginRole === 'ADMIN') defaultName = 'System Administrator';

    onLoginSuccess({
      role: loginRole,
      name: defaultName,
      email: loginIdentifier,
      rollNo: loginRole === 'STUDENT' ? '21CS042' : undefined,
    });
    onClose();
  };

  // Handle Registration Submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;

    if (regPassword && regPassword !== regConfirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }

    setRegToast(true);
    setTimeout(() => {
      setRegToast(false);
      onLoginSuccess({
        role: regRole,
        name: regName,
        email: regEmail,
        rollNo: regRollNo || '21CS101',
        avatarUrl: regPhoto || undefined,
      });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="editorial-card bg-white max-w-xl w-full my-8 border-2 border-[#1a1a1a] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header Ribbon */}
        <div className="bg-[#1a1a1a] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#e11d48] flex items-center justify-center text-white shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif italic font-bold tracking-tight text-white flex items-center gap-1.5">
                Smart College <span className="text-[#e11d48] font-sans not-italic text-xs font-extrabold uppercase">Management System</span>
              </h2>
              <p className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                Official Campus Authentication Service
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-slate-400 hover:text-white transition p-1"
            title="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Register */}
        <div className="flex border-b border-[#1a1a1a] bg-[#f3f3f3]">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition ${
              activeTab === 'login'
                ? 'bg-white text-[#1a1a1a] border-b-2 border-[#e11d48]'
                : 'text-[#888888] hover:text-[#1a1a1a]'
            }`}
          >
            <LogIn className="w-4 h-4 text-[#e11d48]" />
            Account Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition ${
              activeTab === 'register'
                ? 'bg-white text-[#1a1a1a] border-b-2 border-[#e11d48]'
                : 'text-[#888888] hover:text-[#1a1a1a]'
            }`}
          >
            <UserPlus className="w-4 h-4 text-[#e11d48]" />
            New User Registration
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* TAB 1: LOGIN FORM */}
          {activeTab === 'login' && (
            <div className="space-y-5">
              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono font-bold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  {loginError}
                </div>
              )}

              {/* 1-Click Fast Demo Logins */}
              <div className="p-3.5 bg-[#f9f9f9] border border-[#1a1a1a] space-y-2">
                <div className="text-[10px] font-bold uppercase text-[#1a1a1a] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#e11d48]" /> Quick 1-Click Demo Login Shortcuts:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('STUDENT')}
                    className="p-2 border border-[#1a1a1a] bg-white hover:bg-[#1a1a1a] hover:text-white text-left transition rounded-xs"
                  >
                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#e11d48]">Student</div>
                    <div className="text-xs font-serif font-bold">GN Nithish</div>
                    <div className="text-[9px] font-mono opacity-80">21CS042</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('FACULTY')}
                    className="p-2 border border-[#1a1a1a] bg-white hover:bg-emerald-800 hover:text-white text-left transition rounded-xs"
                  >
                    <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">Faculty</div>
                    <div className="text-xs font-serif font-bold">Dr. S. Ramesh</div>
                    <div className="text-[9px] font-mono opacity-80">CSE Dept</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('HOD')}
                    className="p-2 border border-[#1a1a1a] bg-white hover:bg-amber-800 hover:text-white text-left transition rounded-xs"
                  >
                    <div className="text-[9px] font-bold uppercase tracking-wider text-amber-700">HOD</div>
                    <div className="text-xs font-serif font-bold">Dr. M. Anitha</div>
                    <div className="text-[9px] font-mono opacity-80">HOD - CSE</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('ADMIN')}
                    className="p-2 border border-[#1a1a1a] bg-white hover:bg-rose-800 hover:text-white text-left transition rounded-xs"
                  >
                    <div className="text-[9px] font-bold uppercase tracking-wider text-rose-700">Admin</div>
                    <div className="text-xs font-serif font-bold">COE Admin</div>
                    <div className="text-[9px] font-mono opacity-80">Central Control</div>
                  </button>
                </div>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#e0e0e0]"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono">
                  <span className="bg-white px-2 text-[#888888]">Or Enter Institutional Credentials</span>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Role Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#1a1a1a] mb-1.5">
                    Target Portal Role
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#f3f3f3] border border-[#1a1a1a]">
                    {(['STUDENT', 'FACULTY', 'HOD', 'ADMIN'] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setLoginRole(r)}
                        className={`py-1.5 text-[10px] font-bold uppercase tracking-widest transition ${
                          loginRole === r
                            ? 'bg-[#1a1a1a] text-white'
                            : 'text-[#888888] hover:text-[#1a1a1a]'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Identifier Input */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#1a1a1a] mb-1">
                    Email ID / Register Number / Roll Number
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. gnnithish.cse23@smartcollege.edu.in or 21CS042"
                      className="w-full pl-9 pr-3 py-2.5 border border-[#1a1a1a] bg-white text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#1a1a1a] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 border border-[#1a1a1a] bg-white text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#1a1a1a]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-[#1a1a1a]"
                    />
                    <span>Remember my session</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to your institutional email ID.')}
                    className="text-[#e11d48] font-bold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" className="w-full editorial-btn py-3 text-xs flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" /> Sign In to {loginRole} Portal
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: REGISTER FORM */}
          {activeTab === 'register' && (
            <div className="space-y-4">
              {regToast && (
                <div className="p-3 bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Account created successfully! Logging you in...
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                {/* Account Role Selection */}
                <div>
                  <label className="block font-bold uppercase text-[#1a1a1a] mb-1">
                    Register Account Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { r: 'STUDENT' as UserRole, label: 'Student' },
                      { r: 'FACULTY' as UserRole, label: 'Faculty' },
                      { r: 'HOD' as UserRole, label: 'HOD' },
                    ].map((item) => (
                      <button
                        key={item.r}
                        type="button"
                        onClick={() => setRegRole(item.r)}
                        className={`py-2 text-xs font-bold uppercase tracking-wider border transition ${
                          regRole === item.r
                            ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                            : 'bg-white text-[#888888] border-[#e0e0e0]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. GN Nithish"
                      className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-[#1a1a1a] mb-1">
                      Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@smartcollege.edu.in"
                      className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Roll No / Register No */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-[#1a1a1a] mb-1">
                      {regRole === 'STUDENT' ? 'Roll Number *' : 'Employee ID *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={regRollNo}
                      onChange={(e) => setRegRollNo(e.target.value)}
                      placeholder={regRole === 'STUDENT' ? 'e.g. 21CS042' : 'e.g. EMP-CSE-012'}
                      className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-[#1a1a1a] mb-1">
                      {regRole === 'STUDENT' ? 'Anna Univ Register No' : 'Designation'}
                    </label>
                    <input
                      type="text"
                      value={regRegisterNo}
                      onChange={(e) => setRegRegisterNo(e.target.value)}
                      placeholder={regRole === 'STUDENT' ? 'e.g. 922521104042' : 'Associate Professor'}
                      className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Department & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Department</label>
                    <select
                      value={regDept}
                      onChange={(e) => setRegDept(e.target.value)}
                      className="w-full p-2.5 border border-[#1a1a1a] bg-white font-mono text-xs font-bold"
                    >
                      {DEPARTMENTS.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.code} - {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {regRole === 'STUDENT' && (
                    <>
                      <div>
                        <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Academic Year</label>
                        <select
                          value={regYear}
                          onChange={(e) => setRegYear(e.target.value)}
                          className="w-full p-2.5 border border-[#1a1a1a] bg-white font-mono text-xs font-bold"
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
                          value={regSection}
                          onChange={(e) => setRegSection(e.target.value)}
                          className="w-full p-2.5 border border-[#1a1a1a] bg-white font-mono text-xs font-bold"
                        >
                          {SECTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>

                {/* Password & Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Password *</label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-[#1a1a1a] mb-1">Confirm Password *</label>
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Photo Upload Attachment */}
                <div className="p-3 border border-dashed border-[#1a1a1a] bg-[#f9f9f9]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold uppercase text-[#1a1a1a] flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5 text-[#e11d48]" /> Upload ID Photo / Avatar
                      </span>
                      <p className="text-[10px] font-mono text-[#888888]">Passport size photo for College ID & Hall Ticket</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => regFileInputRef.current?.click()}
                      className="editorial-btn-outline text-[10px] py-1 px-2.5 flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" /> Choose Photo
                    </button>
                    <input
                      type="file"
                      ref={regFileInputRef}
                      onChange={handleRegPhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {regPhoto && (
                    <div className="mt-2 flex items-center gap-2 pt-1 border-t border-[#e0e0e0]">
                      <img src={regPhoto} alt="Profile preview" className="w-10 h-10 rounded-sm object-cover border border-[#1a1a1a]" />
                      <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Photo attached
                      </span>
                    </div>
                  )}
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-2 cursor-pointer font-mono text-[11px] pt-1">
                  <input
                    type="checkbox"
                    required
                    checked={regTerms}
                    onChange={(e) => setRegTerms(e.target.checked)}
                    className="accent-[#1a1a1a] mt-0.5"
                  />
                  <span>
                    I agree to the <strong>College Code of Academic Conduct</strong> and confirm my institutional status.
                  </span>
                </label>

                <button type="submit" className="w-full editorial-btn py-3 text-xs flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" /> Create Institutional Account
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
