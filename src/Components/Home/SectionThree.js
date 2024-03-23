import React from "react";
import IconDot from "../../Assets/SVG/IconDot";
import ExOne from "../../Assets/Image/ex_one.png";
import ExTwo from "../../Assets/Image/ex_two.png";
import ExThree from "../../Assets/Image/ex_three.png";
import ExFour from "../../Assets/Image/ex_four.png";
import ExFive from "../../Assets/Image/ex_five.png";

export default function SectionThree() {
  return (
    <div  id="sectionThree">
      <div className="mt-5 bg-white py-10">
        <div className="mt-[5rem] w-full m-auto">
          <div className=" m-auto">
            <h2 className="text-center font-poppinsBold text-[30px] text-green-400">
              - Our Experties -
            </h2>
            <h2
              className="text-center tracking-wider text-[20px] font-[800]
             text-gray-500"
            >
              Expertise in Delivering Exceptional Solutions for Your Needs.
            </h2>
          </div>
        </div>

        <div
          className="md:flex md:flex-row sm:flex-col w-full md:px-[2rem] md:py-5 mt-[5rem] justify-center gap-5
          flex-wrap"
        >
          <div className="md:h-[28rem] md:w-[23rem] sm:w-[20rem] sm:m-auto md:m-0 bg-gray-200 rounded-md">
            <div className="px-1 py-1 m-auto">
              <img
                className="m-auto mt-3"
                src={ExOne}
                alt="Expertice_MEA"
              ></img>
              <h2
                className="text-center tracking-wider text-[19px] font-[800]
             text-gray-500 mt-5"
              >
                Aesthetic Exterior Design & Beautification
              </h2>
              <p className="px-3 py-2  text-justify">
                We excel in creating eye-catching exterior designs, enhancing
                buildings' visual appeal. Trust us to elevate your space with
                our expertise in aesthetic exterior design.
              </p>
            </div>
          </div>

          <div className="md:h-[28rem] md:w-[23rem] sm:w-[20rem] sm:m-auto md:m-0 bg-gray-200 rounded-md sm:mt-5 md:mt-0">
            <div className="px-1 py-1 m-auto">
              <img
                className="m-auto mt-3"
                src={ExTwo}
                alt="Expertice_MEA"
              ></img>
              <h2
                className="text-center tracking-wider text-[19px] font-[800]
             text-gray-500 mt-5"
              >
                Interior Design & Decor
              </h2>
              <p className="px-3 py-2  text-justify">
                With a keen eye for detail and a passion for creativity, we
                specialize in transforming spaces into stunning interiors that
                reflect our clients' unique style and personality.
              </p>
            </div>
          </div>

          <div className="md:h-[28rem] md:w-[23rem] sm:w-[20rem] sm:m-auto md:m-0 bg-gray-200 rounded-md sm:mt-5 md:mt-0">
            <div className="px-1 py-1 m-auto">
              <img
                className="m-auto mt-3"
                src={ExThree}
                alt="Expertice_MEA"
              ></img>
              <h2
                className="text-center tracking-wider text-[19px] font-[800]
             text-gray-500 mt-5"
              >
                RMC/BATCHING PLANT
              </h2>
              <p className="px-3 py-2  text-justify">
                We have already multiple RMC plant all over Bangladesh. MEAL
                provides wide-ranging integrated engineering services.
              </p>
            </div>
          </div>
          <div className="md:h-[28rem] md:w-[23rem] sm:w-[20rem] sm:m-auto md:m-0 bg-gray-200 rounded-md sm:mt-5 md:mt-0">
            <div className="px-1 py-1 m-auto">
              <img
                className="m-auto mt-3"
                src={ExFour}
                alt="Expertice_MEA"
              ></img>
              <h2
                className="text-center tracking-wider text-[19px] font-[800]
             text-gray-500 mt-5"
              >
                IT Sector
              </h2>
              <p className="px-3 py-2  text-justify">
                Modern Engineers & Architects Ltd. (MEAL) transforming ideas
                into technologies MEAL committed to help clients with a new
                vision, technologies and provides the best solutions and
                services.
              </p>
            </div>
          </div>

          <div className="md:h-[28rem] md:w-[23rem] sm:w-[20rem] sm:m-auto md:m-0 bg-gray-200 rounded-md sm:mt-5 md:mt-0">
            <div className="px-1 py-1 m-auto">
              <img
                className="m-auto mt-3"
                src={ExFive}
                alt="Expertice_MEA"
              ></img>
              <h2
                className="text-center tracking-wider text-[19px] font-[800]
             text-gray-500 mt-5"
              >
                Event Managment
              </h2>
              <p className="px-3 py-2  text-justify">
                Specializing in flawless event execution, we meticulously plan
                and manage every detail to create unforgettable experiences for
                our clients and their guests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
