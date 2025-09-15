import Blogs1 from "@/components/blogs/Blogs1";
import PageTitle from "@/components/blogs/PageTitle";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title:
    "Blog Grid || Ekmat Gyan Jyoti - Education Online Courses LMS React Nextjs Template",
  description: "Ekmat Gyan Jyoti - Education Online Courses LMS React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <div className="tf-top-bar flex items-center justify-center">
          <p>Intro price. Get Ekmat Gyan Jyoti for Big Sale -95% off.</p>
        </div>

        <Header1 />
        <PageTitle />
        <Blogs1 />
        <Footer1 parentClass="footer has-border-top" />
      </div>
    </>
  );
}