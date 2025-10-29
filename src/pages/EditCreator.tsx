import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCreator, updateCreator } from '../api/creators';
import { SidebarForm } from '../components/SidebarForm';
import { useCreatorContext } from '../context/CreatorContext';
import { Loader } from '../components/Loader';
import type { Creator } from '../api/creators';

export const EditCreator = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setCreators } = useCreatorContext();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetchCreator();
  }, [id]);

  const fetchCreator = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getCreator(Number(id));
      setCreator(data);
    } catch (error) {
      console.error('Error fetching creator:', error);
      alert('Failed to fetch creator details.');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (creatorData: Omit<Creator, 'id'>) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      const updatedCreator = await updateCreator(Number(id), creatorData);
      setCreators((prev) =>
        prev.map((c) => (c.id === Number(id) ? { ...updatedCreator, id: Number(id) } : c))
      );
      alert('Creator updated successfully!');
      handleClose();
    } catch (error) {
      console.error('Error updating creator:', error);
      alert('Failed to update creator.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => navigate('/creator/' + id), 300);
  };

  if (loading) {
    return <Loader />;
  }

  if (!creator) {
    return null;
  }

  return (
    <SidebarForm
      isOpen={isOpen}
      onClose={handleClose}
      initialData={creator}
      onSubmit={handleSubmit}
      isLoading={isSubmitting}
      mode="edit"
    />
  );
};
