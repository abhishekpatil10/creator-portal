import { useEffect, useState } from 'react';
import { getCreator, deleteCreator } from '../api/creators';
import type { Creator } from '../api/creators';

interface CreatorDetailsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  creatorId: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export const CreatorDetailsSidebar = ({ isOpen, onClose, creatorId, onDelete, onEdit }: CreatorDetailsSidebarProps) => {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (isOpen && creatorId) {
      fetchCreator();
    }
  }, [isOpen, creatorId]);

  const fetchCreator = async () => {
    if (!creatorId) return;
    setLoading(true);
    try {
      const data = await getCreator(creatorId);
      setCreator(data);
    } catch (error) {
      console.error('Error fetching creator:', error);
      alert('Failed to fetch creator details.');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCreator(creatorId);
      setShowDeleteModal(false);
      onClose();
      onDelete(creatorId);
      alert('Creator deleted successfully!');
    } catch (error) {
      console.error('Error deleting creator:', error);
      alert('Failed to delete creator.');
    }
  };

  useEffect(() => {
    if (isOpen) {
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.classList.add('backdrop-blur-sm', 'opacity-50');
      }
    } else {
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
        className={`fixed top-0 right-0 h-full w-full max-w-3xl bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : creator ? (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Creator Profile</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <i className="ph ph-x text-2xl text-gray-500 dark:text-slate-400"></i>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {/* Profile Header */}
              <div className="mb-6">
                <div className="flex items-start gap-6">
                  <img
                    src={creator.thumbnail}
                    alt={creator.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-slate-700 shadow-lg"
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{creator.name}</h1>
                    <p className="text-lg text-gray-600 dark:text-slate-400 mb-3">{creator.contentNiche}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-white/80 dark:bg-white/20 backdrop-blur-md border border-gray-200 dark:border-white/30 rounded-full text-xs font-medium text-slate-900 dark:text-white">
                        <i className="ph ph-users"></i> {creator.instagramFollowers} followers
                      </span>
                      <span className="px-3 py-1 bg-white/80 dark:bg-white/20 backdrop-blur-md border border-gray-200 dark:border-white/30 rounded-full text-xs font-medium text-slate-900 dark:text-white">
                        <i className="ph ph-map-pin"></i> {creator.city}
                      </span>
                      <span className="px-3 py-1 bg-white/80 dark:bg-white/20 backdrop-blur-md border border-gray-200 dark:border-white/30 rounded-full text-xs font-medium text-slate-900 dark:text-white">
                        <i className="ph ph-user-circle"></i> {creator.gender}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => onEdit(creatorId)}
                        className="px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-sm hover:shadow-lg text-slate-900 dark:text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 font-medium flex items-center gap-2"
                      >
                        <i className="ph ph-pencil-simple"></i>
                        Edit
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 font-medium flex items-center gap-2"
                      >
                        <i className="ph ph-trash"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>

              {/* Personal Details */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Email</p>
                    <p className="text-slate-900 dark:text-white font-medium">{creator.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Phone</p>
                    <p className="text-slate-900 dark:text-white font-medium">{creator.phoneNumber}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Location</p>
                    <p className="text-slate-900 dark:text-white font-medium">{creator.city}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Instagram Account</p>
                    <p className="text-slate-900 dark:text-white font-medium">{creator.instagramAccountType}</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>

              {/* Instagram Profile */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Instagram Profile</h3>
                <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                  <a
                    href={`https://${creator.instagramProfileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity"
                  >
                    <i className="ph ph-instagram-logo text-2xl"></i>
                    <div>
                      <p className="font-semibold">@{creator.instagramProfileUrl.replace('instagram.com/', '')}</p>
                      <p className="text-sm opacity-90">{creator.instagramFollowers} followers</p>
                    </div>
                    <i className="ph ph-arrow-square-out ml-auto"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-slate-400">Creator not found</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-xl max-w-sm w-full border border-gray-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete <strong>{creator?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/30 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600/10 dark:bg-red-600/20 backdrop-blur-md border border-red-300 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-300 hover:scale-105 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

