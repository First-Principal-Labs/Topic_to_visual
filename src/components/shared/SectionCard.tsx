import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({ title, icon, children, className = '' }: SectionCardProps) {
  return (
    <section className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
        {icon && <span className="text-primary-500">{icon}</span>}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}
