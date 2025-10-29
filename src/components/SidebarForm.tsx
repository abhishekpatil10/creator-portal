import { useEffect, useState } from 'react';
import { CreatorForm } from './CreatorForm';
import type { Creator } from '../api/creators';

interface SidebarFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Creator;
  onSubmit: (creator: Omit<Creator, 'id'>) => void;
  isLoading?: boolean;
  mode: 'add' | 'edit';
}

export const SidebarForm = ({ isOpen, onClose, initialData, onSubmit, isLoading, mode }: SidebarFormProps) => {
  useEffect(() => {
    if (isOpen) {
      // Apply blur and transparency to navbar
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.classList.add('backdrop-blur-sm', 'opacity-50');
      }
    } else {
      // Remove blur and transparency from navbar
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.classList.remove('backdrop-blur-sm', 'opacity-50');
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {mode === 'add' ? 'Add New Creator' : 'Edit Creator'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <i className="ph ph-x text-2xl text-gray-500 dark:text-slate-400"></i>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6">
            <CreatorForm
              initialData={initialData}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};
