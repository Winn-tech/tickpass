import { Schema, model, Document } from 'mongoose';
import { IEvent } from '../../shared/types/eventTypes';

export type EventDoc = IEvent & Document;
const required = (field: string): [boolean, string] =>
  [true, `An event must have a ${field}`];

const max = (field: string, n: number): [number, string] =>
  [n, `An event ${field} cannot exceed ${n} characters`];

const locationSchema = new Schema(
  {
    address: { type: String, required: required('street address'), trim: true },
    city: { type: String, required: required('city'), trim: true },
    state: { type: String, required: required('state'), trim: true },
    zipCode: { type: String, required: required('zip code'), trim: true }
  },
  { _id: false }
);

const organizerSchema = new Schema(
  {
    name: { type: String, required: required('organiser name'), trim: true },
    email: {
      type: String,
      required: required('organiser email'),
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Please provide a valid organiser email']
    },
    phone: { type: String, required: required('organiser phone'), trim: true }
  },
  { _id: false }
);

const ticketClassSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, 'Class name cannot be empty'],
      maxlength: [50, 'Class name cannot exceed 50 characters']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least 1']
    },
    sold: {
      type: Number,
      default: 0,
      min: [0, 'Sold count cannot be negative']
    }
  },
  { _id: false }
);


const eventSchema = new Schema<EventDoc>(
  {
    title: {
      type: String,
      required: required('title'),
      trim: true,
      lowercase: true,
      maxlength: max('title', 150)
    },
    description: {
      type: String,
      required: required('description'),
      trim: true,
      maxlength: max('description', 2000)
    },
    startDate: { type: Date, required: required('date') },
    endDate: { type: Date, required: required('date') },
    time: { type: String, required: required('time') },
    venue: {
      type: String,
      required: required('venue'),
      trim: true,
      maxlength: max('venue', 200)
    },
    location: { type: locationSchema, required: required('location') },
    category: { type: String, required: required('category'), trim: true },

    ticketClasses: {
      type: [ticketClassSchema],
      validate: [
        (arr: any[]) => arr && arr.length > 0,
        'At least one ticket class is required'
      ]
    },
    basePrice : {
      type : Number,
      min: 0
    },
    imageUrl: { type: String, trim: true, default: '' },
    organizer: { type: organizerSchema, required: required('organiser') },
    tags: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

eventSchema.pre('validate', function (next) {
  if (!this.ticketClasses) return next();
  const names = this.ticketClasses.map(tc => tc.name.trim().toLowerCase());
  const dup = names.some((n, i) => names.indexOf(n) !== i);
  if (dup) return next(new Error('Ticket-class names must be unique within the event'));
  next();
});

// setting the base price 
eventSchema.pre('save', function(){
  const prices = this.ticketClasses
    .map((ticket)=> ticket.price)
    .filter(p => typeof p === 'number' && !isNaN(p));
  if (prices.length >0) {
    this.basePrice = Math.min(...prices)
  }
  
})

// sold ≤ capacity for every class
eventSchema.pre('save', function (next) {
  if (!this.ticketClasses) return next();
  for (const tc of this.ticketClasses) {
      const sold = tc.sold?? 0
      const capacity = tc.capacity?? 0
    if (sold > capacity) {
      return next(new Error(`${tc.name} class: sold tickets cannot exceed capacity`));
    }
  }
  next();
});

eventSchema.virtual('totalSold').get(function (this: EventDoc) {
  if (!this.ticketClasses || this.ticketClasses.length === 0) return 0;
  return this.ticketClasses.reduce((sum, tc) => sum + (tc.sold ?? 0), 0);
});

eventSchema.virtual('totalCapacity').get(function (this: EventDoc) {
  if (!this.ticketClasses || this.ticketClasses.length === 0) return 0;
  return this.ticketClasses.reduce((sum, tc) => sum + (tc.capacity ?? 0), 0);
});

eventSchema.statics.getClass = function (
  eventId: string,
  className: string
) {
  return this.findOne(
    { _id: eventId, 'ticketClasses.name': className },
    { 'ticketClasses.$': 1 }
  );
};

eventSchema.index({ date: 1, isActive: 1 });
eventSchema.index({ category: 1, isActive: 1 });
eventSchema.index({ 'location.city': 1, 'location.state': 1 });

export const EventModel = model<EventDoc>('Event', eventSchema);