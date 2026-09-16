import React, { useState, useRef } from 'react';
import { UserRole } from '../../types';
import { DEPARTMENTS as initialDepartments } from '../../data/allStudentsData';
import nitheeswaranPhoto from '../../assets/images/k_nitheeswaran_1789578329475.jpg';
import {
  ShieldAlert,
  Users,
  Building2,
  Calendar,
  Database,
  FileText,
  Plus,
  Download,
  Upload,
  CheckCircle2,
  Camera,
  Image as ImageIcon,
  GraduationCap,
  Sparkles,
  BookOpen,
  FlaskConical,
  UserCheck,
  QrCode,
  X,
} from 'lucide-react';
import { ProfileQrCard } from '../qrcode/ProfileQrCard';

interface AdminViewProps {
  adminAvatar?: string;
  onUpdateAdminAvatar?: (url: string) => void;
  onOpenAuth?: () => void;
  onSelectDepartment?: (code: string) => void;
  onOpenQrScanner?: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  adminAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  onUpdateAdminAvatar,
  onOpenAuth,
  onSelectDepartment,
  onOpenQrScanner,
}) => {
  const [showMyQrModal, setShowMyQrModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'users' | 'departments' | 'notices' | 'backup'>('departments');
  const [backupSuccess, setBackupSuccess] = useState(false);

  // Departments State
  const [departmentsList, setDepartmentsList] = useState(initialDepartments);
  const [showAddDeptForm, setShowAddDeptForm] = useState(false);
  const [newDeptCode, setNewDeptCode] = useState('');
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptHod, setNewDeptHod] = useState('');
  const [newDeptLabs, setNewDeptLabs] = useState(4);
  const [newDeptFaculty, setNewDeptFaculty] = useState(12);
  const [deptToast, setDeptToast] = useState<string | null>(null);

  // User Directory State
  const [userDirectory, setUserDirectory] = useState([
    {
      id: '1',
      name: 'K Nitheeswaran',
      email: 'knitheeswaran.cse23@smartcollege.edu.in',
      role: 'STUDENT',
      dept: 'CSE',
      avatarUrl: nitheeswaranPhoto,
    },
    {
      id: '2',
      name: 'Dr. S. Ramesh',
      email: 's.ramesh@smartcollege.edu.in',
      role: 'FACULTY',
      dept: 'CSE',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: '3',
      name: 'Dr. M. Anitha',
      email: 'hod.cse@smartcollege.edu.in',
      role: 'HOD',
      dept: 'CSE',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    },
  ]);

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('STUDENT');
  const [newUserDept, setNewUserDept] = useState('CSE');

  // Admin Header Avatar photo upload state
  const adminFileInputRef = useRef<HTMLInputElement>(null);
  const [adminToast, setAdminToast] = useState(false);

  const [activeUploadUserId, setActiveUploadUserId] = useState<string | null>(null);
  const userPhotoInputRef = useRef<HTMLInputElement>(null);
  const [userPhotoToast, setUserPhotoToast] = useState<string | null>(null);

  // Notice photo upload state
  const noticeFileInputRef = useRef<HTMLInputElement>(null);
  const [noticePhoto, setNoticePhoto] = useState<string | null>(null);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeToast, setNoticeToast] = useState(false);

  const handleAdminAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdateAdminAvatar?.(reader.result);
          setAdminToast(true);
          setTimeout(() => setAdminToast(false), 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDepartmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptCode.trim() || !newDeptName.trim()) return;

    const formattedCode = newDeptCode.trim().toUpperCase();
    const newDept = {
      code: formattedCode,
      name: newDeptName.trim(),
      hodName: newDeptHod.trim() || 'Dr. Appointed HOD',
      totalLabs: Number(newDeptLabs) || 3,
      totalFaculty: Number(newDeptFaculty) || 10,
    };

    setDepartmentsList((prev) => [...prev, newDept]);
    setDeptToast(`Department ${formattedCode} - ${newDeptName} created successfully!`);
    setNewDeptCode('');
    setNewDeptName('');
    setNewDeptHod('');
    setShowAddDeptForm(false);
    setTimeout(() => setDeptToast(null), 4000);
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser = {
      id: String(Date.now()),
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      dept: newUserDept,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    };

    setUserDirectory((prev) => [newUser, ...prev]);
    setUserPhotoToast(`User ${newUserName} added successfully under ${newUserDept}!`);
    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserForm(false);
    setTimeout(() => setUserPhotoToast(null), 4000);
  };

  const triggerUserPhotoUpload = (userId: string) => {
    setActiveUploadUserId(userId);
    userPhotoInputRef.current?.click();
  };

  const handleUserPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadUserId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setUserDirectory((prev) =>
            prev.map((u) => (u.id === activeUploadUserId ? { ...u, avatarUrl: reader.result as string } : u))
          );
          const updatedUser = userDirectory.find((u) => u.id === activeUploadUserId);
          setUserPhotoToast(`Profile photo updated for ${updatedUser?.name || 'User'}!`);
          setTimeout(() => setUserPhotoToast(null), 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNoticePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNoticePhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    setNoticeToast(true);
    setTimeout(() => {
      setNoticeToast(false);
      setNoticeTitle('');
      setNoticeContent('');
      setNoticePhoto(null);
    }, 3000);
  };

  const handleBackup = () => {
    setBackupSuccess(true);
    setTimeout(() => setBackupSuccess(false), 3000);
  };

  return (
    <div className="p-2 sm:p-5 max-w-5xl lg:max-w-6xl mx-auto space-y-5 bg-[#fcfcfc] text-[#1a1a1a]">
      {/* Toast Notification for Admin Profile Photo Upload */}
      {adminToast && (
        <div className="p-3.5 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Administrator profile photo updated successfully!</span>
          </div>
          <button onClick={() => setAdminToast(false)} className="text-xs font-mono text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Hidden input for user directory photo changes */}
      <input
        type="file"
        ref={userPhotoInputRef}
        onChange={handleUserPhotoSelected}
        accept="image/*"
        className="hidden"
      />

      {/* Admin Header - Editorial Aesthetic */}
      <div className="border-b-[3px] border-[#1a1a1a] pb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Admin Avatar with Photo Upload */}
          <div className="relative group shrink-0">
            <img src={adminAvatar} alt="Admin" className="w-20 h-20 rounded-sm object-cover border border-[#1a1a1a] shadow-sm transition group-hover:opacity-85" />
            <button
              type="button"
              onClick={() => adminFileInputRef.current?.click()}
              className="absolute inset-0 bg-[#1a1a1a]/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-mono font-bold uppercase tracking-wider p-1 cursor-pointer"
              title="Upload Admin Photo"
            >
              <Camera className="w-5 h-5 mb-0.5 text-white" />
              <span>Upload Photo</span>
            </button>
            <button
              type="button"
              onClick={() => adminFileInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-[#1a1a1a] hover:bg-[#e11d48] text-white rounded-full border border-white flex items-center justify-center shadow transition cursor-pointer"
              title="Upload Photo"
            >
              <Upload className="w-3 h-3" />
            </button>
            <input
              type="file"
              ref={adminFileInputRef}
              onChange={handleAdminAvatarUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#e11d48]" />
              <h1 className="text-3xl sm:text-4xl font-serif italic font-bold tracking-tight text-[#1a1a1a]">Central Admin Controller</h1>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#888888] mt-1">Smart College Management System Administration & Database Controls</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <button
                type="button"
                onClick={() => setShowMyQrModal(true)}
                className="text-xs font-bold uppercase tracking-widest text-rose-700 hover:text-rose-900 transition-colors flex items-center gap-1 cursor-pointer bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-xs border border-rose-300 shadow-xs"
                title="View & Download Admin Master QR Badge"
              >
                <QrCode className="w-3.5 h-3.5 text-rose-600" />
                <span>Admin Master QR Badge</span>
              </button>

              {onOpenQrScanner && (
                <button
                  type="button"
                  onClick={onOpenQrScanner}
                  className="text-xs font-bold uppercase tracking-widest text-slate-800 hover:text-black transition-colors flex items-center gap-1 cursor-pointer bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-xs border border-slate-300 shadow-xs"
                  title="Scan Campus QR Badges"
                >
                  <UserCheck className="w-3.5 h-3.5 text-slate-700" />
                  <span>Scan Campus QR Directory</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-[#e0e0e0] pb-2 overflow-x-auto">
        {[
          { id: 'departments', label: 'Academic Departments', icon: Building2 },
          { id: 'users', label: 'User Directory & Accounts', icon: Users },
          { id: 'notices', label: 'Notices & Banners', icon: FileText },
          { id: 'backup', label: 'Database Backup', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                isActive ? 'border-b-2 border-[#1a1a1a] text-[#1a1a1a]' : 'text-[#888888] hover:text-[#1a1a1a]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab: Academic Departments Management */}
      {activeTab === 'departments' && (
        <div className="editorial-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif italic font-bold text-[#1a1a1a]">Institutional Departments ({departmentsList.length})</h2>
              <p className="text-xs font-mono text-[#888888] mt-0.5">Manage degree programs, HOD assignments, lab infrastructures, and faculty strength.</p>
            </div>
            <button
              onClick={() => setShowAddDeptForm(!showAddDeptForm)}
              className="editorial-btn flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" /> {showAddDeptForm ? 'Close Form' : 'Add New Department'}
            </button>
          </div>

          {deptToast && (
            <div className="p-3.5 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {deptToast}
            </div>
          )}

          {/* Add Department Form Modal/Drawer */}
          {showAddDeptForm && (
            <form onSubmit={handleAddDepartmentSubmit} className="p-4 border-2 border-[#1a1a1a] bg-[#f9f9f9] space-y-4 animate-in fade-in">
              <div className="font-serif italic font-bold text-[#1a1a1a] text-base border-b border-[#e0e0e0] pb-2">
                Create & Provision New Academic Department
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Dept Code (e.g., CSBS)</label>
                  <input
                    type="text"
                    value={newDeptCode}
                    onChange={(e) => setNewDeptCode(e.target.value)}
                    placeholder="e.g. CYBER"
                    required
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Full Department Name</label>
                  <input
                    type="text"
                    value={newDeptName}
                    onChange={(e) => setNewDeptName(e.target.value)}
                    placeholder="e.g. Cyber Security Engineering"
                    required
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Head of Department (HOD Name)</label>
                  <input
                    type="text"
                    value={newDeptHod}
                    onChange={(e) => setNewDeptHod(e.target.value)}
                    placeholder="Dr. S. Kanthasamy"
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Total Specialized Labs</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newDeptLabs}
                    onChange={(e) => setNewDeptLabs(Number(e.target.value))}
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Total Faculty Count</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newDeptFaculty}
                    onChange={(e) => setNewDeptFaculty(Number(e.target.value))}
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDeptForm(false)}
                  className="editorial-btn-outline text-xs py-1.5 px-3"
                >
                  Cancel
                </button>
                <button type="submit" className="editorial-btn text-xs py-1.5 px-4 flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Save & Provision Department
                </button>
              </div>
            </form>
          )}

          {/* Departments Grid List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departmentsList.map((dept) => (
              <div key={dept.code} className="p-4 border border-[#1a1a1a] bg-white shadow-xs space-y-3 hover:border-[#e11d48] transition-colors">
                <div className="flex items-start justify-between gap-2 border-b border-[#e0e0e0] pb-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-[#1a1a1a] text-white text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                      {dept.code}
                    </span>
                    <h3 className="font-serif italic font-bold text-[#1a1a1a] text-sm leading-snug">{dept.name}</h3>
                  </div>
                  <Building2 className="w-5 h-5 text-[#888888] shrink-0" />
                </div>

                <div className="space-y-1.5 text-xs text-[#1a1a1a]">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#888888] font-mono">Head of Dept (HOD):</span>
                    <span className="font-bold">{dept.hodName || 'Dr. Appointed HOD'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#888888] font-mono flex items-center gap-1">
                      <FlaskConical className="w-3 h-3 text-[#e11d48]" /> Specialized Labs:
                    </span>
                    <span className="font-mono font-bold">{dept.totalLabs || 4} Labs</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#888888] font-mono flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-blue-600" /> Teaching Faculty:
                    </span>
                    <span className="font-mono font-bold">{dept.totalFaculty || 15} Members</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectDepartment?.(dept.code)}
                  className="w-full py-1.5 px-2 bg-[#f3f3f3] hover:bg-[#1a1a1a] text-[#1a1a1a] hover:text-white font-bold text-[10px] uppercase font-mono tracking-wider transition-all border border-[#1a1a1a] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View {dept.code} Photos & Lab Gallery →</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 1: Users Directory & Photo Upload */}
      {activeTab === 'users' && (
        <div className="editorial-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif italic font-bold text-[#1a1a1a]">Registered System Accounts & User Photo Management</h2>
            <button
              onClick={() => setShowAddUserForm(!showAddUserForm)}
              className="editorial-btn flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> {showAddUserForm ? 'Close Form' : 'Add User Account'}
            </button>
          </div>

          {showAddUserForm && (
            <form onSubmit={handleAddUserSubmit} className="p-4 border-2 border-[#1a1a1a] bg-[#f9f9f9] space-y-3 animate-in fade-in">
              <div className="font-serif italic font-bold text-[#1a1a1a] text-sm border-b border-[#e0e0e0] pb-1">
                Add New User Account
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g. K. Swetha"
                    required
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="e.g. swetha.cse23@smartcollege.edu.in"
                    required
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">User Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs font-bold uppercase"
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="FACULTY">FACULTY</option>
                    <option value="HOD">HOD</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#1a1a1a] mb-1">Department</label>
                  <select
                    value={newUserDept}
                    onChange={(e) => setNewUserDept(e.target.value)}
                    className="w-full p-2 border border-[#1a1a1a] bg-white text-xs font-mono font-bold"
                  >
                    {departmentsList.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.code} - {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserForm(false)}
                  className="editorial-btn-outline text-xs py-1.5 px-3"
                >
                  Cancel
                </button>
                <button type="submit" className="editorial-btn text-xs py-1.5 px-4 flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Save User Account
                </button>
              </div>
            </form>
          )}

          {userPhotoToast && (
            <div className="p-3 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {userPhotoToast}
            </div>
          )}

          <div className="space-y-3 text-xs">
            {userDirectory.map((u) => (
              <div key={u.id} className="p-3.5 border border-[#e0e0e0] bg-[#f9f9f9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative group shrink-0">
                    <img src={u.avatarUrl} alt={u.name} className="w-12 h-12 rounded-sm object-cover border border-[#1a1a1a]" />
                    <button
                      type="button"
                      onClick={() => triggerUserPhotoUpload(u.id)}
                      className="absolute inset-0 bg-[#1a1a1a]/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-[8px] font-mono uppercase tracking-wider cursor-pointer"
                      title="Upload Photo for User"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div>
                    <div className="font-bold text-[#1a1a1a] text-sm">{u.name}</div>
                    <div className="text-[10px] font-mono text-[#888888]">{u.email} • {u.dept}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="editorial-tag bg-white font-mono">{u.role}</span>
                  <button
                    type="button"
                    onClick={() => triggerUserPhotoUpload(u.id)}
                    className="editorial-btn-outline text-[10px] py-1 px-2.5 flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" /> Upload Photo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Notice & Announcements with Photo Upload */}
      {activeTab === 'notices' && (
        <div className="editorial-card p-6 space-y-6">
          <div>
            <h2 className="text-xl font-serif italic font-bold text-[#1a1a1a]">Publish Campus-Wide Notice & Upload Banner Photo</h2>
            <p className="text-xs font-mono text-[#888888] mt-1">Broadcast official announcements with photo banners to all student & faculty portals.</p>
          </div>

          {noticeToast && (
            <div className="p-3.5 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Notice and attached photo banner broadcasted across all college portals!
            </div>
          )}

          <form onSubmit={handlePublishNotice} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1a1a1a] mb-1">Notice Heading / Subject</label>
              <input
                type="text"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                placeholder="e.g. Annual Sports Meet & Cultural Day Fest 2026 Registration Open"
                required
                className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1a1a1a] mb-1">Notice Description</label>
              <textarea
                rows={3}
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                placeholder="Detailed announcement information..."
                required
                className="w-full p-2.5 border border-[#1a1a1a] bg-white text-xs"
              />
            </div>

            {/* Notice Photo Upload */}
            <div className="p-4 border-2 border-dashed border-[#1a1a1a] bg-[#f9f9f9] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-[#1a1a1a] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#e11d48]" /> Upload Notice Banner Photo / Poster
                  </span>
                  <p className="text-[10px] font-mono text-[#888888]">JPEG / PNG event banner or official poster image</p>
                </div>
                <button
                  type="button"
                  onClick={() => noticeFileInputRef.current?.click()}
                  className="editorial-btn-outline text-xs py-1.5 px-3 flex items-center gap-1"
                >
                  <Camera className="w-3.5 h-3.5" /> Attach Photo
                </button>
                <input
                  type="file"
                  ref={noticeFileInputRef}
                  onChange={handleNoticePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {noticePhoto && (
                <div className="pt-2 flex items-center gap-3">
                  <img src={noticePhoto} alt="Uploaded Notice Banner" className="w-28 h-20 object-cover border border-[#1a1a1a]" />
                  <div className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Banner photo attached
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="w-full editorial-btn">
              Publish Campus-Wide Announcement
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Backup & Restore */}
      {activeTab === 'backup' && (
        <div className="editorial-card p-6 space-y-4">
          <h2 className="text-xl font-serif italic font-bold text-[#1a1a1a]">MySQL Database Disaster Recovery & Backup</h2>
          <p className="text-xs text-[#888888] font-mono">Generate full SQL dump for tables, procedures, triggers, and student records.</p>

          {backupSuccess && (
            <div className="p-3 border border-[#1a1a1a] bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Database snapshot generated successfully (smart_college_backup_2026.sql)!
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleBackup}
              className="editorial-btn flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Create Full SQL Dump
            </button>
          </div>
        </div>
      )}

      {/* Admin QR Master Badge Modal */}
      {showMyQrModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative">
            <button
              onClick={() => setShowMyQrModal(false)}
              className="absolute -top-3 -right-3 z-10 p-1.5 bg-[#e11d48] text-white rounded-full shadow-lg hover:bg-rose-700 transition cursor-pointer"
              title="Close Admin Master QR Badge"
            >
              <X className="w-5 h-5" />
            </button>
            <ProfileQrCard
              profile={{
                id: 'ADM-001',
                name: 'Central Admin Controller',
                role: 'ADMIN',
                identifier: 'EMP-ADM-001',
                department: 'Central Administration',
                email: 'admin.controller@smartcollege.edu.in',
                phone: '+91 98421 99999',
                subTitle: 'Controller of Examinations & Systems Administrator',
                avatarUrl: adminAvatar,
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
