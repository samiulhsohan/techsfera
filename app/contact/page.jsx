import ContactAll from "../../components/contact/ContactAll";
import MobileBannerTop from "../../components/home/MobileBannerTop";

export const metadata = {
  title: "Contact Us | Start Your Project with TechSfera",
  description:
    "Get in touch with TechSfera for your next digital product. Book a free consultation today and let us help you achieve your goals and elevate your digital presence.",
  alternates: {
    canonical: "https://techsfera.com/contact",
  },
  openGraph: {
    title: "Contact Us | Start Your Project with TechSfera",
    description:
      "Get in touch with TechSfera for your next digital product. Book a free consultation today.",
    url: "https://techsfera.com/contact",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact TechSfera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Start Your Project with TechSfera",
    description:
      "Get in touch with TechSfera for your next digital product. Book a free consultation today.",
    images: ["/images/og-image.png"],
  },
};

export default async function ContactPage() {
  return (
    <>
      <ContactAll />
      <MobileBannerTop margin={"3px 0 0 0"} />
    </>
  );
}
