import React from "react";

function HomeSection5() {
    return (
        <div className="boxedContainer w-full py-4  h-auto  overflow-x-hidden bg-emerald-500 ">
            <div className="  md:h-[500px] border rounded-sm h-[300px]">
                <iframe
                    src="https://www.youtube.com/embed/PyqLdTt95Kw?si=ytQEdEKE6UtdUh8J"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                    className="w-full h-full"
                ></iframe>
            </div>
        </div>
    );
}

export default HomeSection5;
