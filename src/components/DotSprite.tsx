import React from 'react';

interface DotSpriteProps {
  eaten: boolean;
  size?: number;
}

export const DotSprite: React.FC<DotSpriteProps> = ({ eaten, size = 14 }) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: '#FFD600',
      display: 'block',
      margin: 'auto',
      boxShadow: '0 0 8px #FFD60088',
      opacity: eaten ? 0 : 1,
      transform: eaten ? 'scale(0.5)' : 'scale(1)',
      transition: 'opacity 0.25s, transform 0.25s',
    }}
  />
); 