import React, { useMemo } from "react";
import HomeHeroSlider from "./components/HomeHeroSlider";

import HomeSection4 from "./components/HomeOnlyTwoSlideGrid";

import WhyChooseUs from "./components/WhyChooseUs";
import Home3Grid from "./components/Home3Grid";
import HomeVideo from "./components/HomeVideo";
import Home2BigGrid from "./components/Home2BigGrid";
import HomeOnlyTwoSlideGrid from "./components/HomeOnlyTwoSlideGrid";
import HomeOneImageOnly from "./components/HomeOneImageOnly";
import HomeLetsExplore from "./components/HomeLetsExplore";
import Banner1 from "../../../assets/images/slider/SF_BNNR_1920X1080.jpg_1.jpg";
import Banner2 from "../../../assets/images/slider/SF_BNNR_1920X1080.jpg_2.jpg";
import Banner3 from "../../../assets/images/slider/SF_BNNR_1920X1080.jpg_3.jpg";
import Banner4 from "../../../assets/images/slider/SF_BNNR_1920X1080_4.jpg";
import Slide2Banner1 from "../../../assets/images/slider2/SF_BNNR_1920X1080_5.jpg";
import Slide2Banner2 from "../../../assets/images/slider2/SF_BNNR_1920X1080_6.jpg";
function Home() {
    const sliderData1 = useMemo(
        () => [
            {
                image: Banner1,
                heading: "Grace in Every Thread",
                subheading: "Handwoven Elegance",
                paragraph:
                    "Celebrate timeless tradition with sarees that carry the legacy of skilled artisans. Every fold speaks of heritage.",
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
            // {
            //     image: Banner3,
            //     heading: "Crafted with Heart",
            //     subheading: "From Loom to Love",
            //     paragraph:
            //         "Each piece is more than fabric — it’s an emotion. Woven by hands, worn with pride. Discover sarees that feel like home.",
            // },
        ],
        []
    );
    return (
        <div className="w-full h-full">
            <div>
                <HomeHeroSlider sliderData={sliderData1} />
            </div>

            {/* Section Starts */}
            {/* Section1 */}
            <div>
                <Home3Grid />
            </div>
            {/* Section 2 */}
            <div>
                <HomeVideo />
            </div>
            {/* Section 3 */}
            <div>
                <Home2BigGrid />
            </div>
            <div className="boxedContainer py-4">
                <HomeHeroSlider textPosition={true} sliderData={sliderData2} />
            </div>

            <div>
                <HomeOneImageOnly />
            </div>
            <div>
                <HomeOnlyTwoSlideGrid />
            </div>
            <div>
                <HomeLetsExplore />
            </div>
            <div>
                <WhyChooseUs />
            </div>
        </div>
        // Moving Text
    );
}

export default Home;
