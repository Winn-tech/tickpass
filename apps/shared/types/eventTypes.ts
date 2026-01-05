
export interface ITicketClass {
  name: string; 
  price: number;  
  capacity: number;
  sold?: number; 
}

type Category =
  | 'All events'
  | 'Technology and Innovation'
  | 'Sports, Fitness and Wellness'
  | 'Comedy and Entertainment'
  | 'Business and Networking'
  | 'Art and Culture'
  | 'Spirituality and Religion'
  | 'Food and Vibes'
  | 'Dinner and Dinner Parties'
  | 'Music and Concerts'
  | 'Education and Workshops';

interface category{}
export interface IEvent {
  _id?: string;
  title: string;
  description: string;
  startDate: String | Date;
  endDate: String | Date;
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

  imageUrl?: string | File ;
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

export interface EventFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  date?: 'today' | 'tomorrow' | 'weekend';
  startDate?: string;
  endDate?: string;
  page?: number;
}



export type CreateEventDto = Omit<IEvent, '_id' | 'createdAt' | 'updatedAt' | 'isActive'>;


export type UpdateEventDto = Partial<Omit<IEvent, '_id' | 'createdAt' | 'updatedAt'>>;

export type clientEvents = Partial<IEvent>


export interface TicketType {
  id: number
  name: string
  price: number
  available: boolean
}

export interface ContactInfo {
  firstName: string
  lastName: string
  email: string
  confirmEmail: string
  countryCode: string
  phoneNumber: string
}

export interface CountryCode {
  code: string
  country: string
}

export interface SelectedTickets {
  [key: number]: number
}
