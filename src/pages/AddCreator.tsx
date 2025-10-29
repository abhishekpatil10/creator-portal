import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCreator } from '../api/creators';
import { SidebarForm } from '../components/SidebarForm';
import { useCreatorContext } from '../context/CreatorContext';
import type { Creator } from '../api/creators';

export const AddCreator = () => {
  const navigate = useNavigate();
  const { setCreators } = useCreatorContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = async (creatorData: Omit<Creator, 'id'>) => {
    setIsLoading(true);
    try {
      const newCreator = await addCreator(creatorData);
      setCreators((prev) => [...prev, newCreator]);
      alert('Creator added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding creator:', error);
      alert('Failed to add creator.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => navigate('/'), 300);
  };

  return <SidebarForm isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} isLoading={isLoading} mode="add" />;
};

