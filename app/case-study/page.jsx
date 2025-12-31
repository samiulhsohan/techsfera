import CaseStudy from "../../components/caseStudy/CaseStudy";
import Footer from "../../components/home/Footer";
import MobileBannerTop from "../../components/home/MobileBannerTop";

export const metadata = {
  title: {
    default: "Case Study | TechSfera",
  },
  description:
    "TechSfera is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function HomePage() {
  return (
    <>
      <CaseStudy />
      <MobileBannerTop marginTop={"3px"} />
      <div style={{ marginTop: "3px" }}>
        <Footer />
      </div>
    </>
  );
}
