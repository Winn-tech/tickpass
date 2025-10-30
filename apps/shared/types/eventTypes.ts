// pure TS – no Mongoose import
export interface IEvent {
  _id?: string;               // optional so UI can use it
  title: string;
  description: string;
  date: Date;
  time: string;
  venue: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  category: string;
  price: number;
  availableTickets: number;
  totalTickets: number;
  imageUrl?: string;
  organizer: {
    name: string;
    email: string;
    phone: string;
  };
  tags: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// DTOs
export type CreateEventDto = Omit<IEvent, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateEventDto = Partial<CreateEventDto>;