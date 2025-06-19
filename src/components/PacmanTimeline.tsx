import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PacmanSprite } from './PacmanSprite';
import { DotSprite } from './DotSprite';

// Pac-Man SVG pixelado (feito por código, rotaciona para cada direção)
const PacmanPixel = ({ direction = 'right', size = 48 }) => {
  const rotation = {
    right: 'rotate(0deg)',
    left: 'rotate(180deg)',
    up: 'rotate(-90deg)',
    down: 'rotate(90deg)'
  }[direction] || 'rotate(0deg)';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      style={{
        imageRendering: 'pixelated',
        transform: rotation,
        display: 'block'
      }}
    >
      <rect width="32" height="32" fill="black" />
      {/* Corpo do Pac-Man */}
      <path
        d="M16 4 L28 10 L28 22 L16 28 L4 22 L4 10 Z M16 4 A12 12 0 1 1 16 28 Z"
        fill="#FFD600"
      />
      {/* Boca (triângulo preto) */}
      <polygon points="16,16 28,10 28,22" fill="black" />
    </svg>
  );
};

const gridSize = 3;

// Utilitário: retorna [linha, coluna] do índice
function idxToPos(idx) {
  return [Math.floor(idx / gridSize), idx % gridSize];
}
// Utilitário: retorna índice a partir de [linha, coluna]
function posToIdx(row, col) {
  return row * gridSize + col;
}

const DOTS_PER_SEGMENT = 7;

// Novo: checkpoints com coordenadas (row, col) em zigue-zague
const checkpointCoords = [
  { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
  { row: 1, col: 2 }, { row: 1, col: 1 }, { row: 1, col: 0 },
  { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }
];

// Ponto inicial do Pac-Man (à esquerda do primeiro marco)
const start = { row: 0, col: -0.7 };

// Definição de tipos para os pontos do caminho
interface PathDot {
  type: 'dot';
  row: number;
  col: number;
  dotId: string;
}
interface PathCheckpoint {
  type: 'checkpoint';
  row: number;
  col: number;
  checkpointIdx: number;
}
interface PathStart {
  type: 'start';
  row: number;
  col: number;
}
type PathPoint = PathDot | PathCheckpoint | PathStart;

// Gera o caminho fiel (start + dots + checkpoints)
function getFullPathWithDots(dotsPerSegment: number): PathPoint[] {
  const path: PathPoint[] = [ { ...start, type: 'start' } ];
  // Dots do start até o primeiro marco (NÃO inclui dot colado no marco)
  for (let d = 1; d < dotsPerSegment; d++) {
    path.push({
      row: start.row,
      col: start.col + (checkpointCoords[0].col - start.col) * (d / dotsPerSegment),
      type: 'dot',
      dotId: `start-0-${d}`
    });
  }
  for (let i = 0; i < checkpointCoords.length; i++) {
    // Só gera dots entre checkpoints, nunca após o último
    if (i > 0 && i < checkpointCoords.length) {
      const from = checkpointCoords[i - 1];
      const to = checkpointCoords[i];
      if (from.row === to.row) {
        for (let d = 1; d < dotsPerSegment; d++) {
          path.push({
            row: from.row,
            col: from.col + (to.col - from.col) * (d / dotsPerSegment),
            type: 'dot',
            dotId: `${i - 1}-${i}-${d}`
          });
      }
    } else {
        for (let d = 1; d < dotsPerSegment; d++) {
          path.push({
            row: from.row + (to.row - from.row) * (d / dotsPerSegment),
            col: from.col,
            type: 'dot',
            dotId: `${i - 1}-${i}-${d}`
          });
        }
      }
    }
    path.push({ ...checkpointCoords[i], type: 'checkpoint', checkpointIdx: i });
  }
  // Remover qualquer dot após o último checkpoint
  const lastCheckpointIdx = path.map((p, i) => ({p, i})).reverse().find(({p}) => p.type === 'checkpoint').i;
  return path.slice(0, lastCheckpointIdx + 1);
}

const fullPath = getFullPathWithDots(DOTS_PER_SEGMENT);

// Utilitário para converter coordenadas de grid para SVG (0~1)
function gridToSvg(row: number, col: number) {
  return {
    x: col / (gridSize - 1),
    y: row / (gridSize - 1),
  };
}

// Array de pontos do caminho (start + checkpoints)
const pathPoints = [start, ...checkpointCoords];
const svgPoints = pathPoints.map(p => gridToSvg(p.row, p.col));
const pathString = svgPoints.map(p => `${p.x * 100},${p.y * 100}`).join(' ');

const PacmanTimeline: React.FC = () => {
  const { translations, currentVersion } = useLanguage();
  const closeLabel = translations[currentVersion].timelineClose || 'Close';
  const instruction = translations[currentVersion].timelineInstruction || '';
  const cardRef = useRef<HTMLDivElement>(null);

  // timelineData para os marcos
  const timelineRaw = translations[currentVersion].timeline.filter((item: any) => parseInt(item.year) <= 2007);
  const timelineData = checkpointCoords.map((coord, i) => timelineRaw[i] || null);

  // Estado
  // Pac-Man deve nascer na primeira bolinha (primeiro dot)
  const firstDotIdx = fullPath.findIndex(p => p.type === 'dot');
  const [currentPathIdx, setCurrentPathIdx] = useState(firstDotIdx); // índice no fullPath
  const [animating, setAnimating] = useState(false);
  const [eatenDots, setEatenDots] = useState(new Set()); // índices dos dots já comidos
  const [targetCheckpointIdx, setTargetCheckpointIdx] = useState(-1);

  // Função para direção
  function getDirection(
    from: { row: number; col: number } | null,
    to: { row: number; col: number } | null
  ): 'right' | 'left' | 'up' | 'down' {
    if (!from || !to) return 'right';
    if (to.row > from.row) return 'down';
    if (to.row < from.row) return 'up';
    if (to.col > from.col) return 'right';
    if (to.col < from.col) return 'left';
    return 'right';
  }

  // Caminho até o destino (sempre marco a marco)
  function getPathIdxForCheckpoint(idx) {
    return fullPath.findIndex(p => p.type === 'checkpoint' && p.checkpointIdx === idx);
  }

  function movePacmanTo(targetIdx) {
    if (animating || targetIdx === getCurrentCheckpointIdx()) return;
    setAnimating(true);
    const fromIdx = currentPathIdx;
    const toIdx = getPathIdxForCheckpoint(targetIdx);
    const step = fromIdx < toIdx ? 1 : -1;
    let idx = fromIdx;
    function next() {
      if (idx === toIdx) {
        setAnimating(false);
        setTargetCheckpointIdx(targetIdx);
        return;
      }
      idx += step;
      setCurrentPathIdx(idx);
      if (fullPath[idx].type === 'dot') {
        setEatenDots(prev => {
          const newSet = new Set(prev);
          newSet.add(idx);
          return newSet;
        });
      }
      setTimeout(next, 120);
    }
    next();
  }

  function getCurrentCheckpointIdx() {
    const p = fullPath[currentPathIdx];
    return p.type === 'checkpoint' ? p.checkpointIdx : null;
  }

  // Clique debounceado
  function handleCheckpointClick(idx) {
    if (animating) return;
    if (idx === getCurrentCheckpointIdx()) return;
    const destPathIdx = getPathIdxForCheckpoint(idx);
    // Atualiza eatenDots para sumir todas as bolinhas até o destino
    setEatenDots(prev => {
      const newSet = new Set(prev);
      if (destPathIdx > currentPathIdx) {
        // Indo para frente: comer todas as bolinhas do caminho
        for (let i = currentPathIdx + 1; i <= destPathIdx; i++) {
          if (fullPath[i].type === 'dot') newSet.add(i);
        }
      } else {
        // Voltando: restaurar bolinhas após o destino
        for (let i = destPathIdx + 1; i < fullPath.length; i++) {
          if (fullPath[i].type === 'dot') newSet.delete(i);
        }
      }
      return newSet;
    });
    movePacmanTo(idx);
  }

  // Renderização dos dots
  function renderDots() {
    // Só renderiza dots entre o primeiro e o último marco
    const firstCheckpointIdx = fullPath.findIndex(p => p.type === 'checkpoint');
    const lastCheckpointIdx = fullPath.map((p, i) => ({p, i})).reverse().find(({p}) => p.type === 'checkpoint').i;
    return fullPath.map((p, idx) =>
      p.type === 'dot' && idx > firstCheckpointIdx && idx < lastCheckpointIdx && (
        <span
          key={p.dotId}
          className="z-30 absolute"
          style={calcSvgPosition(p.row, p.col)}
        >
          <DotSprite eaten={eatenDots.has(idx)} size={16} />
        </span>
      )
    );
  }

  // Calcula posição absoluta do dot
  function calcDotPosition(p) {
    return {
      top: `calc(${p.row * 100 / (gridSize - 1)}%)`,
      left: `calc(${p.col * 100 / (gridSize - 1)}%)`,
      transform: 'translate(-50%,-50%)',
      filter: 'drop-shadow(0 0 4px #fff)'
    };
  }

  // Renderização do Pac-Man
  function renderPacman() {
    const p = fullPath[currentPathIdx];
    let dir: 'right' | 'left' | 'up' | 'down' = 'right';
    let pos = calcSvgPosition(p.row, p.col);
    // Direção baseada no próximo ponto
    const next = fullPath[currentPathIdx + 1] || null;
    if (next) dir = getDirection(p, next);
    return (
      <div className="z-40 animate-pacman-move" style={{ ...pos, transition: 'top 0.18s linear, left 0.18s linear', position: 'absolute' }}>
        <PacmanSprite direction={dir} size={48} animating={animating} />
      </div>
    );
  }

  // Click-outside para fechar o card
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (targetCheckpointIdx !== -1 && cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setTargetCheckpointIdx(-1);
      }
    }
    if (targetCheckpointIdx !== -1) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [targetCheckpointIdx]);

  // Fechar com ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setTargetCheckpointIdx(-1);
    }
    if (targetCheckpointIdx !== -1) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [targetCheckpointIdx]);

  // Render extra (som, vídeo, quiz, link)
  function renderExtra(extra: any) {
    if (!extra) return null;
    if (extra.sound) {
      return <audio controls src={extra.sound} className="my-2 w-full" />;
    }
    if (extra.video) {
      return <iframe src={extra.video} title="Vídeo" className="w-full h-40 my-2 rounded" allow="autoplay; encrypted-media" allowFullScreen />;
    }
    if (extra.link) {
      return <a href={extra.link} target="_blank" rel="noopener noreferrer" className="block text-blue-400 underline my-2">Saiba mais</a>;
    }
    if (extra.quiz) {
      return <div className="my-2 p-2 bg-zinc-800 rounded text-yellow-300">{extra.quiz}</div>;
    }
    return null;
  }

  // Calcula posição absoluta do marco sobre o SVG
  function calcSvgPosition(row, col) {
    const x = col * 100 / (gridSize - 1);
    const y = row * 100 / (gridSize - 1);
    return {
      left: `calc(${x}% - 10px)`,
      top: `calc(${y}% - 10px)`,
      transform: 'translate(-50%,-50%)',
      filter: 'drop-shadow(0 0 4px #fff)'
    };
  }

  // Renderização do caminho SVG aprimorado
  function renderPathSvg() {
    return (
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pacman-path-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e90ff" />
            <stop offset="100%" stopColor="#00eaff" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <polyline
          points={pathString}
          fill="none"
          stroke="url(#pacman-path-gradient)"
          strokeWidth={4.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#glow)"
        />
      </svg>
    );
  }

  // Tooltip aprimorado para mobile
  function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
    const [show, setShow] = React.useState(false);
    return (
      <div
        className="relative"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onTouchStart={() => setShow(v => !v)}
        tabIndex={0}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      >
        {children}
        {show && (
          <div className="tooltip-content animate-tooltip-fade z-50 whitespace-nowrap">
            {text}
          </div>
        )}
        <style>{`
          .animate-tooltip-fade {
            animation: tooltip-fade-in 0.25s;
          }
          @keyframes tooltip-fade-in {
            from { opacity: 0; transform: translateY(8px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .tooltip-content {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -2.2rem;
            background: #181e2a;
            border: 2px solid #00eaff;
            color: #b3e6ff;
            padding: 0.4rem 1rem;
            border-radius: 0.7rem;
            box-shadow: 0 2px 16px #00eaff44;
            font-family: inherit;
            font-size: 0.95em;
            pointer-events: none;
          }
          @media (max-width: 600px) {
            .tooltip-content {
              top: 2.5rem;
              left: 50%;
              transform: translateX(-50%);
              min-width: 120px;
              max-width: 90vw;
              white-space: normal;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen" style={{ background: '#000', paddingBottom: 64, paddingTop: 0 }}>
      {/* Tutorial explicativo acima da timeline */}
      <div className="w-full max-w-2xl mx-auto text-center bg-zinc-900 border-2 border-yellow-400 rounded-xl p-4 text-yellow-300 font-pixel text-lg shadow-lg" style={{ marginBottom: 80 }}>
        {currentVersion === 'gr' && (
          <>
            <span role="img" aria-label="Pac-Man">🟡</span> Κάντε κλικ ή αγγίξτε τα εικονίδια για να δείτε λεπτομέρειες για κάθε τεχνολογικό ορόσημο! Ο Pac-Man θα πάει στο επιλεγμένο γεγονός, τρώγοντας τα σημεία στη διαδρομή. Δοκιμάστε να εξερευνήσετε όλα!
          </>
        )}
        {currentVersion === 'en' && (
          <>
            <span role="img" aria-label="Pac-Man">🟡</span> Click or tap the icons to see details about each technology milestone! Pac-Man will go to the chosen event, eating the dots along the way. Try to explore them all!
          </>
        )}
        {currentVersion === 'easy' && (
          <>
            <span role="img" aria-label="Pac-Man">🟡</span> Tap or click the icons to learn about each technology! Pac-Man moves to the event you pick and eats the dots. Try them all!
          </>
        )}
                </div>
      {/* Espaço abaixo do tutorial */}
      <div style={{ height: 80 }} />
      <div className="relative w-full max-w-2xl mx-auto flex-1 flex items-center justify-center" style={{ minHeight: 700 }}>
        {renderPacman()}
        {renderDots()}
        {/* Renderização dos marcos sobre o SVG, sem grid CSS */}
        {checkpointCoords.map((coord, i) => {
          const item = timelineData[i];
          if (!item) return null;
          return (
            <div
              key={i}
              style={calcSvgPosition(coord.row, coord.col)}
              className="z-30 flex flex-col items-center justify-center min-h-[100px] absolute"
            >
              <Tooltip text={item.title}>
                <div
                  className={`timeline-event flex flex-col items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${animating ? 'opacity-60 pointer-events-none' : ''}`}
                  tabIndex={0}
                  onClick={() => handleCheckpointClick(i)}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCheckpointClick(i)}
                  aria-label={item.title}
                  style={{
                    boxShadow: targetCheckpointIdx === i ? '0 0 16px 4px #1e90ff88' : '0 2px 12px #0008',
                    transform: targetCheckpointIdx === i ? 'scale(1.08)' : 'scale(1)',
                  }}
                >
                  <div className={`w-20 h-20 flex items-center justify-center rounded-full border-4 border-yellow-400 bg-black group-hover:scale-110 transition-transform duration-200 shadow-lg ${targetCheckpointIdx === i ? 'ring-4 ring-blue-400' : ''}`}>
                    <span className="text-4xl animate-pulse select-none">{item.icon}</span>
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-yellow-300 font-bold text-lg">{item.year}</div>
                    <div className="text-white font-semibold text-base">{item.title}</div>
                  </div>
                </div>
              </Tooltip>
            </div>
          );
        })}
        {/* Popup de detalhes do marco selecionado, renderizado fora do loop para garantir sobreposição */}
        {targetCheckpointIdx !== -1 && (() => {
          const coord = checkpointCoords[targetCheckpointIdx];
          const item = timelineData[targetCheckpointIdx];
          if (!item) return null;
          const pos = calcSvgPosition(coord.row, coord.col);
          return (
            <div
              ref={cardRef}
              className="absolute w-80 max-w-xs bg-zinc-900 border-2 border-yellow-400 rounded-xl shadow-2xl p-4 animate-fade-in"
              style={{
                top: `calc(${pos.top})`,
                left: `calc(${pos.left})`,
                zIndex: 99999,
                transform: 'translate(-50%, 40px)',
              }}
            >
                      <img src={item.image} alt={item.title} className="w-full h-32 object-contain mb-2 rounded bg-zinc-800" />
                      <div className="text-orange-400 font-bold mb-1">{item.title}</div>
                      <div className="text-gray-200 text-sm mb-2">{item.description}</div>
                      {renderExtra(item.extra)}
                      <button
                        className="mt-2 px-4 py-2 bg-yellow-400 text-black rounded shadow hover:bg-orange-500 transition w-full"
                        onClick={e => {
                          e.stopPropagation();
                  setTargetCheckpointIdx(-1);
                        }}
                        tabIndex={0}
                        aria-label={closeLabel}
                      >
                        {closeLabel}
                      </button>
                    </div>
          );
        })()}
      </div>
      <style>{`
        @keyframes pacman-move {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-pacman-move {
          animation: pacman-move 0.7s infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dot-pixel { box-shadow: 0 0 2px 2px #fff8, 0 0 8px #fff4; }
      `}</style>
    </div>
  );
};

export default PacmanTimeline;