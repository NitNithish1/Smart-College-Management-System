import React, { useState, useEffect, useRef } from 'react';
import { UserRole } from '../../types';
import { initialDepartmentStudents, DEPARTMENTS } from '../../data/allStudentsData';
import { mockSubjectAttendance } from '../../data/mockData';
import {
  Search,
  X,
  GraduationCap,
  Building2,
  BookOpen,
  Sparkles,
  ArrowRight,
  QrCode,
  UserCheck,
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole?: (role: UserRole) => void;
  onToggleModeling?: () => void;
  onOpenDeliverables?: () => void;
  onSelectDepartment?: (deptCode: string) => void;
  onOpenQrScanner?: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
  onToggleModeling,
  onOpenDeliverables,
  onSelectDepartment,
  onOpenQrScanner,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'STUDENTS' | 'DEPARTMENTS' | 'SUBJECTS' | 'ACTIONS'>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Filtered Students
  const matchedStudents = q
    ? initialDepartmentStudents.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q) ||
          s.registerNo.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      ).slice(0, 6)
    : initialDepartmentStudents.slice(0, 4);

  // Filtered Departments
  const matchedDepts = q
    ? DEPARTMENTS.filter(
        (d) =>
          d.code.toLowerCase().includes(q) ||
          d.name.toLowerCase().includes(q) ||
          (d.hodName && d.hodName.toLowerCase().includes(q))
      )
    : DEPARTMENTS.slice(0, 6);

  // Filtered Subjects
  const matchedSubjects = q
    ? mockSubjectAttendance.filter(
        (sub) =>
          sub.subjectCode.toLowerCase().includes(q) ||
          sub.subjectName.toLowerCase().includes(q) ||
          sub.facultyName.toLowerCase().includes(q)
      )
    : mockSubjectAttendance;

  // Filtered Quick Portal Actions
  const portalActions = [
    {
      title: 'Student Portal View',
      desc: 'Check attendance, timetable, internal marks, and OD requests',
      role: 'STUDENT' as UserRole,
      action: () => {
        if (onSelectRole) onSelectRole('STUDENT');
        onClose();
      },
    },
    {
      title: 'Faculty Portal & Attendance Marking',
      desc: 'Mark hourly student attendance, approve OD, post marks',
      role: 'FACULTY' as UserRole,
      action: () => {
        if (onSelectRole) onSelectRole('FACULTY');
        onClose();
      },
    },
    {
      title: 'HOD Department Dashboard',
      desc: 'Department statistics, faculty logs, attendance trends',
      role: 'HOD' as UserRole,
      action: () => {
        if (onSelectRole) onSelectRole('HOD');
        onClose();
      },
    },
    {
      title: 'Admin Central Controller',
      desc: 'Institutional departments, user directory, backup & notice banners',
      role: 'ADMIN' as UserRole,
      action: () => {
        if (onSelectRole) onSelectRole('ADMIN');
        onClose();
      },
    },
    {
      title: 'Amazon A-to-Z Modeling Method',
      desc: 'Interactive comparison between Amazon workforce system & Smart College academic model',
      action: () => {
        if (onToggleModeling) onToggleModeling();
        onClose();
      },
    },
    {
      title: 'Project Code Deliverables & Architecture',
      desc: 'View complete Flutter mobile app, Spring Boot backend & MySQL database code',
      action: () => {
        if (onOpenDeliverables) onOpenDeliverables();
        onClose();
      },
    },
    {
      title: 'Scan QR ID Badges & Directory',
      desc: 'Scan or verify Student, Faculty, HOD, and Admin official QR badges to identify each other',
      action: () => {
        if (onOpenQrScanner) onOpenQrScanner();
        onClose();
      },
    },
  ];

  const matchedActions = q
    ? portalActions.filter(
        (act) => act.title.toLowerCase().includes(q) || act.desc.toLowerCase().includes(q)
      )
    : portalActions;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20 overflow-y-auto">
      <div className="editorial-card bg-white max-w-3xl w-full border-2 border-[#1a1a1a] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95">
        {/* Search Bar Input Container */}
        <div className="p-4 bg-[#1a1a1a] text-white flex items-center gap-3 border-b border-[#1a1a1a]">
          <Search className="w-5 h-5 text-[#e11d48] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, roll numbers, departments, subjects, faculty, or actions..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 font-mono uppercase"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition rounded-xs"
            title="Close Search Modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills Filter */}
        <div className="flex border-b border-[#e0e0e0] bg-[#f8f8f8] px-4 py-2 overflow-x-auto gap-2 text-xs font-mono font-bold">
          {(['ALL', 'STUDENTS', 'DEPARTMENTS', 'SUBJECTS', 'ACTIONS'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-xs uppercase tracking-wider transition ${
                activeCategory === cat
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-[#888888] hover:text-[#1a1a1a] hover:bg-[#e0e0e0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Quick Actions Category */}
          {(activeCategory === 'ALL' || activeCategory === 'ACTIONS') && matchedActions.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#888888] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#e11d48]" /> Quick Portal Shortcuts & Actions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedActions.map((act, idx) => (
                  <button
                    key={idx}
                    onClick={act.action}
                    className="p-3 border border-[#1a1a1a] bg-white hover:bg-[#1a1a1a] hover:text-white text-left transition group rounded-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold font-serif">{act.title}</div>
                      <div className="text-[10px] font-mono opacity-70 mt-0.5 line-clamp-1">{act.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#e11d48] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Departments Category */}
          {(activeCategory === 'ALL' || activeCategory === 'DEPARTMENTS') && matchedDepts.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#888888] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" /> Academic Departments ({matchedDepts.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedDepts.map((dept) => (
                  <button
                    key={dept.code}
                    type="button"
                    onClick={() => {
                      if (onSelectDepartment) onSelectDepartment(dept.code);
                      onClose();
                    }}
                    className="p-3 border border-[#e0e0e0] hover:border-[#1a1a1a] hover:shadow-md bg-white text-xs space-y-1 text-left transition group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs bg-[#1a1a1a] text-white px-1.5 py-0.5 group-hover:bg-[#e11d48] transition-colors">
                        {dept.code}
                      </span>
                      <span className="text-[10px] font-mono text-[#888888] font-bold group-hover:text-[#1a1a1a]">
                        View Department & Photos →
                      </span>
                    </div>
                    <div className="font-serif italic font-bold text-[#1a1a1a] text-sm group-hover:text-[#e11d48] transition-colors">
                      {dept.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#888888]">HOD: {dept.hodName || 'Dr. Appointed HOD'}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Students Search Results */}
          {(activeCategory === 'ALL' || activeCategory === 'STUDENTS') && matchedStudents.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#888888] flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" /> Student Directory ({matchedStudents.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedStudents.map((st) => (
                  <div
                    key={st.id}
                    className="p-3 border border-[#e0e0e0] hover:border-[#1a1a1a] bg-white flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#1a1a1a] text-white font-serif font-bold flex items-center justify-center shrink-0 text-xs">
                      {st.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-serif font-bold text-xs text-[#1a1a1a] truncate">{st.name}</div>
                      <div className="text-[10px] font-mono text-[#888888] flex items-center gap-1.5">
                        <span className="font-bold text-[#e11d48]">{st.rollNo}</span>
                        <span>•</span>
                        <span>{st.department}</span>
                        <span>•</span>
                        <span>{st.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subjects Search Results */}
          {(activeCategory === 'ALL' || activeCategory === 'SUBJECTS') && matchedSubjects.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#888888] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Courses & Subjects ({matchedSubjects.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedSubjects.map((sub) => (
                  <div key={sub.subjectCode} className="p-3 border border-[#e0e0e0] bg-white space-y-1 text-xs">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="font-bold text-[#1a1a1a] bg-slate-100 px-1.5 py-0.5 border border-slate-300">
                        {sub.subjectCode}
                      </span>
                      <span className="text-emerald-700 font-bold">{sub.percentage}% Attendance</span>
                    </div>
                    <div className="font-serif font-bold text-xs text-[#1a1a1a]">{sub.subjectName}</div>
                    <div className="text-[10px] font-mono text-[#888888]">Faculty: {sub.facultyName}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {matchedStudents.length === 0 &&
            matchedDepts.length === 0 &&
            matchedSubjects.length === 0 &&
            matchedActions.length === 0 && (
              <div className="py-12 text-center text-[#888888] space-y-2">
                <Search className="w-8 h-8 mx-auto text-slate-300" />
                <div className="font-serif italic text-base">No matching records found for "{query}"</div>
                <p className="text-xs font-mono">Try searching for "CSE", "Mobile", "21CS042", "Anitha", or "Faculty".</p>
              </div>
            )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#f3f3f3] border-t border-[#e0e0e0] flex items-center justify-between text-[10px] font-mono text-[#888888]">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded-xs font-bold text-[#1a1a1a]">ESC</kbd> to exit</span>
            <span>•</span>
            <span>Real-Time Indexing Active</span>
          </div>
          <div className="font-bold text-[#1a1a1a] uppercase">College Portal Search</div>
        </div>
      </div>
    </div>
  );
};
