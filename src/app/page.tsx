
import Hero from "@/Components/Home/Hero";
import Services from "@/Components/Home/Services";
import Events from "@/Components/Home/Events";
import Media from "@/Components/Home/Media";
import TeamStats from "@/Components/Home/TeamStats";
import News from "@/Components/Home/News";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Events />
      <News />
      <TeamStats />
      <Media />
    </div>
  );
}
