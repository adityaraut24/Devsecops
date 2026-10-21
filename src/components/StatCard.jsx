import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color, meta, highlight = false }) => {
  const colorMap = {
    blue: {
      bg: '#e0f2fe',
      text: '#0284c7',
      border: '#bae6fd'
    },
    amber: {
      bg: '#fef3c7',
      text: '#d97706',
      border: '#fde68a'
    },
    teal: {
      bg: '#ccfbf1',
      text: '#0d9488',
      border: '#99f6e4'
    },
    emerald: {
      bg: '#d1fae5',
      text: '#059669',
      border: '#a7f3d0'
    },
    rose: {
      bg: '#ffe4e6',
      text: '#e11d48',
      border: '#fecdd3'
    },
    purple: {
      bg: '#ede9fe',
      text: '#7c3aed',
      border: '#ddd6fe'
    }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div
      className="stat-card"
      style={{
        borderTop: highlight ? `4px solid ${scheme.text}` : undefined
      }}
    >
      <div className="stat-card-top">
        <span className="stat-label">{title}</span>
        <div
          className="stat-icon-wrap"
          style={{ backgroundColor: scheme.bg, color: scheme.text }}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>
      <div className="stat-value">{value}</div>
      {meta && <div className="stat-meta">{meta}</div>}
    </div>
  );
};
