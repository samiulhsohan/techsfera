import AboutTop from "../../components/about/AboutTop";
import AboutSuccess from "../../components/about/AboutSuccess";
import Partners from "../../components/about/Partners";
import AboutSlider from "../../components/about/AboutSlider";
import MobileBannerTop from "../../components/home/MobileBannerTop";
import Footer from "../../components/home/Footer";

export const metadata = {
  title: {
    default: "About | TechSfera",
  },
  description:
    "TechSfera is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function AboutPage() {
  return (
    <>
      <AboutTop />
      <AboutSuccess />
      <Partners />
      <AboutSlider />
      <MobileBannerTop marginTop={"3px"} />
      <div style={{ marginTop: "3px" }}>
        <Footer />
      </div>
    </>
  );
}
