import { VideoScrubHero } from "@/components/hero/video-scrub-hero";
import { Mission } from "@/components/sections/mission";
import { Collection } from "@/components/sections/collection";
import { Teams } from "@/components/sections/teams";
import { Ambassadors } from "@/components/sections/ambassadors";

export default function Home() {
  return (
    <>
      <VideoScrubHero />
      <Mission />
      <Collection />
      <Teams />
      <Ambassadors />
    </>
  );
}
