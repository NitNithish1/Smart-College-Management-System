import React, { useState } from 'react';
import { deliverablesFiles } from '../../data/deliverablesCode';
import {
  Code2,
  Copy,
  Check,
  X,
  FileCode,
  Search,
  BookOpen,
  Database,
  Smartphone,
  Layers,
  Download,
} from 'lucide-react';

interface DeliverablesExplorerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliverablesExplorer: React.FC<DeliverablesExplorerProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(deliverablesFiles[0]);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFiles = deliverablesFiles.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#fcfcfc] border-[3px] border-[#1a1a1a] w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header - Editorial Style */}
        <div className="p-4 sm:p-6 bg-[#fcfcfc] border-b border-[#1a1a1a] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-[#1a1a1a] bg-[#1a1a1a] text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-serif italic font-bold text-[#1a1a1a] tracking-tight">Project Deliverables Studio</h2>
              <p className="text-xs font-mono text-[#888888]">
                All 10 required deliverables: Flutter Code, Spring Boot REST API, MySQL Schema, ER Diagram, and README
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-[#1a1a1a] hover:bg-[#1a1a1a] text-[#1a1a1a] hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* File Selector Sidebar */}
          <div className="w-full md:w-80 bg-[#f4f4f4] border-r border-[#1a1a1a] p-4 flex flex-col gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#888888] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search deliverables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-[#1a1a1a] bg-white text-xs font-mono text-[#1a1a1a] focus:outline-none"
              />
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin">
              {filteredFiles.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left p-2.5 text-xs font-mono transition flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-[#1a1a1a] text-white font-bold'
                        : 'hover:bg-white text-[#1a1a1a]'
                    }`}
                  >
                    <FileCode className={`w-4 h-4 ${isSelected ? 'text-rose-400' : 'text-[#888888]'}`} />
                    <span className="truncate">{file.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 bg-white flex flex-col overflow-hidden">
            {/* Top Toolbar */}
            <div className="p-3 bg-[#f4f4f4] border-b border-[#1a1a1a] flex items-center justify-between text-xs">
              <div className="font-mono text-[#1a1a1a] font-bold flex items-center gap-2">
                <span>{selectedFile.path}</span>
                <span className="editorial-tag bg-white">
                  {selectedFile.language}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="editorial-btn flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Code'}
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-[#1a1a1a] leading-relaxed bg-[#fcfcfc] scrollbar-thin">
              <pre>
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
