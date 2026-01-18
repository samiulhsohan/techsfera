import Banner from "../components/home/Banner";
import MobileBannerTop from "../components/home/MobileBannerTop";

export const metadata = {
  title: "TechSfera | Digital Product Studio for Startups & Businesses",
  description:
    "TechSfera is a digital product studio building modern software, products, and brands for startups and growing businesses. From concept to launch, we create engaging experiences.",
  alternates: {
    canonical: "https://techsfera.com",
  },
  openGraph: {
    title: "TechSfera | Digital Product Studio for Startups & Businesses",
    description:
      "TechSfera is a digital product studio building modern software, products, and brands for startups and growing businesses.",
    url: "https://techsfera.com",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "TechSfera - Digital Product Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechSfera | Digital Product Studio for Startups & Businesses",
    description:
      "TechSfera is a digital product studio building modern software, products, and brands for startups and growing businesses.",
    images: ["/images/og-image.png"],
  },
};

export default async function HomePage() {
  return (
    <main>
      <MobileBannerTop margin={"78px 0 3px 0"} />
      <Banner />
    </main>
  );
}
