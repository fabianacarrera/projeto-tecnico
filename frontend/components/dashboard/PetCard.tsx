'use client';

import { Edit2, Trash2, PawPrint } from 'lucide-react';

interface Pet {
  id: number;
  nome: string;
  tipo: string;
  idade_anos: number;
  idade_meses: number;
  sexo: 'macho' | 'femea';
  created_at: string;
  updated_at: string;
}

interface PetCardProps {
  pet: Pet;
  onEdit: (pet: Pet) => void;
  onDelete: (petId: number) => void;
}

function formatIdade(anos: number, meses: number): string {
  const anosNum = anos || 0;
  const mesesNum = meses || 0;

  if (anosNum === 0 && mesesNum === 0) {
    return 'Idade não informada';
  }

  if (anosNum === 0) {
    return `${mesesNum} ${mesesNum === 1 ? 'mês' : 'meses'}`;
  }

  if (mesesNum === 0) {
    return `${anosNum} ${anosNum === 1 ? 'ano' : 'anos'}`;
  }

  return `${anosNum} ${anosNum === 1 ? 'ano' : 'anos'} e ${mesesNum} ${mesesNum === 1 ? 'mês' : 'meses'}`;
}

export function PetCard({ pet, onEdit, onDelete }: PetCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
            <PawPrint className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900">
              {pet.nome}
            </h3>
            <p className="text-sm text-zinc-600">{pet.tipo}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span className="font-medium">Idade:</span>
          <span>{formatIdade(pet.idade_anos, pet.idade_meses)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span className="font-medium">Sexo:</span>
          <span className="capitalize">{pet.sexo}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-zinc-200">
        <button
          onClick={() => onEdit(pet)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
        >
          <Edit2 className="h-4 w-4" />
          Editar
        </button>
        <button
          onClick={() => onDelete(pet.id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Excluir
        </button>
      </div>
    </div>
  );
}
