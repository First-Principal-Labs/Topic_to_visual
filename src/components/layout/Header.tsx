import ApiKeyInput from '@/components/input/ApiKeyInput';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/Logo.png" alt="Logo" className="h-9 w-9" />
          <h1 className="text-xl font-bold text-gray-900">
            Topic to <span className="text-primary-500">Visual</span>
          </h1>
        </div>
        <ApiKeyInput />
      </div>
    </header>
  );
}
