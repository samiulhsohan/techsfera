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
      {/* 
        Hidden form for Netlify form detection.
        Netlify parses the pre-rendered HTML at build time to detect forms.
        This hidden form must have the same name and fields as the JavaScript form.
      */}
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        hidden
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="service" />
        <input type="text" name="timeline" />
        <textarea name="description"></textarea>
      </form>

      <ContactAll />
      <MobileBannerTop marginTop={"3px"} />
    </>
  );
}
