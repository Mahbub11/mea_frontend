import { LoadingOutlined } from "@ant-design/icons";
import { Input, Spin, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(false);
  const [email, setEmail] = useState(false);
  const navigate = useNavigate();

  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "topRight",
    });
  };

  const handleSignIn = async () => {
    if (email && password) {
      if (ValidateEmail(email)) {
        // console.log(email, password, name, passwor2);
      }
      setLoading(true);

      if(email==='admin@mea.com' && password==='123456'){
        navigate("/app");
        window.location.reload(true);

      }
    } else {
      openNotification("error", "Error !", "All field Rquired");
    }
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    openNotification("error", "Error !", "Invalid email address");
    return false;
  }
  return (
    <div>
      {contextHolder}
      <div className="md:pt-[3rem]">
        <h2 className="font-poppinsBold text-[30px] text-center">Login</h2>
        <div className="mt-5 flex justify-center">
          <div className="md:w-[30%] flex flex-col gap-3 justify-center items-center">
            <Input
              type="text"
              name="email"
              pattern=".*@.*\..*"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your E-mail Address"
              className=" h-[3rem] w-full shadow-sm rounded-md px-2 py-2"
            ></Input>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className=" h-[3rem] w-full shadow-sm rounded-md px-2 py-2"
            ></Input>

            <div className={`${loading ? "block" : "hidden"} mt-5`}>
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                    }}
                    spin
                  />
                }
              />
            </div>

            <button
              onClick={handleSignIn}
              className={`${
                loading ? "hidden" : "block"
              } bg-[#15B13F] w-full h-[3rem] md:mt-[1rem] rounded-md text-white font-[500]"`}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
