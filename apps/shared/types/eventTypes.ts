// pure TS – no Mongoose import
export interface ITicketClass {
  name: string; // creator-defined category: VIP, Platinum, Early-bird, etc.
  priceCents: number; // integer price in the smallest currency unit
  capacity: number;
  sold?: number; // optional so the UI can omit it on create
}

export interface IEvent {
  _id?: string; // optional so UI can use it
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

  /* NEW: replaces price / availableTickets / totalTickets */
  ticketClasses: ITicketClass[];

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

/* ---------- DTOs ---------- */
export type CreateEventDto = Omit<IEvent, '_id' | 'createdAt' | 'updatedAt'>;

/* On updates you may want to allow partial ticket-class arrays */
export type UpdateEventDto = Partial<Omit<IEvent, '_id' | 'createdAt' | 'updatedAt'>>;