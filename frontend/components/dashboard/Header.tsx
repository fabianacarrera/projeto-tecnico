'use client';

import { LogOut, PawPrint } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <PawPrint className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-semibold text-zinc-900">
              Seus Pets
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600">
              Olá, <span className="font-medium text-zinc-900">{user?.name}</span>
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
