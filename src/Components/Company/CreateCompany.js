import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveCompany } from "../../redux/slices/company";

export default function CreateCompany({handleReFetch}) {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [description, setDescription] = useState();

  const handleSave = () => {
    const data = {
      name,
      address,
      email,
      phone,
      description,
    };

    dispatch(saveCompany(data));
    handleReFetch()
  };

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-center font-poppinsBold text-[30px]">
          Create Company
        </h1>
        <div>
          <div>
            <div className="mt-10 sm:w-[90%] md:w-[40%] flex justify-center flex-col gap-5 m-auto text-[15px] px-2 py-5">
              <div>
                <p>* Company Name</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10"
                  placeholder="Enter Company Name"
                ></Input>
              </div>

              <div>
                <p>* Company Description(optional)</p>
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="h-10"
                  placeholder="Enter Company Description"
                ></TextArea>
              </div>

              <div>
                <p>* Company Address(optional)</p>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-10"
                  placeholder="Enter Company Address"
                ></Input>
              </div>
              <div>
                <p>* Company Email(optional)</p>

                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter Company Email"
                  className="h-10"
                ></Input>
              </div>

              <div>
                <p>* Company Contact(optional)</p>

                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-10"
                  placeholder="+88 000 00000"
                ></Input>
              </div>

              <button
                onClick={handleSave}
                className="cursor-pointer hover:bg-blue-300 px-2 py-2 border-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
