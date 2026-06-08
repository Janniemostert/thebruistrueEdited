import HeroSection from "../components/home/HeroSection";
import FeaturedSection from "../components/home/FeaturedSection";
import ValuesSection from "../components/home/ValuesSection";
import TestimonialSection from "../components/home/TestimonialSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div>
      <FeaturedSection />
      <HeroSection />
      <ValuesSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}