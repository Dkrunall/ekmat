import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/homes/home-1/Banner";
import BecomeInstactor from "@/components/homes/home-1/BecomeInstactor";
import Blogs from "@/components/homes/home-1/Blogs";
import Brands from "@/components/common/Brands";
import Courses from "@/components/common/Courses";
import Features from "@/components/homes/home-1/Features";
import Hero from "@/components/homes/home-1/Hero";
import Instractors from "@/components/homes/home-1/Instractors";
import Testimonials from "@/components/homes/home-1/Testimonials";
// import TopCategories from "@/components/homes/home-1/TopCategories";
// import VedantuCategories from "@/components/homes/home-1/VedantuCategories";

export const metadata = {
  title:
    "Home 1 || Ekmat Gyan Jyoti - Online Learning Platform for Career Growth",
  description: "Ekmat Gyan Jyoti is India's leading online education platform offering expert-led courses, live interactive sessions, and personalized learning paths to help students and professionals advance their careers. Join 500,000+ learners transforming their futures today.",
};
export default function HomePage1() {
  return (
    <>
      <div id="wrapper">
        {/* Removed top bar as per user request */}
        <Header1 />
        <Hero />
        {/* <TopCategories /> */}
        <div className="main-content pb-63">
          {/* Hidden "Browse Our Top Courses" section as per user request */}
          {/* <Courses /> */}
          {/* <VedantuCategories /> */}
          <Features />
          {/* Hidden "Join More Than 1 Million Learners Worldwide" section as per user request */}
          {/* <Facts /> */}
          {/* Hidden "Learn Latest Skills; Advance Your Career" section as per user request */}
          {/* <Banner /> */}
          {/* Hidden "Learn From The Best Instructors" section as per user request */}
          {/* <Instractors /> */}
          <div id="about-section">
            <BecomeInstactor />
          </div>
          <div id="testimonials-section">
            <Testimonials />
          </div>
          {/* Hidden blogs section as per user request */}
          {/* <Blogs /> */}
          {/* Hidden "Join More Than 1 Million Learners Worldwide" section as per user request */}
          {/* <Banner2 /> */}
        </div>
        <Footer1 />
      </div>
    </>
  );
}