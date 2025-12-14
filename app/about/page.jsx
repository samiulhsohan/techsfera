import CaseStudy from "../../components/caseStudy/CaseStudy";
import AboutTop from "../../components/about/AboutTop";
import AboutSuccess from "../../components/about/AboutSuccess";
import Partners from "../../components/about/Partners";
import AboutSlider from "../../components/about/AboutSlider";
import MobileBannerTop from "../../components/home/MobileBannerTop";


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
            <AboutTop/>
            <AboutSuccess/>
            <Partners/>
            <AboutSlider/>
            <MobileBannerTop marginTop={'3px'}/>
        </>
    );
}
