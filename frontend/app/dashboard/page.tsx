'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PlusCircle, Loader2, PawPrint } from 'lucide-react';
import { api } from '@/lib/api';
import { Header, PetCard, PetModal, DeleteConfirmModal } from '@/components/dashboard';

interface User {
  id: number;
  name: string;
  email: string;
}

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

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [deletingPetId, setDeletingPetId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    loadUserAndPets();
  }, [router]);

  async function loadUserAndPets() {
    try {
      const [userData, petsData] = await Promise.all([
        api.get('/me'),
        api.get('/pets'),
      ]);

      setUser(userData);
      setPets(petsData.pets || []);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await api.post('/logout', {});
      localStorage.removeItem('token');
      toast.success('Logout realizado com sucesso!');
      router.push('/login');
    } catch (error) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }

  function openAddModal() {
    setEditingPet(null);
    setShowModal(true);
  }

  function openEditModal(pet: Pet) {
    setEditingPet(pet);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingPet(null);
  }

  async function handleSubmit(data: { nome: string; tipo: string; idade_anos: number; idade_meses: number; sexo: 'macho' | 'femea' }) {
    setIsSubmitting(true);

    try {
      if (editingPet) {
        const response = await api.put(`/pets/${editingPet.id}`, data);
        setPets(pets.map(p => p.id === editingPet.id ? response.pet : p));
        toast.success('Pet atualizado com sucesso!');
      } else {
        const response = await api.post('/pets', data);
        setPets([...pets, response.pet]);
        toast.success('Pet cadastrado com sucesso!');
      }

      closeModal();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao salvar pet');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deletingPetId) return;

    try {
      await api.delete(`/pets/${deletingPetId}`);
      setPets(pets.filter(p => p.id !== deletingPetId));
      toast.success('Pet excluído com sucesso!');
      setDeletingPetId(null);
    } catch (error) {
      toast.error('Erro ao excluir pet');
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            Adicionar Pet
          </button>
        </div>

        {pets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <PawPrint className="h-16 w-16 text-zinc-300 mb-4" />
            <p className="text-lg text-zinc-600 mb-2">Nenhum pet cadastrado</p>
            <p className="text-sm text-zinc-500">
              Clique em &quot;Adicionar Pet&quot; para começar
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map(pet => (
              <PetCard
                key={pet.id}
                pet={pet}
                onEdit={openEditModal}
                onDelete={setDeletingPetId}
              />
            ))}
          </div>
        )}
      </main>

      <PetModal
        isOpen={showModal}
        editingPet={editingPet}
        isSubmitting={isSubmitting}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmModal
        isOpen={!!deletingPetId}
        onClose={() => setDeletingPetId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
