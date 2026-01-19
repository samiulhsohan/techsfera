import AboutSlider from "../../components/about/AboutSlider";
import AboutSuccess from "../../components/about/AboutSuccess";
import AboutTop from "../../components/about/AboutTop";
import Partners from "../../components/about/Partners";
import MobileBannerTop from "../../components/home/MobileBannerTop";

export const metadata = {
  title: "About Us | Dhaka-Based Digital Product Studio",
  description:
    "Learn about TechSfera, a Dhaka-based product studio engineering digital solutions for businesses worldwide. We fuse high-end design with powerful code to build products that drive your business forward.",
  alternates: {
    canonical: "https://techsfera.net/about",
  },
  openGraph: {
    title: "About Us | TechSfera - Dhaka-Based Digital Product Studio",
    description:
      "Learn about TechSfera, a Dhaka-based product studio engineering digital solutions for businesses worldwide.",
    url: "https://techsfera.net/about",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "About TechSfera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | TechSfera - Dhaka-Based Digital Product Studio",
    description:
      "Learn about TechSfera, a Dhaka-based product studio engineering digital solutions for businesses worldwide.",
    images: ["/images/og-image.png"],
  },
};

export default async function AboutPage() {
  return (
    <>
      <AboutTop />
      <AboutSuccess />
      <Partners />
      <AboutSlider />
      <MobileBannerTop margin={"3px 0 0 0"} />
    </>
  );
}
