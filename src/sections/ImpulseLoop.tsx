import { useState, useEffect } from 'react';
import { useReveal } from '@/hooks/useReveal';

const stages = [
  { name: 'EXPLORE', description: 'Discover emerging technologies, model weights, and unexplored frontiers. Follow genuine technical curiosity.' },
  { name: 'EXPERIMENT', description: 'Test, benchmark and prototype without fear of breaking things. Discover what truly works in code.' },
  { name: 'BUILD', description: 'Turn raw prototypes into production-grade systems. Architect multi-agent pipelines with fellow builders.' },
  { name: 'SHIP', description: 'Release what you build into the world. Open-source repositories, deploy live endpoints, and put tools in hands.' },
  { name: 'SHOW', description: 'Showcase your work on stage. Demo nights, technical write-ups, and live demonstrations.' },
  { name: 'REPEAT', description: 'The loop compounds. Every completed cycle builds technical mastery and community momentum.' },
];

export default function ImpulseLoop() {
  const { ref, isVisible } = useReveal();
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);
  const [isUserPaused, setIsUserPaused] = useState<boolean>(false);

  const radius = 200;
  const centerX = 280;
  const centerY = 280;

  const handleSelectStage = (index: number) => {
    setActiveStage(index);
    setIsUserPaused(true);
  };

  useEffect(() => {
    if (isUserHovering || isUserPaused) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isUserHovering, isUserPaused]);

  return (
    <section ref={ref} className="relative py-28 lg:py-36 bg-space-950 border-t border-space-800/80 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono-label text-[11px] text-impulse-blue-bright/70 border border-space-700/80 bg-space-900/60 backdrop-blur-md px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-impulse-blue" />
            <span>OPERATING SYSTEM // THE FLYWHEEL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-impulse-white tracking-tight leading-tight">
            THE IMPULSE <span className="text-impulse-blue-bright">LOOP</span>
          </h2>
          <p className="mt-4 text-base lg:text-lg text-impulse-gray-light/70 max-w-lg">
            A continuous loop of experimentation and shipping where every iteration compounds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Circular SVG Visualization */}
          <div className={`flex justify-center transition-[opacity,transform] duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div
              className="relative w-full max-w-[540px] aspect-square"
              onMouseEnter={() => setIsUserHovering(true)}
              onMouseLeave={() => setIsUserHovering(false)}
            >
              <svg viewBox="0 0 560 560" className="w-full h-full">
                {/* Orbital rings */}
                <g aria-hidden="true">
                  <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="1" />
                  <circle cx={centerX} cy={centerY} r={radius + 32} fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" strokeDasharray="3 5" />
                  <circle cx={centerX} cy={centerY} r={radius - 32} fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" strokeDasharray="3 5" />
                </g>

                {/* Connecting Arcs Between Stages */}
                <g aria-hidden="true">
                  {stages.map((_, i) => {
                    const angle1 = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
                    const angle2 = ((i + 1) / stages.length) * Math.PI * 2 - Math.PI / 2;
                    const x1 = centerX + Math.cos(angle1) * radius;
                    const y1 = centerY + Math.sin(angle1) * radius;
                    const x2 = centerX + Math.cos(angle2) * radius;
                    const y2 = centerY + Math.sin(angle2) * radius;

                    const midAngle = (angle1 + angle2) / 2;
                    const ctrlRadius = radius + 22;
                    const cpx = centerX + Math.cos(midAngle) * ctrlRadius;
                    const cpy = centerY + Math.sin(midAngle) * ctrlRadius;

                    const isActive = activeStage === i;

                    return (
                      <path
                        key={`arc-${i}`}
                        d={`M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`}
                        fill="none"
                        stroke={isActive ? 'rgba(96,165,250,0.85)' : 'rgba(59,130,246,0.15)'}
                        strokeWidth={isActive ? '2' : '1'}
                        className="transition-colors duration-300"
                      />
                    );
                  })}
                </g>

                {/* Center Core Impulse */}
                <g aria-hidden="true">
                  <circle cx={centerX} cy={centerY} r="44" fill="rgba(59,130,246,0.05)" />
                  <circle cx={centerX} cy={centerY} r="7" fill="#F8FAFC" opacity="0.9" />
                  <circle cx={centerX} cy={centerY} r="3" fill="#60A5FA" />
                </g>

                {/* Stage Nodes on the Orbit */}
                {stages.map((stage, i) => {
                  const angle = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
                  const x = centerX + Math.cos(angle) * radius;
                  const y = centerY + Math.sin(angle) * radius;
                  const isActive = activeStage === i;

                  return (
                    <g
                      key={stage.name}
                      role="button"
                      tabIndex={0}
                      aria-label={`Stage ${i + 1}: ${stage.name}`}
                      aria-pressed={isActive}
                      onClick={() => handleSelectStage(i)}
                      onMouseEnter={() => {
                        setIsUserHovering(true);
                        setActiveStage(i);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectStage(i);
                        }
                      }}
                      className="cursor-pointer focus:outline-none"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? 32 : 18}
                        fill={isActive ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.06)'}
                        className="transition-colors duration-300"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? 7 : 4}
                        fill={isActive ? '#60A5FA' : 'rgba(96,165,250,0.6)'}
                        className="transition-colors duration-300"
                      />
                      <circle cx={x} cy={y} r="2.5" fill="#F8FAFC" opacity="0.9" aria-hidden="true" />
                      <text
                        x={x}
                        y={y + (Math.sin(angle) > 0 ? 28 : -18)}
                        textAnchor="middle"
                        fill={isActive ? '#F8FAFC' : 'rgba(203,213,225,0.7)'}
                        className="font-mono transition-colors duration-300 font-semibold select-none"
                        style={{ fontSize: '11px', letterSpacing: '0.12em' }}
                      >
                        {stage.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Stage Details Column */}
          <div
            onMouseEnter={() => setIsUserHovering(true)}
            onMouseLeave={() => setIsUserHovering(false)}
          >
            <div
              role="tablist"
              aria-label="Impulse flywheel stages"
              className="space-y-3"
            >
              {stages.map((stage, i) => (
                <button
                  key={stage.name}
                  type="button"
                  role="tab"
                  id={`stage-tab-${i}`}
                  aria-selected={activeStage === i}
                  aria-controls={`stage-panel-${i}`}
                  onClick={() => handleSelectStage(i)}
                  onMouseEnter={() => setActiveStage(i)}
                  className={`w-full text-left border-l-2 pl-6 py-4 cursor-pointer transition-colors duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-impulse-blue rounded-r-sm ${
                    activeStage === i
                      ? 'border-impulse-blue bg-space-900/90'
                      : 'border-space-800 hover:border-space-700 bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-mono-label text-xs text-impulse-blue-bright/70 font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-sans text-lg font-semibold tracking-wide transition-colors duration-200 ${
                        activeStage === i ? 'text-impulse-white' : 'text-impulse-gray-light/70'
                      }`}
                    >
                      {stage.name}
                    </span>
                  </div>

                  <div
                    id={`stage-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`stage-tab-${i}`}
                    className={`transition-[opacity,max-height] duration-300 overflow-hidden ${
                      activeStage === i ? 'opacity-100 max-h-32 mt-2' : 'opacity-0 max-h-0'
                    }`}
                  >
                    <p className="text-sm text-impulse-gray-light/80 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <p className="font-mono-label text-xs text-impulse-gray-light/70 mt-8">
              HOVER OR CLICK TO EXPLORE STAGES
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
