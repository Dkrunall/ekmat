import CourseSingle4 from "@/components/course-single/CourseSingle4";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title:
    "Course Single 4 || Ekmat Gyan Jyoti - Online Learning Platform for Career Growth",
  description: "Ekmat Gyan Jyoti is India's leading online education platform offering expert-led courses, live interactive sessions, and personalized learning paths to help students and professionals advance their careers.",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="main-content pt-0">
          <CourseSingle4 />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
