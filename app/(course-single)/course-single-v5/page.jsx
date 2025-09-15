import CourseSingle5 from "@/components/course-single/CourseSingle5";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title:
    "Course Single 5 || Ekmat Gyan Jyoti - Online Learning Platform for Career Growth",
  description: "Ekmat Gyan Jyoti is India's leading online education platform offering expert-led courses, live interactive sessions, and personalized learning paths to help students and professionals advance their careers.",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <div className="tf-top-bar flex items-center justify-center">
          <p>Intro price. Get UpSkill for Big Sale -95% off.</p>
        </div>
        <Header1 />
        <div className="main-content pt-0">
          <CourseSingle5 />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
