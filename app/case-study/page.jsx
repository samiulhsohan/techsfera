import CaseStudy from "../../components/caseStudy/CaseStudy";
import MobileBannerTop from "../../components/home/MobileBannerTop";

export const metadata = {
  title: "Case Studies | Our Work & Portfolio",
  description:
    "Explore TechSfera's portfolio of mobile apps, dashboards, and digital products for startups. See how we transform ideas into engaging digital experiences.",
  alternates: {
    canonical: "https://techsfera.net/case-study",
  },
  openGraph: {
    title: "Case Studies | Our Work & Portfolio",
    description:
      "Explore TechSfera's portfolio of mobile apps, dashboards, and digital products for startups.",
    url: "https://techsfera.net/case-study",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "TechSfera Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Our Work & Portfolio",
    description:
      "Explore TechSfera's portfolio of mobile apps, dashboards, and digital products for startups.",
    images: ["/images/og-image.png"],
  },
};

export default async function CaseStudyPage() {
  return (
    <>
      <CaseStudy />
      <MobileBannerTop margin={"0"} />
    </>
  );
}
