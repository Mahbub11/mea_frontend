import React from "react";
import One from "../../Assets/Image/partner_one.png";
import Two from "../../Assets/Image/partner_two.png";
import Three from "../../Assets/Image/partner_three.png";
import Four from "../../Assets/Image/partner_4.png";
import Five from "../../Assets/Image/partner_five.png";
import Six from "../../Assets/Image/partner_six.png";
import Seven from "../../Assets/Image/partner_seven.png";
import Eight from "../../Assets/Image/partner_eight.png";

export default function SectioTwo() {
  return (
    <div id="componentToScrollTo">
      <div className="mt-5 bg-gray-50 py-10  top-0 sticky">
        <div className="py-[3rem] w-full m-auto">
          <div className=" m-auto">
            <h2 className="text-center font-poppinsBold text-[30px] text-green-400 ">
              - Our Involments -
            </h2>
            <h2
              className="text-center tracking-wide text-[20px] font-[800]
             text-gray-500"
            >
              Engaging Partnerships Drive Success in Collaborative Ventures.
            </h2>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex gap-5 flex-wrap px-[5rem] justify-between">
            <img className="w-[20rem] h-[5rem]" src={One} alt="one"></img>
            <img className="w-[20rem] h-[5rem]" src={Two} alt="one"></img>
            <img className="w-[15rem] h-[7rem]" src={Three} alt="one"></img>
            <img className="w-[10rem] h-[7rem]" src={Four} alt="one"></img>
          </div>
          <div className="flex gap-3 flex-wrap px-[5rem] mt-10 justify-between">
            <img className="w-[15rem] h-[5rem]" src={Five} alt="one"></img>
            <img className="w-[15rem] h-[5rem]" src={Six} alt="one"></img>
            <img className="w-[15rem] h-[7rem]" src={Seven} alt="one"></img>
            <img className="w-[13rem] h-[7rem]" src={Eight} alt="one"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
