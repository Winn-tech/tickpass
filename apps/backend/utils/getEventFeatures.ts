// utils/getEventFeatures.ts
import { Prisma } from '@prisma/client';

type EventQuery = {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  date?: 'today' | 'tomorrow' | 'weekend';
  startDate?: string;
  endDate?: string;
  sort?: string;
  page?: string;
  limit?: string;
  fields?: string;
};

type PrismaEventArgs = {
  where: Prisma.EventWhereInput;
  orderBy: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
  skip: number;
  take: number;
  select?: Prisma.EventSelect | null;
  include?: Prisma.EventInclude | null;
};

class EventFeatures {
  private query: EventQuery;
  private args: PrismaEventArgs;

  constructor(query: any) {  // ← single argument
    this.query = query;
    this.args = {
      where: {},
      orderBy: { startDate: 'asc' },
      skip: 0,
      take: 10,
      include: { ticketClasses: true },
    };
  }

  filter(): this {
    const where: Prisma.EventWhereInput = { isActive: true };

    if (this.query.category && this.query.category !== 'All events') {
      where.category = {
        equals: this.query.category,
        mode: 'insensitive',
      };
    }

    if (this.query.minPrice || this.query.maxPrice) {
      where.basePrice = {};
      if (this.query.minPrice) {
        where.basePrice.gte = parseFloat(this.query.minPrice);
      }
      if (this.query.maxPrice) {
        where.basePrice.lte = parseFloat(this.query.maxPrice);
      }
    }

    if (this.query.date) {
      const now = new Date();
      const startOfDay = (d: Date) => new Date(new Date(d).setHours(0, 0, 0, 0));
      const endOfDay = (d: Date) => new Date(new Date(d).setHours(23, 59, 59, 999));

      if (this.query.date === 'today') {
        where.startDate = {
          gte: startOfDay(now),
          lte: endOfDay(now),
        };
      }

      if (this.query.date === 'tomorrow') {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        where.startDate = {
          gte: startOfDay(tomorrow),
          lte: endOfDay(tomorrow),
        };
      }

      if (this.query.date === 'weekend') {
        const day = now.getDay();
        const daysUntilSat = (6 - day + 7) % 7 || 7;
        const saturday = new Date();
        saturday.setDate(now.getDate() + daysUntilSat);
        const sunday = new Date(saturday);
        sunday.setDate(saturday.getDate() + 1);
        where.startDate = {
          gte: startOfDay(saturday),
          lte: endOfDay(sunday),
        };
      }
    }

    if (this.query.startDate || this.query.endDate) {
      where.startDate = {};
      if (this.query.startDate) {
        (where.startDate as Prisma.DateTimeFilter).gte = new Date(this.query.startDate);
      }
      if (this.query.endDate) {
        (where.startDate as Prisma.DateTimeFilter).lte = new Date(this.query.endDate);
      }
    }

    this.args.where = where;
    return this;
  }

  sort(): this {
    if (!this.query.sort) {
      this.args.orderBy = { startDate: 'asc' };
      return this;
    }

    const sortFields = this.query.sort.split(',');
    const orderBy: Prisma.EventOrderByWithRelationInput[] = sortFields.map((field: string) => {
      if (field.startsWith('-')) {
        return { [field.slice(1)]: 'desc' } as Prisma.EventOrderByWithRelationInput;
      }
      return { [field]: 'asc' } as Prisma.EventOrderByWithRelationInput;
    });

    this.args.orderBy = orderBy;
    return this;
  }

  limitFields(): this {  // ← was limitField
    if (!this.query.fields) return this;

    const fields = this.query.fields.split(',');
    const select = fields.reduce((acc: Record<string, boolean>, field: string) => {
      acc[field.trim()] = true;
      return acc;
    }, {});

    select['ticketClasses'] = true;

    this.args.select = select as Prisma.EventSelect;
    this.args.include = null;
    return this;
  }

  paginate(): this {
    const page = parseInt(this.query.page ?? '1');
    const limit = parseInt(this.query.limit ?? '10');
    this.args.skip = (page - 1) * limit;
    this.args.take = limit;
    return this;
  }

  build(): PrismaEventArgs {
    return this.args;
  }
}

export default EventFeatures;