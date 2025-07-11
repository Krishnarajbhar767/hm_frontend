import React, { useMemo, Suspense } from "react";
import HomeHeroSlider from "./components/HomeHeroSlider";
import Banner1 from "../../../assets/images/slider/SF_BNNR_1920X1080.jpg_1.jpg";
import Banner2 from "../../../assets/images/slider/SF_BNNR_1920X1080.jpg_2.jpg";
import Banner3 from "../../../assets/images/slider/SF_BNNR_1920X1080.jpg_3.jpg";
import Banner4 from "../../../assets/images/slider/SF_BNNR_1920X1080_4.jpg";
import Slide2Banner1 from "../../../assets/images/slider2/SF_BNNR_1920X1080_5.jpg";
import Slide2Banner2 from "../../../assets/images/slider2/SF_BNNR_1920X1080_6.jpg";
import Loader from "../../../components/common/Loader";
// Lazy-load heavy sections
const HomeSection4 = React.lazy(() =>
    import("./components/HomeOnlyTwoSlideGrid")
);
const WhyChooseUs = React.lazy(() => import("./components/WhyChooseUs"));
const Home3Grid = React.lazy(() => import("./components/Home3Grid"));
const HomeVideo = React.lazy(() => import("./components/HomeVideo"));
const Home2BigGrid = React.lazy(() => import("./components/Home2BigGrid"));
const HomeOneImageOnly = React.lazy(() =>
    import("./components/HomeOneImageOnly")
);
const HomeLetsExplore = React.lazy(() =>
    import("./components/HomeLetsExplore")
);

// Fallback loader
// const Loader = () => <div className="py-8 text-center">Loading section...</div>;

function Home() {
    const sliderData1 = useMemo(
        () => [
            {
                image: Banner1,
                heading: "Bandhej Beauties",
                subheading: "Handwoven Elegance",
                paragraph:
                    "Born from the hands of artisans, dyed with heritage, and draped in joy—discover Bandhej sarees that brighten every moment.",
            },
            {
                image: Banner2,
                heading: "Drape Your Story",
                subheading: "Modern Roots in Classic Weaves",
                paragraph:
                    "From boardrooms to banquets, our sarees blend contemporary chic with cultural richness, made for every woman’s journey.",
            },
            {
                image: Banner3,
                heading: "Crafted with Heart",
                subheading: "From Loom to Love",
                paragraph:
                    "Each piece is more than fabric — it’s an emotion. Woven by hands, worn with pride. Discover sarees that feel like home.",
            },
        ],
        []
    );

    const sliderData2 = useMemo(
        () => [
            {
                image: Slide2Banner1,
                heading: "Grace in Every Thread",
                subheading: "Handwoven Elegance",
                paragraph:
                    "Celebrate timeless tradition with sarees that carry the legacy of skilled artisans. Every fold speaks of heritage.",
            },
            {
                image: Slide2Banner2,
                heading: "Drape Your Story",
                subheading: "Modern Roots in Classic Weaves",
                paragraph:
                    "From boardrooms to banquets, our sarees blend contemporary chic with cultural richness, made for every woman’s journey.",
            },
        ],
        []
    );

    return (
        <div className="w-full h-full">
            {/* Hero Slider */}
            <HomeHeroSlider sliderData={sliderData1} />

            {/* Sections */}
            <Suspense fallback={<Loader />}>
                <Home3Grid />
                <HomeVideo />
                <Home2BigGrid />
            </Suspense>

            <div className="boxedContainer py-4">
                <HomeHeroSlider textPosition={true} sliderData={sliderData2} />
            </div>

            <Suspense fallback={<Loader />}>
                <HomeOneImageOnly />
                <HomeSection4 />
                <HomeLetsExplore />
                <WhyChooseUs />
            </Suspense>
        </div>
    );
}

export default Home;
