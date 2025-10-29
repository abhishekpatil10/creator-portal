import { useEffect, useState } from 'react';
import { getCreators, addCreator, updateCreator } from '../api/creators';
import { useCreatorContext } from '../context/CreatorContext';
import { CreatorCard } from '../components/CreatorCard';
import { TableView } from '../components/TableView';
import { Pagination } from '../components/Pagination';
import { Loader } from '../components/Loader';
import { SidebarForm } from '../components/SidebarForm';
import { CreatorDetailsSidebar } from '../components/CreatorDetailsSidebar';
import type { Creator } from '../api/creators';

export const CreatorList = () => {
  const { creators, setCreators, loading, setLoading } = useCreatorContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCreatorId, setSelectedCreatorId] = useState<number | null>(null);
  const [showDetailsSidebar, setShowDetailsSidebar] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCreatorData, setEditCreatorData] = useState<Creator | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCreators();
  }, []);

  useEffect(() => {
    const filtered = creators.filter(
      (creator) =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.contentNiche.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCreators(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [creators, searchTerm]);

  const handleItemsPerPageChange = (newSize: number) => {
    setItemsPerPage(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleAddCreator = async (creatorData: Omit<Creator, 'id'>) => {
    setIsSubmitting(true);
    try {
      const newCreator = await addCreator(creatorData);
      const updatedCreators = [{ ...newCreator }, ...creators];
      setCreators(updatedCreators);
      setShowAddModal(false);
      // Custom confirmation box
      const confirmBox = document.createElement('div');
      confirmBox.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] px-5 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-xl rounded-lg text-slate-900 dark:text-white flex items-center gap-3';
      confirmBox.innerHTML = `<i class="ph ph-check-circle text-green-600 text-xl"></i><span>Creator added successfully!</span>`;
      document.body.appendChild(confirmBox);
      setTimeout(() => confirmBox.remove(), 2000);
    } catch (error) {
      console.error('Error adding creator:', error);
      alert('Failed to add creator.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewCreator = (id: number) => {
    setSelectedCreatorId(id);
    setShowDetailsSidebar(true);
  };

  const handleEditCreator = (id: number) => {
    setShowDetailsSidebar(false);
    // Find the creator data
    const creatorToEdit = creators.find(c => c.id === id);
    if (creatorToEdit) {
      setEditCreatorData(creatorToEdit);
      setShowEditModal(true);
    }
  };

  const handleUpdateCreator = async (creatorData: Omit<Creator, 'id'>) => {
    if (!editCreatorData?.id) return;
    
    setIsEditing(true);
    try {
      const updatedCreator = await updateCreator(editCreatorData.id, creatorData);
      const updatedCreators = creators.map(c => 
        c.id === editCreatorData.id ? { ...updatedCreator, id: editCreatorData.id } : c
      );
      setCreators(updatedCreators);
      setShowEditModal(false);
      setEditCreatorData(null);
      
      // Show success notification
      const confirmBox = document.createElement('div');
      confirmBox.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] px-5 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-xl rounded-lg text-slate-900 dark:text-white flex items-center gap-3';
      confirmBox.innerHTML = `<i class="ph ph-check-circle text-green-600 text-xl"></i><span>Creator updated successfully!</span>`;
      document.body.appendChild(confirmBox);
      setTimeout(() => confirmBox.remove(), 2000);
    } catch (error) {
      console.error('Error updating creator:', error);
      alert('Failed to update creator.');
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteCreator = (id: number) => {
    setCreators(creators.filter(c => c.id !== id));
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredCreators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCreators = filteredCreators.slice(startIndex, endIndex);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const data = await getCreators();
      // Sort: newest (last) first by id
      const sorted = [...data].sort((a, b) => (b.id || 0) - (a.id || 0));
      setCreators(sorted);
      setFilteredCreators(sorted);
    } catch (error) {
      console.error('Error fetching creators:', error);
      alert('Failed to fetch creators.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Creators</h1>
            
            {/* Search, Add Creator, and View Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <i className="ph ph-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-400"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-sm"
                />
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/30 shadow-sm hover:shadow-lg text-slate-900 dark:text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 font-medium flex items-center gap-2"
              >
                <i className="ph ph-plus text-lg"></i>
                Add Creator
              </button>
              
              {/* View Toggle Buttons */}
              <div className="flex gap-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-1">
              <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 ${
                    viewMode === 'table'
                      ? 'bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/40 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  <i className="ph ph-table"></i>
                  Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 ${
                    viewMode === 'grid'
                      ? 'bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/40 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  <i className="ph ph-squares-four"></i>
                  Grid
                </button>
             
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {filteredCreators.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-900 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No creators found matching your search.' : 'No creators available.'}
            </p>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCreators.map((creator) => (
                  <div key={creator.id} onClick={() => handleViewCreator(creator.id!)}>
                    <CreatorCard creator={creator} />
                  </div>
                ))}
              </div>
            ) : (
              <TableView creators={paginatedCreators} onViewClick={handleViewCreator} onEditClick={handleEditCreator} />
            )}
            
            {/* Pagination */}
            {totalPages > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredCreators.length}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            )}
          </>
        )}
      </div>

      {/* Add Creator Modal */}
      <SidebarForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCreator}
        isLoading={isSubmitting}
        mode="add"
      />

      {/* Edit Creator Modal */}
      <SidebarForm
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditCreatorData(null);
        }}
        onSubmit={handleUpdateCreator}
        initialData={editCreatorData || undefined}
        isLoading={isEditing}
        mode="edit"
      />

      {/* Creator Details Sidebar */}
      {selectedCreatorId && (
        <CreatorDetailsSidebar
          isOpen={showDetailsSidebar}
          onClose={() => {
            setShowDetailsSidebar(false);
            setSelectedCreatorId(null);
          }}
          creatorId={selectedCreatorId}
          onDelete={handleDeleteCreator}
          onEdit={handleEditCreator}
        />
      )}
    </div>
  );
};

