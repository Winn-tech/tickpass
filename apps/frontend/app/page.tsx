import TrendingEvents from "./_components/trendingEvents";
import TickpassHero from "./_components/hero";
import CategoriesSection from "./_components/categories";
import { getEvents } from "./utils/eventsApi";

export default async function Home() {
  const { events } = await getEvents();
  return (
    <>
      <TickpassHero />
      <TrendingEvents events={events} />
      <CategoriesSection />
    </>
  );
}
