export const dashboardSummary = {
  walletBalance: 'NGN 124,500',
  pendingSettlement: 'NGN 18,000',
  projectedPayout: 'NGN 142,500',
  upcomingEvent: {
    title: 'TickPass Creator Night',
    date: 'May 18, 2026',
    time: '5:00 PM',
    venue: 'Landmark Centre, Victoria Island',
    sold: 146,
    capacity: 250,
  },
};

export const dashboardMetrics = [
  {
    label: 'Total Ticket Sales',
    value: 'NGN 764,000',
    delta: '+12.4% vs last 7 days',
  },
  {
    label: 'Events Created',
    value: '08',
    delta: '+2 this month',
  },
  {
    label: 'Tickets Sold',
    value: '412',
    delta: '+18.1% conversion',
  },
  {
    label: 'Check-ins Completed',
    value: '175',
    delta: '+9.8% from last event',
  },
];

export const recentActivity = [
  {
    id: 'sale-1',
    type: 'sale',
    title: 'Lagos Product Mixer',
    description: '22 tickets sold across Regular and VIP tiers.',
    value: 'NGN 48,000',
    time: 'Today, 9:12 AM',
  },
  {
    id: 'scan-1',
    type: 'scan',
    title: 'Design & Build Summit',
    description: '14 attendees checked in successfully at Gate A.',
    value: '14 scans',
    time: 'Yesterday, 6:41 PM',
  },
  {
    id: 'draft-1',
    type: 'draft',
    title: 'Wellness on the Rooftop',
    description: 'Draft listing updated with fresh poster art and ticket pricing.',
    value: 'Draft updated',
    time: 'Apr 27, 2026',
  },
];

export const checklist = [
  {
    title: 'Publish your next draft',
    description: 'Your strongest draft is almost ready. Push it live while audience interest is still warm.',
    badge: 'High impact',
  },
  {
    title: 'Test your scan workflow',
    description: 'Run a dry check-in before event day so your gate experience feels fast and frictionless.',
    badge: 'Operations',
  },
  {
    title: 'Review pending settlements',
    description: 'A quick review now keeps your payout flow clean when sales accelerate.',
    badge: 'Finance',
  },
];
