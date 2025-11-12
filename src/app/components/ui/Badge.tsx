import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'orange' | 'success' | 'warning';
}

export function Badge({
  children,
  variant = 'default',
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-700 text-gray-300',
    orange: 'bg-orange-500/20 text-orange-500',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}