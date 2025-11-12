import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({
  children,
  className = '',
  onClick,
  hover = false,
}: CardProps) {
  const hoverClass = hover
    ? 'hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-200 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}