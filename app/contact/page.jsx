import ContactAll from "../../components/contact/ContactAll";
import MobileBannerTop from "../../components/home/MobileBannerTop";
export const metadata = {
  title: {
    default: "Contact | TechSfera",
  },
  description:
    "TechSfera is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function HomePage() {
  return (
    <>
      <ContactAll />
      <MobileBannerTop marginTop={"3px"} />
    </>
  );
}
