import Hero from "@/components/Home/hero";
import Demo from "@/components/Home/demo";
import Metric from "@/components/Home/metric";
import TrackModelsThatMatter from "@/components/Home/trackModelsThatMatter";
import SearchIsShifting from "@/components/Home/searchisShifting";

export default function Home() {
  return (
    <div>
      <Hero />
      <Demo />
      <Metric />
      <TrackModelsThatMatter />
      <SearchIsShifting />
    </div>
  );
}
