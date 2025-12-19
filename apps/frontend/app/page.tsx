import TrendingEvents from "./_components/trendingEvents";
import TickpassHero from "./_components/hero";
import TickpassNavbar from "./_components/navbar";
import CategoriesSection from "./_components/categories";
import { getEvents } from "./utils/eventsApi";

export default async function Home() {
  const { events } = await getEvents();
  console.log(events, 'events on home page');
  return (
    <>
      <TickpassHero />
      <TrendingEvents events={events} />
      <CategoriesSection />
    </>
  );
}
