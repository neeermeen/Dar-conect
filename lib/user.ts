export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface SavedProperty {
  propertyId: string;
  savedAt: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
  response?: string;
  respondedAt?: string;
}

export interface UserProfile extends User {
  savedProperties: SavedProperty[];
  inquiries: Inquiry[];
}

// Mock user data for demonstration
export const mockUser: UserProfile = {
  id: '1',
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean.dupont@email.com',
  phone: '+33 6 12 34 56 78',
  avatar: undefined,
  createdAt: '2024-01-15',
  savedProperties: [
    { propertyId: '1', savedAt: '2024-03-10' },
    { propertyId: '3', savedAt: '2024-03-12' },
    { propertyId: '5', savedAt: '2024-03-15' },
  ],
  inquiries: [
    {
      id: '1',
      propertyId: '1',
      propertyTitle: 'Villa Méditerranée',
      message: 'Je souhaite organiser une visite de cette propriété ce weekend.',
      status: 'responded',
      createdAt: '2024-03-10',
      response: 'Bonjour M. Dupont, nous serions ravis de vous accueillir samedi à 14h. Merci de confirmer votre disponibilité.',
      respondedAt: '2024-03-11',
    },
    {
      id: '2',
      propertyId: '3',
      propertyTitle: 'Penthouse Étoile',
      message: 'Quelles sont les charges mensuelles pour ce bien ?',
      status: 'pending',
      createdAt: '2024-03-15',
    },
    {
      id: '3',
      propertyId: '2',
      propertyTitle: 'Château de la Loire',
      message: 'Est-il possible de négocier le prix ?',
      status: 'closed',
      createdAt: '2024-02-20',
      response: 'Le propriétaire accepte une offre à 4.2M€.',
      respondedAt: '2024-02-22',
    },
  ],
};
