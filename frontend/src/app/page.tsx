import ADBanner from "@/components/ad-banner";
import Benefits from "@/components/modules/home/benefits";
import FeaturedCourses from "@/components/modules/home/featured-courses";
import Intro from "@/components/modules/home/intro";
import LatestArticles from "@/components/modules/home/latest-articles";
import Metrics from "@/components/modules/home/metrics";
import StartNow from "@/components/modules/home/start-now";
import StudentsFeedback from "@/components/modules/home/students-feedback";
import TopCategories from "@/components/modules/home/top-categories";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <Intro />

      <TopCategories />

      <FeaturedCourses />

      <ADBanner />

      <Metrics />

      <Benefits />

      <StudentsFeedback />

      <StartNow />

      <LatestArticles />
    </main>
  );
}
