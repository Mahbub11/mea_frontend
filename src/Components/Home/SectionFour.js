import React from "react";
import IconDot from "../../Assets/SVG/IconDot";
import pOne from "../../Assets/Image/p_one.png";
import pTwo from "../../Assets/Image/p_two.png";
import pThree from "../../Assets/Image/p_three.png";
import pFour from "../../Assets/Image/p_four.png";
import pFive from "../../Assets/Image/p_five.png";
import pSix from "../../Assets/Image/p_six.png";
import pSeven from "../../Assets/Image/p_seven.png";
import pEight from "../../Assets/Image/p_eight.png";
import pNine from "../../Assets/Image/p_nine.png";

export default function SectionFour() {
  return (
    <div  id="sectionFour">
      <div className="mt-5 bg-white py-[5rem]">
        <div className="mt-[5rem] w-full m-auto">
          <div className=" m-auto">
            <h2 className="text-center font-poppinsBold text-[30px] text-green-400">
              - Latest Projects -
            </h2>
            <h2
              className="text-center tracking-wider text-[20px] font-[800]
             text-gray-500"
            >
              Exploring Our Latest Projects Innovating for Tomorrow's Success.
            </h2>
          </div>
        </div>

        <div className="md:flex md:flex-row sm:flex-col w-full md:px-[5rem] sm:px-5 md:py-5 sm:py-3 mt-[5rem] justify-between gap-3">
          <div>
            <img src={pOne} alt="mea_project_one"></img>
          </div>
          <div>
            <img src={pTwo} alt="mea_project_one"></img>
          </div>
          <div>
            <img src={pThree} alt="mea_project_one"></img>
          </div>
        </div>
        <div className="md:flex md:flex-row sm:flex-col w-full md:px-[10rem] sm:px-5 md:py-3 sm:py-3 mt-2 justify-between gap-3">
          <div>
            <img src={pFour} alt="mea_project_one"></img>
          </div>
          <div>
            <img src={pFive} alt="mea_project_one"></img>
          </div>
          <div>
            <img src={pSix} alt="mea_project_one"></img>
          </div>
        </div>

        <div className="md:flex md:flex-row sm:flex-col w-full md:px-[5rem] md:py-5 sm:px-5 sm:py-3 mt-2 justify-between gap-3">
          <div>
            <img src={pSeven} alt="mea_project_one"></img>
          </div>
          <div>
            <img src={pEight} alt="mea_project_one"></img>
          </div>
          <div>
            <img src={pNine} alt="mea_project_one"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
