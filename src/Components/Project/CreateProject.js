import { Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProject } from "../../redux/slices/project";

export default function CreateProject({ handleReFetch }) {
  const dispatch = useDispatch();
  const { companyList } = useSelector((state) => state.company);
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [siteEngName,setSiteEngName] = useState();
  const [siteEngContact,setSiteEngContact] = useState();
  const [address,setAddress]= useState()


 

  const handleSave = () => {
    const data = {
      name,
     cid:company,
     site_eng_name: siteEngName,
     site_eng_phone: siteEngContact,
     address:address
    };

    dispatch(saveProject(data));
    handleReFetch();
  };



  return (
    <div>
      <div className="mt-10">
        <h1 className="text-center font-poppinsBold text-[30px]">
          Create Project
        </h1>
        <div>
          <div>
            <div className="mt-10 sm:w-[90%] md:w-[40%] flex justify-center flex-col gap-5 m-auto text-[15px] px-2 py-5">
              <div>
                <p>* Select Company</p>
                <Select
                  value={company}
                  onChange={(e) => setCompany(e)}
                  showSearch
                  className="h-[3rem] w-full"
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label.toLocaleLowerCase() ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={companyList.map((val) => {
                    return {
                      value: val.id,
                      label: val.name,
                    };
                  })}
                />
              </div>
              <div>
                <p>* Project Name</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10"
                  placeholder="Enter Project Name"
                ></Input>
              </div>
              <div>
                <p>* Project Address</p>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-10"
                  placeholder="Enter Project Address"
                ></Input>
              </div>
              <div className="mt-3">
                <p>Site Eng. Name</p>
                <Input
                value={siteEngName}
                onChange={(e)=> setSiteEngName(e.target.value)}
                  type="text"
                  className="h-[3rem] w-full  font-[700]"
                ></Input>
              </div>
              <div className="mt-3">
                <p>Site Eng. Contact</p>
                <Input
                value={siteEngContact}
                onChange={(e)=> setSiteEngContact(e.target.value)}
                  type="text"
                  placeholder="+88 010 0000 0000"
                  className="h-[3rem] w-full  font-[700]"
                ></Input>
              </div>

              {/* <div className="mt-3">
                <p>* Enter Mpa</p>
                <InputNumber
                value={mpa}
                onChange={(e)=> setMpa(e)}
                  type="number"
                  className="h-[3rem] w-full text-[20px] font-[800]"
                ></InputNumber>
              </div>
              <div className="mt-3">
                <p>* Cubic Meter</p>
                <InputNumber
                 value={cubicMeter}
                 onChange={(e)=> setCubicMeter(e)}
                  type="number"
                  className="h-[3rem] w-full text-[20px] font-[800]"
                ></InputNumber>
              </div>
              <div className="mt-3">
                <p>* CFT Quantity</p>
                <InputNumber
                value={cft}
                  disabled
                  type="number"
                  className="h-[3rem] w-full text-[20px] font-[800]"
                ></InputNumber>
              </div> */}

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
