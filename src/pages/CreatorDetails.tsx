import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCreator, deleteCreator } from '../api/creators';
import { useCreatorContext } from '../context/CreatorContext';
import { Loader } from '../components/Loader';
import type { Creator } from '../api/creators';

export const CreatorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setLastViewed } = useCreatorContext();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchCreator();
  }, [id]);

  const fetchCreator = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getCreator(Number(id));
      setCreator(data);
      setLastViewed(data);
    } catch (error) {
      console.error('Error fetching creator:', error);
      alert('Failed to fetch creator details.');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteCreator(Number(id));
      alert('Creator deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting creator:', error);
      alert('Failed to delete creator.');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!creator) {
    return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-8 shadow border border-gray-200 dark:border-gray-700">
        <p className="text-gray-800 dark:text-white text-lg mb-4">Creator not found</p>
        <Link to="/" className="text-blue-600 hover:underline font-semibold">
          Go back to home
        </Link>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="relative h-96">
            <img
              src={creator.image}
              alt={creator.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">{creator.name}</h1>
                <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4 font-normal">{creator.contentNiche}</p>
                <p className="text-lg font-semibold text-blue-600 tracking-tight">{creator.instagramFollowers} followers</p>
              </div>
              <div className="flex space-x-3">
                <Link
                  to={`/edit/${creator.id}`}
                  className="px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/90 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-md transition-all duration-300 hover:scale-105 font-medium flex items-center gap-2"
                >
                  <i className="ph ph-pencil-simple"></i>
                  Edit
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md transition-all duration-300 hover:scale-105 font-medium flex items-center gap-2"
                >
                  <i className="ph ph-trash"></i>
                  Delete
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Email</p>
                  <p className="text-gray-900 dark:text-white font-medium">{creator.email}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Phone Number</p>
                  <p className="text-gray-900 dark:text-white font-medium">{creator.phoneNumber}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Location</p>
                  <p className="text-gray-900 dark:text-white font-medium">{creator.city}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">Content Niche</p>
                  <p className="text-gray-900 dark:text-white font-medium">{creator.contentNiche}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Instagram</h2>
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
                    <p className="text-sm opacity-90">{creator.instagramFollowers} followers • {creator.instagramAccountType}</p>
                  </div>
                  <i className="ph ph-arrow-square-out ml-auto"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>{creator.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/30 text-gray-700 dark:text-gray-300 rounded-md hover:bg-white/90 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  handleDelete();
                }}
                className="flex-1 px-4 py-2 bg-red-600/10 dark:bg-red-600/20 backdrop-blur-md border border-red-300 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-300 hover:scale-105 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

