import React from 'react';

interface PacmanSpriteProps {
  direction: 'right' | 'left' | 'up' | 'down';
  size?: number;
  animating?: boolean;
}

const rotationMap = {
  right: 'rotate(0deg)',
  left: 'rotate(180deg)',
  up: 'rotate(-90deg)',
  down: 'rotate(90deg)',
};

export const PacmanSprite: React.FC<PacmanSpriteProps> = ({ direction, size = 48, animating = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    style={{
      display: 'block',
      transform: rotationMap[direction] || 'rotate(0deg)',
      filter: 'drop-shadow(0 0 8px #FFD60088)',
    }}
  >
    <g>
      <circle cx="32" cy="32" r="30" fill="#FFD600" />
      <path
        className={animating ? 'pacman-mouth' : ''}
        d="M32,32 L62,18 A30,30 0 1,1 62,46 Z"
        fill="#000"
      />
      <ellipse cx="42" cy="20" rx="3" ry="5" fill="#222" />
    </g>
    <style>{`
      .pacman-mouth {
        transform-origin: 32px 32px;
        animation: pacman-mouth 0.35s infinite alternate;
      }
      @keyframes pacman-mouth {
        0% { d: path('M32,32 L62,18 A30,30 0 1,1 62,46 Z'); }
        100% { d: path('M32,32 L62,28 A30,30 0 1,1 62,36 Z'); }
      }
    `}</style>
  </svg>
); 