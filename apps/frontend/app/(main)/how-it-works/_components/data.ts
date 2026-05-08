import {
  BarChart3,
  CalendarPlus,
  ClipboardList,
  CreditCard,
  DoorOpen,
  Download,
  Eye,
  Megaphone,
  RadioTower,
  ScanLine,
  Send,
  ShieldCheck,
  Ticket,
  TicketCheck,
  Wallet,
  WandSparkles,
} from 'lucide-react';

export const steps = [
  {
    number: '01',
    icon: CalendarPlus,
    title: 'Create the event',
    text: 'Add the basics, choose a look, set your venue or virtual link, and make the page feel ready for your crowd.',
  },
  {
    number: '02',
    icon: Ticket,
    title: 'Build the tickets',
    text: 'Free, paid, VIP, early bird, table, invite-only, or group passes. Set quantities and let Tickpass handle the order flow.',
  },
  {
    number: '03',
    icon: Send,
    title: 'Share and sell',
    text: 'Publish your event, promote the link, accept secure payments, and watch sales move from the dashboard.',
  },
  {
    number: '04',
    icon: ScanLine,
    title: 'Check in guests',
    text: 'Scan QR tickets at the door, verify access fast, and track attendance while the room fills up.',
  },
];

export const creatorFlow = [
  { icon: WandSparkles, title: 'Shape the page', text: 'Event image, description, time, venue, FAQs, and ticket rules in one guided setup.' },
  { icon: Megaphone, title: 'Promote with a clean link', text: 'Share a polished event page across socials, communities, email, and private groups.' },
  { icon: BarChart3, title: 'Track everything live', text: 'See orders, revenue, ticket availability, guests, and check-in progress without guessing.' },
  { icon: Wallet, title: 'Receive payouts', text: 'Keep revenue organized with simple payment records and payout visibility for your team.' },
];

export const attendeeFlow = [
  { icon: Eye, title: 'Discover', text: 'Find events by interest, category, location, or the link an organizer shares.' },
  { icon: CreditCard, title: 'Pay securely', text: 'Choose tickets, fill in attendee details, apply discounts, and complete checkout.' },
  { icon: TicketCheck, title: 'Get the pass', text: 'Receive a digital ticket with the details needed to show up prepared.' },
  { icon: DoorOpen, title: 'Walk in faster', text: 'Show the QR ticket at the venue and move through entry with less friction.' },
];

export const ticketTypes = [
  'Free tickets',
  'Paid tickets',
  'VIP access',
  'Early bird',
  'Table bookings',
  'Group passes',
  'Invite-only',
  'Online access',
];

export const pricingNotes = [
  'No charge to publish free events',
  'Paid-event fees apply after a successful sale',
  'Checkout and confirmation stay simple for guests',
  'Payout records stay visible for organizers',
];

export const reasons = [
  { icon: ShieldCheck, title: 'Secure by default', text: 'Payments, ticket records, and entry checks are designed around trust.' },
  { icon: RadioTower, title: 'Built for momentum', text: 'From announcement to last call, your event stays easy to share and manage.' },
  { icon: ClipboardList, title: 'Operational clarity', text: 'Know who paid, who is coming, who entered, and what ticket they hold.' },
  { icon: Download, title: 'Data you can use', text: 'Keep attendee records useful for planning, reporting, and future campaigns.' },
];

export const faqs = [
  {
    question: 'Is Tickpass free for free events?',
    answer: 'Yes. Free events can stay free, so organizers can publish and manage registrations without turning a simple event into an expense.',
  },
  {
    question: 'Can I sell different ticket types?',
    answer: 'Yes. You can create multiple ticket categories for different audiences, access levels, prices, and quantities.',
  },
  {
    question: 'How do guests receive tickets?',
    answer: 'Guests receive a digital ticket after checkout, including the event details and a QR code that can be verified at entry.',
  },
  {
    question: 'Can my team scan tickets at the venue?',
    answer: 'Yes. The check-in flow is built for fast QR verification, so door teams can confirm guests and reduce entry delays.',
  },
];
