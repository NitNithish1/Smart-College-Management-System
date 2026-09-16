import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { ShieldCheck, Download, Share2, Sparkles, CheckCircle2, User, Building2, Mail, Phone, QrCode } from 'lucide-react';
import { UserRole } from '../../types';

export interface QrProfileData {
  id: string;
  name: string;
  role: UserRole;
  identifier: string; // Roll No for student, Employee ID for faculty/hod/admin
  department: string;
  email: string;
  phone?: string;
  subTitle?: string; // e.g. Batch "2021-2025" or Designation "Associate Professor"
  avatarUrl?: string;
  verifiedStatus?: string;
}

interface ProfileQrCardProps {
  profile: QrProfileData;
  size?: number;
  showDetails?: boolean;
  onOpenScanner?: () => void;
  compact?: boolean;
}

export const ProfileQrCard: React.FC<ProfileQrCardProps> = ({
  profile,
  size = 150,
  showDetails = true,
  onOpenScanner,
  compact = false,
}) => {
  const qrRef = useRef<HTMLDivElement>(null);

  // Construct official JSON payload for QR code scanning
  const qrPayload = JSON.stringify({
    institution: 'Smart College Management System',
    id: profile.id,
    role: profile.role,
    name: profile.name,
    identifier: profile.identifier,
    department: profile.department,
    email: profile.email,
    verified: true,
    issued: '2026-2027 Academic Year',
    verifyUrl: `https://college.edu.in/verify?id=${encodeURIComponent(profile.id)}&role=${profile.role}`,
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'STUDENT':
        return { label: 'Student ID', color: 'bg-emerald-600 text-white', border: 'border-emerald-500' };
      case 'FACULTY':
        return { label: 'Faculty ID', color: 'bg-blue-600 text-white', border: 'border-blue-500' };
      case 'HOD':
        return { label: 'HOD Executive ID', color: 'bg-purple-600 text-white', border: 'border-purple-500' };
      case 'ADMIN':
        return { label: 'Administrator Badge', color: 'bg-rose-600 text-white', border: 'border-rose-500' };
      default:
        return { label: 'Official ID', color: 'bg-[#0f172a] text-white', border: 'border-slate-700' };
    }
  };

  const badge = getRoleBadge(profile.role);

  const handleDownloadQr = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `COLLEGE_QR_${profile.identifier}_${profile.name.replace(/\s+/g, '_')}.png`;
      a.click();
    }
  };

  if (compact) {
    return (
      <div className="bg-white border border-[#0f172a]/20 p-3 rounded-xs shadow-sm flex items-center gap-3">
        <div ref={qrRef} className="bg-white p-1.5 border border-slate-200 rounded-xs shrink-0 shadow-xs">
          <QRCodeCanvas
            value={qrPayload}
            size={64}
            bgColor="#ffffff"
            fgColor="#0f172a"
            level="H"
            includeMargin={false}
          />
        </div>
        <div className="space-y-0.5 min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-xs uppercase ${badge.color}`}>
              {badge.label}
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-600 flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" /> Verified
            </span>
          </div>
          <div className="font-bold text-xs text-[#0f172a] truncate">{profile.name}</div>
          <div className="text-[10px] font-mono text-slate-500 truncate">
            {profile.identifier} • {profile.department}
          </div>
        </div>
        {onOpenScanner && (
          <button
            onClick={onOpenScanner}
            className="p-2 bg-[#0f172a] hover:bg-[#e11d48] text-white rounded-xs transition-colors shrink-0 cursor-pointer"
            title="Open Universal QR Scanner"
          >
            <QrCode className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-[#0f172a] rounded-sm overflow-hidden shadow-xl max-w-sm w-full">
      {/* Top ID Card Header */}
      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e1e38] to-[#0f172a] text-white p-3.5 border-b border-slate-700 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#e11d48] text-white flex items-center justify-center font-bold text-xs rounded-xs font-serif">
              COL
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-300">
                Engineering College
              </div>
              <div className="text-xs font-bold font-serif italic text-white">Digital Smart ID Card</div>
            </div>
          </div>
          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-xs uppercase ${badge.color}`}>
            {profile.role}
          </span>
        </div>
      </div>

      {/* Profile Body with QR Code */}
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-16 h-16 rounded-xs object-cover border-2 border-[#0f172a] shadow-md shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-xs bg-slate-100 border-2 border-[#0f172a] flex items-center justify-center text-slate-600 shrink-0">
              <User className="w-8 h-8" />
            </div>
          )}

          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="font-serif italic font-bold text-base text-[#0f172a] truncate leading-tight">
              {profile.name}
            </h3>
            <div className="text-xs font-mono font-bold text-[#e11d48]">
              {profile.identifier}
            </div>
            <div className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
              <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{profile.department}</span>
            </div>
            {profile.subTitle && (
              <div className="text-[10px] font-mono text-slate-500">{profile.subTitle}</div>
            )}
          </div>
        </div>

        {/* QR Code Graphic Container */}
        <div className="bg-slate-50 border-2 border-dashed border-slate-300 p-3 rounded-xs flex flex-col items-center justify-center text-center space-y-2 relative">
          <div className="absolute top-2 right-2 text-[9px] font-mono text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded-xs border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Official Verified
          </div>

          <div ref={qrRef} className="bg-white p-2.5 border border-slate-300 rounded-xs shadow-md mt-1">
            <QRCodeCanvas
              value={qrPayload}
              size={size}
              bgColor="#ffffff"
              fgColor="#0f172a"
              level="H"
              includeMargin={false}
              imageSettings={{
                src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=60',
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          </div>

          <div className="text-[10px] font-mono text-slate-500">
            Scan with any campus QR Scanner to view & verify identity details
          </div>
        </div>

        {/* Details List */}
        {showDetails && (
          <div className="text-xs space-y-1.5 pt-1 border-t border-slate-200">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-mono flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" /> Email
              </span>
              <span className="font-mono text-[#0f172a] truncate max-w-[180px] font-semibold">{profile.email}</span>
            </div>
            {profile.phone && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-mono flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" /> Phone
                </span>
                <span className="font-mono text-[#0f172a] font-semibold">{profile.phone}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-mono">College Token</span>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-xs border border-emerald-200">
                COLLEGE-SEC-2026-OK
              </span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
          <button
            onClick={handleDownloadQr}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#0f172a] hover:bg-[#1e293b] text-white text-[11px] font-mono uppercase font-bold rounded-xs transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-rose-400" />
            <span>Save QR</span>
          </button>

          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#e11d48] hover:bg-rose-700 text-white text-[11px] font-mono uppercase font-bold rounded-xs transition-colors cursor-pointer shadow-xs"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan QR</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
