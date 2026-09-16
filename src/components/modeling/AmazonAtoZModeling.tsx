import React, { useState } from 'react';
import {
  Layers,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Calendar,
  Sparkles,
  BarChart3,
  Shuffle,
  Zap,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export const AmazonAtoZModeling: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'shift_flex' | 'attendance_forecast' | 'capacity_demand' | 'duty_allocation'>('shift_flex');

  // Simulation State for Attendance Risk Curve
  const [simulatedAttendance, setSimulatedAttendance] = useState(78);
  const [simulatedPassingRate, setSimulatedPassingRate] = useState(86);
  const [simulatedArrears, setSimulatedArrears] = useState(14);

  // Shift/Slot Swap Modeling State
  const [slots, setSlots] = useState([
    { id: 'S1', period: 'Period 1 (09:00 AM)', subject: 'CS8591 Data Structures', faculty: 'Dr. S. Ramesh', status: 'CONFIRMED', swapRequested: false },
    { id: 'S2', period: 'Period 2 (09:50 AM)', subject: 'CS8592 DBMS Lab', faculty: 'Mrs. K. Priya', status: 'FLEX_OPEN', swapRequested: true },
    { id: 'S3', period: 'Period 3 (10:55 AM)', subject: 'CS8501 Operating Systems', faculty: 'Mr. P. Vignesh', status: 'CONFIRMED', swapRequested: false },
    { id: 'S4', period: 'Period 4 (11:45 AM)', subject: 'CS8511 AI & ML Lab', faculty: 'Dr. M. Anitha', status: 'SUBSTITUTE_ALLOCATED', swapRequested: false },
  ]);

  const handleSliderChange = (val: number) => {
    setSimulatedAttendance(val);
    // Mathematical formula modeling impact
    const calculatedPass = Math.min(99, Math.max(45, Math.round(val * 1.12 - 2.5)));
    const calculatedArrears = Math.max(1, 100 - calculatedPass);
    setSimulatedPassingRate(calculatedPass);
    setSimulatedArrears(calculatedArrears);
  };

  const handleToggleSwap = (id: string) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: s.status === 'FLEX_OPEN' ? 'CONFIRMED' : 'FLEX_OPEN',
              swapRequested: !s.swapRequested,
            }
          : s
      )
    );
  };

  return (
    <div className="p-2 sm:p-5 max-w-5xl lg:max-w-6xl mx-auto space-y-5 bg-[#fcfcfc] text-[#1a1a1a]">
      {/* Title Header */}
      <div className="border-b-[3px] border-[#1a1a1a] pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="editorial-tag bg-[#1a1a1a] text-white">Workload & Capacity Architecture</span>
            <span className="text-xs font-mono font-bold text-[#e11d48] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Amazon A-to-Z Modeling Framework
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif italic font-bold tracking-tight text-[#1a1a1a] mt-2">
            A-to-Z Academic Modeling Engine
          </h1>
          <p className="text-xs font-mono text-[#888888] mt-1 max-w-2xl">
            Algorithmic shift swapping, attendance risk forecasting, lab demand capacity modeling, and voluntary flex duty allocation inspired by Amazon A-to-Z workforce methodology.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="editorial-card p-3 text-center min-w-[130px]">
            <div className="text-[9px] uppercase font-bold text-[#888888] tracking-widest">Model Fidelity</div>
            <div className="text-xl font-mono font-bold text-[#1a1a1a] mt-0.5">99.4%</div>
          </div>
          <div className="editorial-card p-3 text-center min-w-[130px]">
            <div className="text-[9px] uppercase font-bold text-[#888888] tracking-widest">Optimization</div>
            <div className="text-xl font-mono font-bold text-emerald-700 mt-0.5">REAL-TIME</div>
          </div>
        </div>
      </div>

      {/* Model Navigation Pills */}
      <div className="flex items-center gap-2 border-b border-[#e0e0e0] pb-2 overflow-x-auto">
        {[
          { id: 'shift_flex', label: '1. Flex Slot & Faculty Swap Model', icon: Shuffle },
          { id: 'attendance_forecast', label: '2. Attendance Impact Simulator', icon: TrendingUp },
          { id: 'capacity_demand', label: '3. Lab Capacity & Peak Demand', icon: Layers },
          { id: 'duty_allocation', label: '4. Invigilation Workload Matrix', icon: BarChart3 },
        ].map((m) => {
          const Icon = m.icon;
          const isActive = activeModel === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModel(m.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                isActive
                  ? 'border-b-2 border-[#1a1a1a] text-[#1a1a1a]'
                  : 'text-[#888888] hover:text-[#1a1a1a]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {m.label}
            </button>
          );
        })}
      </div>

      {/* MODEL 1: Flex Slot & Faculty Swap */}
      {activeModel === 'shift_flex' && (
        <div className="space-y-6">
          <div className="p-5 border border-[#1a1a1a] bg-[#1a1a1a] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-bold">
                Amazon A-to-Z Voluntary Shift Exchange (VSE) Algorithm
              </div>
              <h2 className="text-2xl font-serif italic font-bold mt-1">Automated Class Period Swap Matrix</h2>
              <p className="text-xs text-slate-300 font-sans mt-0.5 max-w-xl">
                Faculty members can trade timetable periods or request voluntary flex coverage without disruption to class schedules.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="editorial-tag bg-white text-black border-white">
                Live Swaps: 2 Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slots.map((s) => (
              <div key={s.id} className="editorial-card p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#e11d48]">{s.period}</span>
                    <span
                      className={`editorial-tag ${
                        s.status === 'CONFIRMED'
                          ? 'bg-[#1a1a1a] text-white'
                          : s.status === 'FLEX_OPEN'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#1a1a1a] mt-2">{s.subject}</h3>
                  <p className="text-xs text-[#888888] font-mono mt-0.5">Assigned Faculty: {s.faculty}</p>
                </div>

                <div className="pt-3 border-t border-[#e0e0e0] flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#888888]">
                    {s.swapRequested ? 'Swap Open in Faculty Pool' : 'Schedule Locked'}
                  </span>
                  <button
                    onClick={() => handleToggleSwap(s.id)}
                    className="editorial-btn-outline text-[10px] py-1 px-3"
                  >
                    {s.swapRequested ? 'Cancel Swap Request' : 'Request Slot Swap'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODEL 2: Attendance Impact Simulator */}
      {activeModel === 'attendance_forecast' && (
        <div className="editorial-card p-6 space-y-6">
          <div className="border-b border-[#e0e0e0] pb-4">
            <h2 className="text-2xl font-serif italic font-bold text-[#1a1a1a]">Attendance vs Academic Performance Impact Curve</h2>
            <p className="text-xs font-mono text-[#888888] mt-1">
              Simulate overall student attendance thresholds to project pass rates and identify high-risk arrear zones early.
            </p>
          </div>

          {/* Interactive Controls & Live Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Slider Control */}
            <div className="p-5 border border-[#e0e0e0] bg-[#f9f9f9] space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">
                Simulate Target Attendance %
              </label>
              <div className="text-4xl font-serif font-bold text-[#1a1a1a]">
                {simulatedAttendance}%
              </div>
              <input
                type="range"
                min="50"
                max="98"
                value={simulatedAttendance}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full accent-[#1a1a1a] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#888888]">
                <span>50% (Critical Zone)</span>
                <span>75% (Target)</span>
                <span>98% (Excellence)</span>
              </div>
            </div>

            {/* Simulated Outcome Metrics */}
            <div className="p-5 border border-[#e0e0e0] bg-white space-y-2 text-center flex flex-col justify-center">
              <div className="text-[9px] uppercase font-bold text-[#888888] tracking-widest">Projected End-Sem Pass Rate</div>
              <div className={`text-4xl font-serif font-bold ${simulatedPassingRate >= 80 ? 'text-[#1a1a1a]' : 'text-[#e11d48]'}`}>
                {simulatedPassingRate}%
              </div>
              <p className="text-[10px] font-mono text-[#888888]">
                {simulatedPassingRate >= 80 ? 'Safe zone • Meets college NAAC/NBA benchmark' : 'High risk • Requires compulsory remedial classes'}
              </p>
            </div>

            <div className="p-5 border border-[#e0e0e0] bg-[#1a1a1a] text-white space-y-2 text-center flex flex-col justify-center">
              <div className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">Projected Arrear Risk Zone</div>
              <div className="text-4xl font-serif font-bold text-rose-400">
                {simulatedArrears}%
              </div>
              <p className="text-[10px] font-mono text-slate-300">
                Estimated {Math.round(360 * (simulatedArrears / 100))} students requiring re-examinations
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODEL 3: Lab Capacity & Peak Demand */}
      {activeModel === 'capacity_demand' && (
        <div className="editorial-card p-6 space-y-6">
          <div className="border-b border-[#e0e0e0] pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-serif italic font-bold text-[#1a1a1a]">Lab Block Peak Demand Modeling</h2>
              <p className="text-xs font-mono text-[#888888] mt-0.5">Real-time capacity utilization across CSE, IT, and ECE computer centers.</p>
            </div>
            <span className="editorial-tag bg-white">Peak Load: 88.5%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { lab: 'CSE Lab 1 (AI & ML GPU Workstations)', capacity: '60 Systems', utilization: 92, status: 'HIGH_DEMAND' },
              { lab: 'CSE Lab 2 (Cloud Computing & Linux)', capacity: '60 Systems', utilization: 78, status: 'OPTIMAL' },
              { lab: 'IT Lab 3 (Full Stack & DBMS)', capacity: '65 Systems', utilization: 85, status: 'OPTIMAL' },
            ].map((l, i) => (
              <div key={i} className="p-4 border border-[#e0e0e0] bg-[#f9f9f9] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1a1a1a]">{l.lab}</span>
                  <span className="editorial-tag bg-white">{l.status}</span>
                </div>
                <div className="text-3xl font-serif font-bold text-[#1a1a1a]">{l.utilization}%</div>
                <div className="w-full h-1.5 bg-[#e0e0e0]">
                  <div className="h-full bg-[#1a1a1a]" style={{ width: `${l.utilization}%` }} />
                </div>
                <div className="text-[10px] font-mono text-[#888888]">Capacity: {l.capacity}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODEL 4: Invigilation Workload Matrix */}
      {activeModel === 'duty_allocation' && (
        <div className="editorial-card p-6 space-y-6">
          <div className="border-b border-[#e0e0e0] pb-4">
            <h2 className="text-2xl font-serif italic font-bold text-[#1a1a1a]">Fair Workload Invigilation Matrix</h2>
            <p className="text-xs font-mono text-[#888888] mt-0.5">Automated end-semester exam duty balancer ensuring equal load across 18 faculty members.</p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { faculty: 'Dr. S. Ramesh', dutiesAllocated: 4, maxLimit: 5, status: 'BALANCED' },
              { faculty: 'Mrs. K. Priya', dutiesAllocated: 5, maxLimit: 5, status: 'MAX_REACHED' },
              { faculty: 'Mr. P. Vignesh', dutiesAllocated: 3, maxLimit: 5, status: 'AVAILABLE_FOR_SLOT' },
              { faculty: 'Dr. M. Anitha', dutiesAllocated: 2, maxLimit: 5, status: 'AVAILABLE_FOR_SLOT' },
            ].map((f, idx) => (
              <div key={idx} className="p-3 border border-[#e0e0e0] bg-[#f9f9f9] flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#1a1a1a]">{f.faculty}</span>
                  <span className="text-[10px] font-mono text-[#888888] ml-2">({f.dutiesAllocated} / {f.maxLimit} Duties Assigned)</span>
                </div>
                <span className="editorial-tag bg-white">{f.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
