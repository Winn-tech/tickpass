
export interface ITicketClass {
  name: string; 
  price: number; 
  capacity: number;
  sold?: number; 
}

export interface IEvent {
  _id?: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  time: string;
  venue: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  category: string;
  ticketClasses: ITicketClass[];
  basePrice?: number;

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


export type CreateEventDto = Omit<IEvent, '_id' | 'createdAt' | 'updatedAt'>;


export type UpdateEventDto = Partial<Omit<IEvent, '_id' | 'createdAt' | 'updatedAt'>>;

export type clientEvents = Partial<IEvent>