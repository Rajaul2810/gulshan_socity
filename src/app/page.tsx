
import Hero from "@/Components/Home/Hero";
import Services from "@/Components/Home/Services";
import Events from "@/Components/Home/Events";
import Media from "@/Components/Home/Media";
import TeamStats from "@/Components/Home/TeamStats";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Events />
      <TeamStats />
      <Media />
    </div>
  );
}
