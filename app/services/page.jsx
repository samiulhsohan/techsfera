import ServiceListing from "../../components/services/ServiceListing";
import ServiceOverview from "../../components/services/ServiceOverview";
import ServiceAccordion from "../../components/services/ServiceAccordion";

export const metadata = {
  title: "Services | Branding, UI/UX Design & Software Development",
  description:
    "Explore TechSfera's services: Branding & Identity, UI/UX Design, and Software Development. From concept to launch, we create engaging experiences that captivate users and deliver impactful results.",
  alternates: {
    canonical: "https://techsfera.com/services",
  },
  openGraph: {
    title: "Services | Branding, UI/UX Design & Software Development",
    description:
      "Explore TechSfera's services: Branding & Identity, UI/UX Design, and Software Development.",
    url: "https://techsfera.com/services",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "TechSfera Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Branding, UI/UX Design & Software Development",
    description:
      "Explore TechSfera's services: Branding & Identity, UI/UX Design, and Software Development.",
    images: ["/images/og-image.png"],
  },
};

export default async function ServicesPage() {
  return (
    <>
      <ServiceListing />
      <ServiceOverview />
      <ServiceAccordion />
    </>
  );
}
