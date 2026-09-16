import React, { useState, useEffect } from 'react';
import {
  Building2,
  X,
  Users,
  Award,
  BookOpen,
  Sparkles,
  ExternalLink,
  Maximize2,
  CheckCircle2,
  Cpu,
  Layers,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { getDepartmentDetails } from '../../data/departmentData';

interface DepartmentModalProps {
  isOpen: boolean;
  departmentCode: string | null;
  onClose: () => void;
}

export const DepartmentModal: React.FC<DepartmentModalProps> = ({
  isOpen,
  departmentCode,
  onClose,
}) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setSelectedImgIndex(0);
  }, [departmentCode]);

  if (!isOpen || !departmentCode) return null;

  const deptInfo = getDepartmentDetails(departmentCode);
  const images = deptInfo.images;
  const currentImg = images[selectedImgIndex] || images[0];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white text-[#1a1a1a] max-w-4xl w-full border-2 border-[#1a1a1a] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-4 bg-[#1a1a1a] text-white flex items-center justify-between border-b border-[#1a1a1a] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-mono font-bold text-xs bg-[#e11d48] text-white px-2 py-0.5 rounded-xs">
              {deptInfo.code}
            </span>
            <div>
              <h2 className="font-serif italic font-bold text-base sm:text-xl text-white">
                {deptInfo.fullName}
              </h2>
              <p className="text-[10px] font-mono text-slate-300">
                Smart Engineering College • Anna University Affiliated
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white transition rounded-xs hover:bg-[#333333]"
            title="Close Department Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Department Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f8f8f8] p-3 border border-[#e0e0e0]">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-[#888888]">Head of Dept</span>
              <div className="font-serif font-bold text-xs text-[#1a1a1a]">
                {deptInfo.hodName}
              </div>
              <div className="text-[9px] font-mono text-[#888888]">{deptInfo.hodQualification}</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-[#888888]">Total Faculty</span>
              <div className="font-serif font-bold text-xs text-[#1a1a1a]">
                {deptInfo.totalFaculty} Professors
              </div>
              <div className="text-[9px] font-mono text-[#888888]">{deptInfo.totalStudents} Students</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-[#888888]">Laboratories</span>
              <div className="font-serif font-bold text-xs text-[#1a1a1a]">
                {deptInfo.labCount} Specialized Labs
              </div>
              <div className="text-[9px] font-mono text-[#888888]">High-tech equipment</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-[#888888]">Placement Record</span>
              <div className="font-serif font-bold text-xs text-[#e11d48]">
                {deptInfo.placementRate} Placed
              </div>
              <div className="text-[9px] font-mono text-emerald-700 font-bold">Highest: {deptInfo.highestPackage}</div>
            </div>
          </div>

          {/* DEPARTMENT FEATURED PHOTO GALLERY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e11d48]" />
                <h3 className="font-serif italic font-bold text-lg text-[#1a1a1a]">
                  College {deptInfo.code} Department Infrastructure & Gallery
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#1a1a1a] text-white px-2 py-0.5">
                {selectedImgIndex + 1} of {images.length} Photos
              </span>
            </div>

            {/* Main Featured Image Display */}
            <div className="relative group rounded-xs border-2 border-[#1a1a1a] overflow-hidden bg-black shadow-md">
              <img
                src={currentImg.src}
                alt={currentImg.title}
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-96 object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              />
              {/* Image Overlay & Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-5 text-white flex flex-col justify-end">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#e11d48] bg-white/10 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                    {currentImg.category}
                  </span>
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="flex items-center gap-1 text-[11px] font-mono uppercase font-bold text-white bg-black/60 hover:bg-[#e11d48] px-2.5 py-1 border border-white/30 transition rounded-xs cursor-pointer"
                    title="View Fullscreen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </button>
                </div>
                <h4 className="font-serif italic font-bold text-lg sm:text-2xl mt-1 text-white">
                  {currentImg.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 mt-0.5 line-clamp-2">
                  {currentImg.desc}
                </p>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`relative text-left border-2 transition overflow-hidden rounded-xs group cursor-pointer ${
                    selectedImgIndex === idx
                      ? 'border-[#e11d48] ring-2 ring-[#e11d48]/20'
                      : 'border-[#e0e0e0] hover:border-[#1a1a1a] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-20 object-cover"
                  />
                  <div className="p-1.5 bg-[#1a1a1a] text-white">
                    <p className="text-[10px] font-bold font-serif line-clamp-1 truncate">{img.title}</p>
                  </div>
                  {selectedImgIndex === idx && (
                    <div className="absolute top-1 right-1 bg-[#e11d48] text-white p-0.5 rounded-full shadow">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Department Overview & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-[#e0e0e0] p-4 bg-[#fcfcfc] space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#1a1a1a] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#e11d48]" />
                <span>Department Academic Focus</span>
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                {deptInfo.academicFocus}
              </p>
              <div className="pt-2 border-t border-[#e0e0e0] flex flex-wrap gap-1.5">
                {deptInfo.skillsAndTech.map((skill, sIdx) => (
                  <span key={sIdx} className="text-[10px] font-mono bg-[#1a1a1a] text-white px-2 py-0.5 font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-[#e0e0e0] p-4 bg-[#fcfcfc] space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#1a1a1a] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Top Recruiting Partners</span>
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                Industry placement drives and high-salary campus hiring partners:
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs font-bold">
                {deptInfo.topRecruiters.map((rec, rIdx) => (
                  <div key={rIdx} className="p-2 bg-white border border-[#e0e0e0] flex items-center justify-between">
                    <span className="truncate pr-1">{rec.name}</span>
                    <span className="text-emerald-600 text-[10px] shrink-0">{rec.package}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#f3f3f3] border-t border-[#e0e0e0] flex items-center justify-between text-xs font-mono shrink-0">
          <span className="text-[#888888]">College Department Showcase • {deptInfo.code}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1a1a1a] hover:bg-[#e11d48] text-white font-bold uppercase transition rounded-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-60 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white text-white hover:text-black transition rounded-full cursor-pointer"
            title="Exit Fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={currentImg.src}
            alt={currentImg.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[80vh] object-contain border-2 border-white/20 shadow-2xl"
          />
          <div className="mt-4 text-center text-white max-w-xl">
            <h3 className="font-serif italic font-bold text-2xl">{currentImg.title}</h3>
            <p className="text-sm text-slate-300 mt-1">{currentImg.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};
