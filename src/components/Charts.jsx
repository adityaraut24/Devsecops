import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

export const DepartmentBarChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#64748b' }} angle={-15} textAnchor="end" interval={0} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          <Bar dataKey="total" name="Total Registered" fill="#0284c7" radius={[4, 4, 0, 0]} />
          <Bar dataKey="waiting" name="Currently Waiting" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StatusDonutChart = ({ data }) => {
  const COLORS = {
    Waiting: '#f59e0b',
    Called: '#8b5cf6',
    'In Consultation': '#0d9488',
    Completed: '#10b981',
    Cancelled: '#94a3b8'
  };

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={4}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#0284c7'} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ArrivalLineChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="timeSlot" tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
          <Line
            type="monotone"
            dataKey="arrivals"
            name="Patient Inflow"
            stroke="#0284c7"
            strokeWidth={3}
            dot={{ r: 4, fill: '#0284c7' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="served"
            name="Served / Consulted"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: '#10b981' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
