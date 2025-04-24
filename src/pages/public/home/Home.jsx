import React from "react";
import HomeHeroSlider from "./components/HomeHeroSlider";
import HomeMovingText from "./components/HomeMovingText";
import HomeSection1 from "./components/HomeSection1";
import HomeSection2 from "./components/HomeSection2";
import HomeSection3 from "./components/HomeSection3";
import HomeSection4 from "./components/HomeSection4";

function Home() {
    return (
        <div className="w-full h-full">
            <div>
                <HomeHeroSlider />
            </div>
            <div>
                <HomeMovingText />
            </div>
            {/* Section Starts */}
            {/* Section1 */}
            <div>
                <HomeSection1 />
            </div>
            {/* Section 2 */}
            <div>
                <HomeSection2 />
            </div>
            {/* Section 3 */}
            <div>
                <HomeSection3 />
            </div>
            {/* Home Section 4 */}
            <div>
                <HomeSection4 />
            </div>
        </div>
        // Moving Text
    );
}

export default Home;
