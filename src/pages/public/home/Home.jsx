import React, { useMemo, Suspense } from "react";
import HomeHeroSlider from "./components/HomeHeroSlider";
import Second_Slider from "./components/Second_Slider";
import Banner1 from "../../../assets/images/slider/SF_BNNR_1920X1080.jpg_1.jpg";
import Banner2 from "../../../assets/first_slider_images/2.jpg";
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
    // Regal & Elegant “”
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
                heading: "Regal & Elegant",
                subheading: "Modern Roots in Classic Weaves",
                paragraph:
                    "Woven like royalty, draped like destiny—this Katan silk saree is a crown passed down in threads.",
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
                image: Slide2Banner2,
                heading: "Silk That Dances in Duo",
                subheading: "Modern Roots in Classic Weaves",
                paragraph:
                    "Draped in pure Katan silk, two muses mirror grace and grandeur. Their synchronized style whispers tales of heritage in every fold",
            },
            {
                image: Slide2Banner1,
                heading: "Tie me to my roots,Dye me in drama",
                subheading: "Handwoven Elegance",
                paragraph:
                    "A riot of color wrapped in centuries of tradition—Bandhej is your cultural comeback. Drape it, flaunt it, remix it—because heritage never goes out of style",
            },
        ],
        []
    );

    return (
        <div className="w-full h-full ">
            {/* Hero Slider */}
            <HomeHeroSlider sliderData={sliderData1} />

            {/* Sections */}
            <Suspense fallback={<Loader />} >
                <Home3Grid />
                <HomeVideo />
                <Home2BigGrid />
            </Suspense>

            <div className="py-4">
                <Second_Slider textPosition={true} sliderData={sliderData2} />
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
