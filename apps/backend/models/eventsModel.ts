import { Schema, model, Document } from 'mongoose';
import { IEvent } from '../../shared/types/eventTypes';

export type EventDoc = IEvent & Document;

const required = (field: string): [boolean, string] => [true, `An event must have a ${field}`];
const max = (field: string, n: number): [number, string] => [
  n,
  `An event ${field} cannot exceed ${n} characters`
];

// sub-schemas
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


const eventSchema = new Schema<EventDoc>(
  {
    title: {
      type: String,
      required: required('title'),
      trim: true,
      maxlength: max('title', 150)
    },
    description: {
      type: String,
      required: required('description'),
      trim: true,
      maxlength: max('description', 2000)
    },
    date: { type: Date, required: required('date') },
    time: { type: String, required: required('time') },
    venue: {
      type: String,
      required: required('venue'),
      trim: true,
      maxlength: max('venue', 200)
    },
    location: { type: locationSchema, required: required('location') },
    category: { type: String, required: required('category'), trim: true },
    price: {
      type: Number,
      required: required('price'),
      min: [0, 'Price cannot be negative']
    },
    availableTickets: {
      type: Number,
      required: required('available-tickets count'),
      min: [0, 'Available tickets cannot be negative']
    },
    totalTickets: {
      type: Number,
      required: required('total-tickets count'),
      min: [0, 'Total tickets cannot be negative'],
      validate: {
        validator(this: EventDoc) {
          return this.totalTickets >= this.availableTickets;
        },
        message: 'Total tickets must be ≥ available tickets'
      }
    },
    imageUrl: { type: String, trim: true, default: '' },
    organizer: { type: organizerSchema, required: required('organiser') },
    tags: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);


eventSchema.index({ date: 1, isActive: 1 });
eventSchema.index({ category: 1, isActive: 1 });
eventSchema.index({ 'location.city': 1, 'location.state': 1 });

export const EventModel = model<EventDoc>('Event', eventSchema);