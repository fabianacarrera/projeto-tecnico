'use client';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
          Excluir Pet
        </h2>
        <p className="text-zinc-600 mb-6">
          Tem certeza que deseja excluir este pet? Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 px-4 rounded-full border border-zinc-300 text-zinc-700 font-medium hover:bg-zinc-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-12 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
