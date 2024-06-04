import React from "react";
import IconDot from "../../Assets/SVG/IconDot";
// import AboutUs from "../../Assets/SVG/AboutUs";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AchievementOne from "../../Assets/Image/achievement_one.png";
import AchievementTwo from "../../Assets/Image/achievement_two.png";
import AchievementThree from "../../Assets/Image/achievement_three.png";
import Civil from "../../Assets/Logo/civil.png";
import MES from "../../Assets/Logo/mes.png";
import NasirConLogo from "../../Assets/Logo/nasir.png";
import MEALLogo from "../../Assets/Logo/meaLogo.png";
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";
import { LIVE_URL } from "../../config";

export default function Footer() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  return (
    <div id="footer">
      <div className="w-full py-10 bg-black mt-[25rem] -z-10 ">
        <div>
          <div
            className=" bg-[#E4E4E4] h-auto md:py-[2rem] sm:py-3 sm:w-[95%] md:w-[80%]  m-auto mt-[-20rem] absolute left-0
           right-0 z-10 rounded-md"
          >
            <div className="w-full m-auto mt-3">
              <div className="m-auto">
                <h2 className="text-center font-poppinsBold sm:text-[25px] md:text-[30px] text-green-400">
                  - Our Achivments -
                </h2>
                <h2
                  className="text-center tracking-wider md:text-[20px] font-[800]
             text-gray-500"
                >
                  Highlighting milestones, we celebrate our achievements with
                  pride.
                </h2>
              </div>
            </div>

            <div
              className="overflow-hidden
              w-full sm:text-justify md:text-left mt-10 "
              ref={emblaRef}
            >
              <div className="w-full justify-center sm:w-full flex gap-10 px-10">
                <div className="sm:ml-[1rem] md:ml-0 ">
                  <div className="h-auto md:w-[20rem] sm:w-[21rem]">
                    <img
                      className="md:h-[25rem] md:w-[20rem] sm:h-[17rem] sm:w-[20rem]
                      sm:m-auto md:m-0 rounded-md"
                      alt="writing evaluation duoling"
                      src={AchievementOne}
                    ></img>
                  </div>
                </div>

                <div className=" ml-[3rem] ">
                  <div className="h-auto md:w-[20rem] sm:w-[21rem]">
                    <img
                      className="md:h-[25rem] md:w-[20rem] sm:h-[17rem] sm:w-[20rem]
                      sm:m-auto md:m-0 rounded-md"
                      alt="writing evaluation duoling"
                      src={AchievementTwo}
                    ></img>
                  </div>
                </div>
                <div className="ml-[3rem] ">
                  <div className="h-auto md:w-[20rem] sm:w-[21rem]">
                    <img
                      className="md:h-[25rem] md:w-[20rem] sm:h-[17rem] sm:w-[20rem]
                      sm:m-auto md:m-0 rounded-md"
                      alt="writing evaluation duoling"
                      src={AchievementThree}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-10">
          <div
            className="md:flex md:flex-row sm:flex sm:flex-col gap-5 
          justify-around text-white sm:pt-[12rem] md:pt-[25rem]"
          >
            <div className="  sm:self-center md:mb-[2.2rem]">
              <div className="flex flex-col ">
                <h2 className="font-poppinsBold text-[25px] underline">
                 Mother Company
                </h2>
                <img
                  className="rounded-md md:m-0 sm:m-auto md:mt-5 sm:mt-5 w-[8rem] h-[8rem] mt-5"
                  alt="smartLogo"
                  src={MEALLogo}
                ></img>
              </div>
            </div>

            <div className="  sm:self-center md:mb-[2.2rem]">
              <div className="flex flex-col ">
                <h2 className="font-poppinsBold text-[25px] underline">
                  Sister Concern
                </h2>
                <img
                  className="rounded-md md:m-0 sm:m-auto md:mt-5 sm:mt-5 w-[8rem] h-[8rem] mt-5"
                  alt="smartLogo"
                  src={NasirConLogo}
                ></img>
              </div>
            </div>

            <div className="">
              <div className="flex flex-col ">
                <h2 className="font-poppinsBold text-[25px] sm:text-center underline ">
                  Affiliation with…
                </h2>
                <div className="flex gap-3 mt-5">
                  <img
                    className="rounded-full md:m-0 sm:m-auto sm:w-[5rem] sm:h-[5rem] md:w-[8rem] md:h-[8rem] mt-5"
                    alt="smartLogo"
                    src={MES}
                  ></img>
                  <img
                    className="rounded-full sm:m-auto sm:w-[6rem] sm:h-[5rem]  md:w-[8rem] md:h-[8rem] mt-5"
                    alt="smartLogo"
                    src={Civil}
                  ></img>
                </div>
              </div>
            </div>

            <div className="sm:hidden md:block mb-[3rem] self-end">
              <h2 className="font-poppinsBold text-[25px] underline">
                Services
              </h2>
              <h2 className="mt-5">Aesthetic Exterior Design</h2>
              <h2>Interior Design</h2>
              <h2>BATCHING PLANT</h2>
              <h2>IT Sector</h2>
              <h2>Event Managment</h2>
            </div>
            <div className=" mb-[4rem] md:self-end sm:self-center">
              <h2 className="font-poppinsBold text-[25px] underline md:text-left sm:text-center sm:mt-5 md:mt-0">
                Contact
              </h2>
              <span className="flex gap-2 mt-5">
                <span className="mt-[-4px]">
                  {" "}
                  <HomeOutlined></HomeOutlined>
                </span>
                <h2 className="">
                  46, Kazi Nazrul Islam Avenue (3rd Floor) <br></br> Kawran
                  Bazar, Dhaka-1215, Bangladesh
                </h2>
              </span>
              <span className="flex gap-2">
                <span>
                  <PhoneOutlined></PhoneOutlined>
                </span>
                <h2 className="mt-[3px]">+8801711-506484</h2>
              </span>
              <span className="flex gap-2">
                <span>
                  <MailOutlined></MailOutlined>
                </span>
                <h2 className="mt-[3px]">info@scs.com</h2>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
