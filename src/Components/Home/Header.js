import React from "react";
import smartLogo from "../../Assets/Logo/smartConsLogo.jpeg";

export default function Header() {
  function homePage() {
    const divElement = document.getElementById("homepage");
    divElement.scrollIntoView({ behavior: "smooth" });
  }
  function sectionOne() {
    const divElement = document.getElementById("sectionOne");
    divElement.scrollIntoView({ behavior: "smooth" });
  }

  function sectionThree() {
    const divElement = document.getElementById("sectionThree");
    divElement.scrollIntoView({ behavior: "smooth" });
  }
  function sectionFour() {
    const divElement = document.getElementById("sectionFour");
    divElement.scrollIntoView({ behavior: "smooth" });
  }
  function footer() {
    const divElement = document.getElementById("footer");
    divElement.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className=" sticky top-0 z-50 font-poppins">
      <div
        className={`md:h-[70px] sm:h-[50px] 
       bg-[#a3a1a16c]  md:px-7 sm:px-2 shadow-md w-full  m-auto border-none`}
      >
        {/* <div className="w-full h-[70px] absolute blur-sm bg-red-500"></div> */}
        <div className="w-full px-2 py-2 flex justify-between">
          <img
            alt="smartConstructionLogo"
            className="sm:w-[2rem] md:w-[3.5rem] sm:h-[2rem] md:h-[3.5rem] rounded-full"
            src={smartLogo}
          ></img>

          <div
            className="flex sm:gap-2 md:gap-10 justify-center m-auto sm:text-[12px] 
          md:text-[20px] font-[700] text-white"
          >
            <h2
              onClick={homePage}
              className="cursor-pointer  relative after:bg-yellow-300 after:absolute after:h-1 after:w-0
             after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 hover:text-yellow-300"
            >
              Home
            </h2>
            <h2
              onClick={sectionOne}
              className="cursor-pointer  relative after:bg-yellow-300 after:absolute after:h-1 after:w-0
              after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 hover:text-yellow-300"
            >
              About
            </h2>
            <h2
              onClick={sectionFour}
              // href="#componentToScrollTo"
              className="cursor-pointer  relative after:bg-yellow-300 after:absolute after:h-1 after:w-0
              after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 hover:text-yellow-300 "
            >
              Project
            </h2>
            <h2
              onClick={sectionThree}
              className="cursor-pointer  relative after:bg-yellow-300 after:absolute after:h-1 after:w-0
              after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 hover:text-yellow-300 "
            >
              Experties
            </h2>
            <h2
              onClick={footer}
              className="cursor-pointer  relative after:bg-yellow-300 after:absolute after:h-1 after:w-0
              after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 hover:text-yellow-300 "
            >
              Contact
            </h2>
          </div>

          {/* <div>
            <div className="w-[5rem]"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
