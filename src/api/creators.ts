const API_BASE_URL = 'http://localhost:3001';

export type Creator = {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  city: string;
  contentNiche: string;
  instagramFollowers: string;
  instagramAccountType: string;
  instagramProfileUrl: string;
  thumbnail: string;
  image?: string;
};

// Fetch all creators
export const getCreators = async (): Promise<Creator[]> => {
  const response = await fetch(`${API_BASE_URL}/creators`);
  if (!response.ok) {
    throw new Error('Failed to fetch creators');
  }
  return response.json();
};

// Fetch single creator
export const getCreator = async (id: number): Promise<Creator> => {
  const response = await fetch(`${API_BASE_URL}/creators/${id}`);
  if (!response.ok) {
    throw new Error('Creator not found');
  }
  return response.json();
};

// Add a creator
export const addCreator = async (creator: Omit<Creator, 'id'>): Promise<Creator> => {
  const response = await fetch(`${API_BASE_URL}/creators`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creator),
  });
  if (!response.ok) {
    throw new Error('Failed to add creator');
  }
  return response.json();
};

// Update a creator
export const updateCreator = async (id: number, creator: Partial<Creator>): Promise<Creator> => {
  const response = await fetch(`${API_BASE_URL}/creators/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creator),
  });
  if (!response.ok) {
    throw new Error('Failed to update creator');
  }
  return response.json();
};

// Delete a creator
export const deleteCreator = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/creators/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete creator');
  }
};

