import React from "react";
import HomeHeroSlider from "./components/HomeHeroSlider";

import HomeSection4 from "./components/HomeOnlyTwoSlideGrid";

import WhyChooseUs from "./components/WhyChooseUs";
import Home3Grid from "./components/Home3Grid";
import HomeVideo from "./components/HomeVideo";
import Home2BigGrid from "./components/Home2BigGrid";
import HomeOnlyTwoSlideGrid from "./components/HomeOnlyTwoSlideGrid";
import HomeOneImageOnly from "./components/HomeOneImageOnly";
import HomeLetsExplore from "./components/HomeLetsExplore";

function Home() {
    return (
        <div className="w-full h-full">
            <div>
                <HomeHeroSlider />
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
                <HomeHeroSlider textPosition={true} />
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
