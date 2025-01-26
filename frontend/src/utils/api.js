const API_URL = 'http://localhost:1337/api';

export const fetchSpecialities = async () => {
  const response = await fetch(`${API_URL}/speczialnostis`); 
  if (!response.ok) throw new Error('Failed to fetch specialities');
  return response.json();
};
