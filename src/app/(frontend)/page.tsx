import CategoryGrid from "@/components/CategoryGrid";
import Hero from "@/components/Hero";
import LatestItemsGrid from "@/components/LatestItemsGrid";

 const Home = () => {
  return (
    <section className="flex flex-col py-4 gap-4">
      <Hero />
        <CategoryGrid />
        <LatestItemsGrid />

    </section>
  );
}

export default Home
