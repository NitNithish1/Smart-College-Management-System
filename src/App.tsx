import React, { useState } from 'react';
import { UserRole, LeaveRequest } from './types';
import {
  mockStudent,
  mockFaculty,
  mockHod,
  mockAdmin,
  mockTimetable,
  mockSubjectAttendance,
  mockInternalMarks,
  mockLeaveRequests,
  mockHallTicket,
  mockFeeStatus,
  mockStudyMaterials,
  mockAssignments,
  mockPlacementDrives,
  mockNotices,
} from './data/mockData';
import { Header } from './components/Header';
import { DeviceFrame } from './components/DeviceFrame';
import { StudentView } from './components/student/StudentView';
import { FacultyView } from './components/faculty/FacultyView';
import { HodView } from './components/hod/HodView';
import { AdminView } from './components/admin/AdminView';
import { DeliverablesExplorer } from './components/deliverables/DeliverablesExplorer';
import { AmazonAtoZModeling } from './components/modeling/AmazonAtoZModeling';
import { AuthModal } from './components/auth/AuthModal';
import { SearchModal } from './components/search/SearchModal';
import { DepartmentModal } from './components/department/DepartmentModal';
import { QrScannerModal } from './components/qrcode/QrScannerModal';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('STUDENT');
  const [isDeviceFrame, setIsDeviceFrame] = useState(false);
  const [showDeliverables, setShowDeliverables] = useState(false);
  const [showModeling, setShowModeling] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [selectedDepartmentCode, setSelectedDepartmentCode] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  // Dynamic state for Student, Faculty, HOD, Admin & Leave Requests
  const [student, setStudent] = useState(mockStudent);
  const [faculty, setFaculty] = useState(mockFaculty);
  const [hod, setHod] = useState(mockHod);
  const [adminAvatar, setAdminAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300');
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);

  const handleLoginSuccess = (user: {
    role: UserRole;
    name: string;
    email: string;
    rollNo?: string;
    avatarUrl?: string;
  }) => {
    setCurrentRole(user.role);
    setShowModeling(false);

    if (user.role === 'STUDENT') {
      setStudent((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        rollNo: user.rollNo || prev.rollNo,
        avatarUrl: user.avatarUrl || prev.avatarUrl,
      }));
    } else if (user.role === 'FACULTY') {
      setFaculty((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl || prev.avatarUrl,
      }));
    } else if (user.role === 'HOD') {
      setHod((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl || prev.avatarUrl,
      }));
    } else if (user.role === 'ADMIN' && user.avatarUrl) {
      setAdminAvatar(user.avatarUrl);
    }
  };

  const handleUpdateStudentAvatar = (newAvatarUrl: string) => {
    setStudent((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
  };

  const handleUpdateFacultyAvatar = (newAvatarUrl: string) => {
    setFaculty((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
  };

  const handleUpdateHodAvatar = (newAvatarUrl: string) => {
    setHod((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
  };

  const handleApplyLeave = (newLeave: Partial<LeaveRequest>) => {
    const created: LeaveRequest = {
      id: `LR-2026-${Math.floor(100 + Math.random() * 900)}`,
      studentId: student.id,
      studentName: student.name,
      rollNo: student.rollNo,
      type: newLeave.type || 'ON_DUTY',
      fromDate: newLeave.fromDate || '2026-08-05',
      toDate: newLeave.toDate || '2026-08-06',
      totalDays: newLeave.totalDays || 2,
      reason: newLeave.reason || 'Event participation',
      status: 'PENDING',
      appliedOn: new Date().toISOString().split('T')[0],
    };
    setLeaveRequests((prev) => [created, ...prev]);
  };

  const handleApproveLeave = (id: string, approve: boolean) => {
    setLeaveRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: approve ? 'APPROVED_BY_FACULTY' : 'REJECTED' } : r
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] font-sans">
      {/* Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          setShowModeling(false);
        }}
        isDeviceFrame={isDeviceFrame}
        onToggleDeviceFrame={() => setIsDeviceFrame(!isDeviceFrame)}
        onOpenDeliverables={() => setShowDeliverables(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        activeStudentName={student.name}
        showModeling={showModeling}
        onToggleModeling={() => setShowModeling(!showModeling)}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenQrScanner={() => setShowQrScanner(true)}
        currentUserEmail={student.email}
      />

      {/* Main View Container (Full Screen or Device Frame) */}
      <DeviceFrame isDeviceFrame={isDeviceFrame} onToggleDeviceFrame={() => setIsDeviceFrame(false)}>
        {showModeling ? (
          <AmazonAtoZModeling />
        ) : (
          <>
            {currentRole === 'STUDENT' && (
              <StudentView
                student={student}
                onUpdateAvatar={handleUpdateStudentAvatar}
                timetable={mockTimetable}
                attendance={mockSubjectAttendance}
                marks={mockInternalMarks}
                leaveRequests={leaveRequests}
                hallTicket={mockHallTicket}
                feeStatus={mockFeeStatus}
                studyMaterials={mockStudyMaterials}
                assignments={mockAssignments}
                placements={mockPlacementDrives}
                notices={mockNotices}
                onApplyLeave={handleApplyLeave}
                onSelectDepartment={(code) => setSelectedDepartmentCode(code)}
                onOpenQrScanner={() => setShowQrScanner(true)}
              />
            )}

            {currentRole === 'FACULTY' && (
              <FacultyView
                faculty={faculty}
                leaveRequests={leaveRequests}
                onApproveLeave={handleApproveLeave}
                onUpdateAvatar={handleUpdateFacultyAvatar}
                onSelectDepartment={(code) => setSelectedDepartmentCode(code)}
                onOpenQrScanner={() => setShowQrScanner(true)}
              />
            )}

            {currentRole === 'HOD' && (
              <HodView
                hod={hod}
                leaveRequests={leaveRequests}
                onApproveLeave={handleApproveLeave}
                onUpdateAvatar={handleUpdateHodAvatar}
                onSelectDepartment={(code) => setSelectedDepartmentCode(code)}
                onOpenQrScanner={() => setShowQrScanner(true)}
              />
            )}

            {currentRole === 'ADMIN' && (
              <AdminView
                adminAvatar={adminAvatar}
                onUpdateAdminAvatar={setAdminAvatar}
                onSelectDepartment={(code) => setSelectedDepartmentCode(code)}
                onOpenQrScanner={() => setShowQrScanner(true)}
              />
            )}
          </>
        )}
      </DeviceFrame>

      {/* Code & Project Deliverables Explorer Modal */}
      <DeliverablesExplorer isOpen={showDeliverables} onClose={() => setShowDeliverables(false)} />

      {/* Authentication (Login & Register) Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Portal Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectRole={(role) => setCurrentRole(role)}
        onToggleModeling={() => setShowModeling(true)}
        onOpenDeliverables={() => setShowDeliverables(true)}
        onSelectDepartment={(code) => setSelectedDepartmentCode(code)}
        onOpenQrScanner={() => setShowQrScanner(true)}
      />

      {/* Universal Campus QR Scanner & Directory Modal */}
      <QrScannerModal
        isOpen={showQrScanner}
        onClose={() => setShowQrScanner(false)}
        onSelectRole={(role) => setCurrentRole(role)}
      />

      {/* College Department Infrastructure & Photo Gallery Modal */}
      <DepartmentModal
        isOpen={!!selectedDepartmentCode}
        departmentCode={selectedDepartmentCode}
        onClose={() => setSelectedDepartmentCode(null)}
      />
    </div>
  );
}
