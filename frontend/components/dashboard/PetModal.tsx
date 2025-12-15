'use client';

import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { validatePetName, validatePetType, validatePetAge, validatePetSex } from '@/lib/validation';

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

interface FormData {
  nome: string;
  tipo: string;
  idade_anos: string;
  idade_meses: string;
  sexo: 'macho' | 'femea';
}

interface FormErrors {
  nome?: string;
  tipo?: string;
  idade_anos?: string;
  idade_meses?: string;
  sexo?: string;
}

interface PetModalProps {
  isOpen: boolean;
  editingPet: Pet | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: { nome: string; tipo: string; idade_anos: number; idade_meses: number; sexo: 'macho' | 'femea' }) => void;
}

export function PetModal({ isOpen, editingPet, isSubmitting, onClose, onSubmit }: PetModalProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    tipo: '',
    idade_anos: '',
    idade_meses: '',
    sexo: 'macho',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (editingPet) {
      setFormData({
        nome: editingPet.nome,
        tipo: editingPet.tipo,
        idade_anos: editingPet.idade_anos.toString(),
        idade_meses: (editingPet.idade_meses || 0).toString(),
        sexo: editingPet.sexo,
      });
    } else {
      setFormData({ nome: '', tipo: '', idade_anos: '', idade_meses: '', sexo: 'macho' });
    }
    setFormErrors({});
  }, [editingPet, isOpen]);

  function validateForm(): boolean {
    const errors: FormErrors = {};
    const anos = parseInt(formData.idade_anos) || 0;
    const meses = parseInt(formData.idade_meses) || 0;

    const nomeError = validatePetName(formData.nome);
    if (nomeError) errors.nome = nomeError;

    const tipoError = validatePetType(formData.tipo);
    if (tipoError) errors.tipo = tipoError;

    const idadeError = validatePetAge(anos, meses);
    if (idadeError) errors.idade_anos = idadeError;

    const sexoError = validatePetSex(formData.sexo);
    if (sexoError) errors.sexo = sexoError;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      nome: formData.nome.trim(),
      tipo: formData.tipo.trim(),
      idade_anos: parseInt(formData.idade_anos) || 0,
      idade_meses: parseInt(formData.idade_meses) || 0,
      sexo: formData.sexo,
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-6">
          {editingPet ? 'Editar Pet' : 'Adicionar Pet'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Nome
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => {
                setFormData({ ...formData, nome: e.target.value });
                setFormErrors({ ...formErrors, nome: undefined });
              }}
              className="w-full h-12 px-4 rounded-lg border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
              placeholder="Ex: Mel"
            />
            {formErrors.nome && (
              <p className="text-sm text-red-600 mt-1">{formErrors.nome}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Tipo
            </label>
            <input
              type="text"
              value={formData.tipo}
              onChange={(e) => {
                setFormData({ ...formData, tipo: e.target.value });
                setFormErrors({ ...formErrors, tipo: undefined });
              }}
              className="w-full h-12 px-4 rounded-lg border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
              placeholder="Ex: Cachorro, Gato"
            />
            {formErrors.tipo && (
              <p className="text-sm text-red-600 mt-1">{formErrors.tipo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Idade
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-600 mb-1">
                  Anos
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.idade_anos}
                  onChange={(e) => {
                    setFormData({ ...formData, idade_anos: e.target.value });
                    setFormErrors({ ...formErrors, idade_anos: undefined });
                  }}
                  className="w-full h-12 px-4 rounded-lg border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-600 mb-1">
                  Meses
                </label>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={formData.idade_meses}
                  onChange={(e) => {
                    setFormData({ ...formData, idade_meses: e.target.value });
                    setFormErrors({ ...formErrors, idade_meses: undefined });
                  }}
                  className="w-full h-12 px-4 rounded-lg border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
            {(formErrors.idade_anos || formErrors.idade_meses) && (
              <p className="text-sm text-red-600 mt-1">
                {formErrors.idade_anos || formErrors.idade_meses}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Sexo
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sexo"
                  value="macho"
                  checked={formData.sexo === 'macho'}
                  onChange={(e) => setFormData({ ...formData, sexo: e.target.value as 'macho' | 'femea' })}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-zinc-700">Macho</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sexo"
                  value="femea"
                  checked={formData.sexo === 'femea'}
                  onChange={(e) => setFormData({ ...formData, sexo: e.target.value as 'macho' | 'femea' })}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-zinc-700">Fêmea</span>
              </label>
            </div>
            {formErrors.sexo && (
              <p className="text-sm text-red-600 mt-1">{formErrors.sexo}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 h-12 px-4 rounded-full border border-zinc-300 text-zinc-700 font-medium hover:bg-zinc-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-12 px-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
