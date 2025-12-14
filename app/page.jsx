import Fonts from "../components/Fonts";
import Banner from "../components/home/Banner";
import MobileBannerTop from "../components/home/MobileBannerTop";


export const metadata = {
    title: {
        default: "TechSfera",
    },
    description:
        "TechSfera is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function HomePage() {


    return (
        <main>
            <MobileBannerTop marginTop={'78px'}/>
            <Banner/>
        </main>
    );
}
