import React, { useState } from 'react';
import { UserRole } from '../types';
import {
  GraduationCap,
  Smartphone,
  Maximize2,
  Code2,
  Bell,
  Sun,
  Moon,
  UserCheck,
  Search,
  QrCode,
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  isDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  onOpenDeliverables: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeStudentName: string;
  showModeling: boolean;
  onToggleModeling: () => void;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  onOpenQrScanner?: () => void;
  currentUserEmail?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  isDeviceFrame,
  onToggleDeviceFrame,
  onOpenDeliverables,
  darkMode,
  onToggleDarkMode,
  activeStudentName,
  showModeling,
  onToggleModeling,
  onOpenAuth,
  onOpenSearch,
  onOpenQrScanner,
  currentUserEmail,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const roles: { role: UserRole; label: string; desc: string; iconColor: string }[] = [
    { role: 'STUDENT', label: 'Student Portal', desc: `${activeStudentName} (21CS042)`, iconColor: 'bg-black' },
    { role: 'FACULTY', label: 'Faculty Portal', desc: 'Dr. S. Ramesh (Associate Prof)', iconColor: 'bg-emerald-700' },
    { role: 'HOD', label: 'HOD Portal', desc: 'Dr. M. Anitha (HOD - CSE)', iconColor: 'bg-amber-700' },
    { role: 'ADMIN', label: 'Admin Controller', desc: 'Central Admin & COE', iconColor: 'bg-rose-700' },
  ];

  const notifications = [
    { id: '1', title: 'Internal 2 Marks Released', time: '10m ago', unread: true },
    { id: '2', title: 'Zoho Campus Drive Registration Open', time: '1h ago', unread: true },
    { id: '3', title: 'OD Request #LR-104 Approved', time: '1d ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#cbd5e1] text-[#0f172a] transition-all shadow-sm">
      {/* Top Accent Gradient Ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0f172a] via-[#e11d48] to-[#1e1e38]" />
      
      <div className="max-w-5xl lg:max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* College Brand & Left-side Portal Navigation */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-[#0f172a] to-[#1e1e38] flex items-center justify-center text-white shrink-0 shadow-md border border-white/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-serif italic font-bold tracking-tight text-[#0f172a] whitespace-nowrap flex items-baseline gap-1.5">
                  <span className="text-sm sm:text-base font-black tracking-tight text-[#0f172a]">Smart College</span>
                  <span className="font-sans not-italic text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] text-[#e11d48] bg-rose-50 px-1.5 py-0.5 rounded-xs border border-rose-200">Management System</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Left-Aligned Student Portal & Role Switcher Navigation Tabs */}
          <div className="flex items-center gap-1 bg-[#f1f5f9] p-1 border border-[#e2e8f0] rounded-xs shadow-inner">
            {roles.map((r) => {
              const isActive = currentRole === r.role;
              return (
                <button
                  key={r.role}
                  onClick={() => onRoleChange(r.role)}
                  className={`px-2.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all rounded-xs flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#0f172a] text-white shadow-md'
                      : 'text-[#475569] hover:text-[#0f172a] hover:bg-white'
                  }`}
                  title={`Switch to ${r.label}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#e11d48] shadow-[0_0_8px_#e11d48]' : 'bg-slate-400'}`} />
                  <span>{r.role === 'STUDENT' ? 'Student Portal' : r.role === 'FACULTY' ? 'Faculty' : r.role === 'HOD' ? 'HOD' : 'Admin'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Universal QR Scanner Button */}
          {onOpenQrScanner && (
            <button
              onClick={onOpenQrScanner}
              id="global-qr-scanner-btn"
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#e11d48] bg-rose-50 hover:bg-[#e11d48] hover:text-white text-[#e11d48] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all rounded-xs cursor-pointer shadow-xs"
              title="Scan Campus QR Badges to Verify Students, Faculty, HOD & Admin"
            >
              <QrCode className="w-3.5 h-3.5 text-[#e11d48] group-hover:text-white" />
              <span className="hidden sm:inline">QR Scan & Badges</span>
              <span className="sm:hidden">QR</span>
            </button>
          )}

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            id="global-search-btn"
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-300 bg-slate-50 hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] text-[#0f172a] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all rounded-xs cursor-pointer shadow-xs"
            title="Search Students, Roll No, Departments, Subjects & Portal Shortcuts"
          >
            <Search className="w-3.5 h-3.5 text-[#e11d48]" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* Login / Register Portal Button */}
          <button
            onClick={onOpenAuth}
            id="header-auth-portal-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e11d48] text-white hover:bg-[#be123c] text-xs font-bold uppercase tracking-wider transition-all rounded-xs shadow-md border border-rose-500 cursor-pointer"
            title="Open Login and Registration Portal"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Login / Register</span>
          </button>

          {/* Deliverables & Code Studio Trigger */}
          <button
            onClick={onOpenDeliverables}
            id="deliverables-studio-btn"
            className="editorial-btn flex items-center gap-2 cursor-pointer"
            title="View Complete Flutter, Spring Boot, MySQL & Documentation Deliverables"
          >
            <Code2 className="w-4 h-4 text-rose-400" />
            <span className="hidden md:inline">Project Deliverables</span>
            <span className="md:hidden">Deliverables</span>
            <span className="px-1.5 py-0.2 bg-white text-[#0f172a] rounded-xs text-[9px] font-mono font-bold">10</span>
          </button>

          {/* Device View Mode Toggle */}
          <button
            onClick={onToggleDeviceFrame}
            id="device-frame-toggle-btn"
            className="editorial-btn-outline flex items-center gap-1.5 cursor-pointer"
            title={isDeviceFrame ? 'Switch to Full-Screen Desktop Mode' : 'Switch to Mobile Emulator View'}
          >
            {isDeviceFrame ? <Smartphone className="w-4 h-4 text-rose-600" /> : <Maximize2 className="w-4 h-4 text-slate-700" />}
            <span className="hidden sm:inline">{isDeviceFrame ? 'Mobile' : 'Full Screen'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            id="theme-toggle-btn"
            className="p-2 border border-slate-300 hover:border-[#0f172a] bg-white text-[#0f172a] transition-all rounded-xs cursor-pointer"
            title="Toggle Theme Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              id="notifications-btn"
              className="p-2 border border-slate-300 hover:border-[#0f172a] bg-white text-[#0f172a] transition-all rounded-xs relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#e11d48] rounded-full animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#e11d48] rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-[#0f172a] shadow-2xl p-3 text-xs z-50 rounded-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 font-bold text-[10px] uppercase tracking-widest text-[#0f172a]">
                  <span>System Announcements</span>
                  <span className="text-[9px] text-[#e11d48] font-mono font-bold bg-rose-50 px-1.5 py-0.5 rounded-xs">Real-time</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 border-l-2 border-[#0f172a] bg-slate-50 hover:bg-slate-100 transition rounded-r-xs">
                      <div className="font-bold text-[#0f172a] text-xs">{n.title}</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
