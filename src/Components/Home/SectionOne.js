import React from "react";
import IconDot from "../../Assets/SVG/IconDot";
// import AboutUs from "../../Assets/SVG/AboutUs";
import AboutUsOne from "../../Assets/Image/about_us_project.png";
import AboutUsTwo from "../../Assets/Image/about_us_project_two.png";

export default function SectionOne() {
  return (
    <div  id="sectionOne">
      <div className="mt-5 bg-white py-[5rem]">
        <div className="mt-[5rem] w-full m-auto">
          <div className=" m-auto">
            <h2 className="text-center font-poppinsBold text-[30px] text-green-400">
              - About Us -
            </h2>
            <h2
              className="text-center tracking-widest text-[40px] font-[800]
             text-gray-500"
            >
              Who We Are
            </h2>
          </div>
        </div>

        <div className="md:flex md:flex-row sm:flex-col w-full md:px-[5rem] sm:px-2 py-5 mt-[5rem] justify-between">
          <div className="md:w-[40%] sm:w-full md:text-[20px] font-poppins">
            <p>
              Modern Engineers & Architects Ltd. (MEAL) is a multi-discipline
              consultant and engineering construction firm that provides
              different types of services from preliminary planning to the ends
              of construction as a turn key solutions. <br></br> <br></br>
              Modern Engineers & Architects Ltd. (MEAL) has variety of projects
              with vast experience providing all kinds of engineering solutions
              that our country demands. We provide wide- ranging integrated
              engineering services. It is committed to help clients with a new
              vision, technologies and provides the best solutions and services.
            </p>
          </div>
          <div>
            <div className=" md:h-[450px] md:w-[580px] md:mt-[-2rem] sm:mt-5 flex flex-col justify-between">
              <div className="h-[15rem] w-[17rem] bg-green-400 rounded-md">
                <img
                  alt="meaAbout Project"
                  className="mt-5 ml-5"
                  src={AboutUsOne}
                ></img>
              </div>
              <div className="h-[15rem] w-[17rem] bg-yellow-400 rounded-md self-end md:mt-0 sm:mt-[13rem]">
                <img
                  alt="mea abot priject"
                  className="mt-[-9rem]  ml-[-1rem]"
                  src={AboutUsTwo}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
