import ServiceListing from "../../components/services/ServiceListing";
import ServiceOverview from "../../components/services/ServiceOverview";
import ServiceAccordion from "../../components/services/ServiceAccordion";

export const metadata = {
  title: {
    default: "Services | TechSfera",
  },
  description:
    "TechSfera is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function HomePage() {
  return (
    <>
      <ServiceListing />
      <ServiceOverview />
      <ServiceAccordion />
    </>
  );
}
