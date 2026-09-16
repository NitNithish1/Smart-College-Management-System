import React from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  isDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, isDeviceFrame, onToggleDeviceFrame }) => {
  if (!isDeviceFrame) {
    return <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] max-w-5xl lg:max-w-6xl mx-auto px-3 sm:px-5 py-2 sm:py-4">{children}</div>;
  }

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#f3f3f3] py-6 px-4 flex flex-col items-center justify-center transition-all">
      {/* Mobile Frame Outer Container */}
      <div className="relative w-full max-w-[420px] h-[850px] bg-white rounded-[32px] border-[8px] border-[#1a1a1a] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Notch & Camera Hole */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-[#1a1a1a] rounded-b-xl z-50 flex items-center justify-center gap-3 px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center" />
          <div className="w-10 h-1 rounded-full bg-white/30" />
        </div>

        {/* Status Bar */}
        <div className="bg-white text-[#1a1a1a] border-b border-[#e0e0e0] px-6 pt-2 pb-1.5 text-xs flex items-center justify-between z-40 select-none">
          <span className="font-bold text-[11px] tracking-tight">{timeString}</span>
          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            <span className="text-[10px] text-[#e11d48] font-bold">5G</span>
            <Signal className="w-3 h-3 text-[#1a1a1a]" />
            <Wifi className="w-3 h-3 text-[#1a1a1a]" />
            <Battery className="w-3.5 h-3.5 text-[#1a1a1a]" />
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#fcfcfc] text-[#1a1a1a] relative">
          {children}
        </div>

        {/* Home Bar */}
        <div className="bg-white py-2 flex items-center justify-center border-t border-[#e0e0e0] z-40">
          <div className="w-32 h-1 bg-[#1a1a1a] rounded-full" />
        </div>
      </div>

      <p className="text-xs text-[#888888] font-mono mt-3 flex items-center gap-2">
        <span>Editorial Mobile Frame</span>
        <button
          onClick={onToggleDeviceFrame}
          className="text-[#1a1a1a] font-bold underline uppercase tracking-widest hover:text-[#e11d48] transition"
        >
          Expand Full Screen
        </button>
      </p>
    </div>
  );
};
