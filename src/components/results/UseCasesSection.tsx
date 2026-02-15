import { Lightbulb } from 'lucide-react';
import SectionCard from '@/components/shared/SectionCard';
import type { UseCase } from '@/types';

interface Props {
  useCases: UseCase[];
}

const domainColors: Record<string, string> = {
  NLP: 'bg-blue-100 text-blue-700',
  'Computer Vision': 'bg-purple-100 text-purple-700',
  Healthcare: 'bg-emerald-100 text-emerald-700',
  Finance: 'bg-amber-100 text-amber-700',
  Robotics: 'bg-rose-100 text-rose-700',
  Education: 'bg-cyan-100 text-cyan-700',
  'Speech Recognition': 'bg-indigo-100 text-indigo-700',
  Gaming: 'bg-orange-100 text-orange-700',
  'Autonomous Driving': 'bg-teal-100 text-teal-700',
};

function getDomainColor(domain: string): string {
  if (domainColors[domain]) return domainColors[domain];
  // Fuzzy match
  const key = Object.keys(domainColors).find((k) =>
    domain.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(domain.toLowerCase())
  );
  return key ? domainColors[key] : 'bg-gray-100 text-gray-700';
}

export default function UseCasesSection({ useCases }: Props) {
  return (
    <SectionCard title="Use Cases & Applications" icon={<Lightbulb className="w-5 h-5" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {useCases.map((uc) => (
          <div
            key={uc.title}
            className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full mb-2 ${getDomainColor(uc.domain)}`}>
              {uc.domain}
            </span>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{uc.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{uc.description}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
