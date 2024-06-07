import React, { useRef } from "react";
import bannar from "../../Assets/Image/Header.png";
import SectionOne from "../../Components/Home/SectionOne";
import SectioTwo from "../../Components/Home/SectionTwo";
import SectionThree from "../../Components/Home/SectionThree";
import SectionFour from "../../Components/Home/SectionFour";
import Footer from "../../Components/Home/Footer";
import SectionFive from "../../Components/Home/SectionFive";

export default function Home() {

  function sectionThree(){
    const divElement = document.getElementById('sectionThree');
    divElement.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div  id="homepage">
      <div className="mt-[-5rem] ">
        <div className="relative overflow-hidden  md:h-[100%] sm:h-[40rem]">
          <div className="w-full h-full absolute  opacity-70 blur-sm bg-[#000000]"></div>
          <div className="absolute top-0 -inset-full h-full w-full z-5 block transform bg-gradient-to-r from-transparent to-white opacity-40 animate-shine" />

          <img
            className="w-full h-full object-fill "
            alt="home_bannar mea"
            src={bannar}
          ></img>
        </div>
        <div className="absolute sm:top-[8rem] md:top-60 h-10 w-full ">
          <div>
            <div>
              <div className="text-center text-white ">
                <span className="italic font-[700] font-poppinsBold sm:text-[17px] md:text-[50px]">
                  <h2 className="text-blue-500 drop-shadow-md">
                  SMART CONSTRUCTION SOLUTIONS
                    {/* MODERN <span className="text-yellow-400">ENGINEERS</span> &
                    ARCHITECTS <span className="text-yellow-400">LTD</span> */}
                  </h2>
                </span>

                <h2 className="mt-2 font-opensans sm:text-[20px] md:text-[35px] font-[600]">
                  Where creativity mixes with innovations
                </h2>
              </div>

              <div className="m-auto w-full flex justify-center mt-10 ">
                <span onClick={sectionThree}  className="cursor-pointer px-[7rem] py-2 bg-yellow-400 font-[700] md:text-[35px] rounded-md font-poppins">
                  <h2 >See More</h2>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionOne></SectionOne>
      <SectioTwo></SectioTwo>
      <SectionThree></SectionThree>
      <SectionFour></SectionFour>
      <Footer></Footer>
    </div>
  );
}
