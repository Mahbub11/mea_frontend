import { Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCompany } from "../../redux/slices/company";
import { updateProject } from "../../redux/slices/project";

export default function EditProject({ data, handleReFetch, closeModal }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(data.name);
  const [busy, isBusy] = useState(true);
  const { companyList } = useSelector((state) => state.company);
  const [company, setCompany] = useState();
  const [siteEngName, setSiteEngName] = useState();
  const [siteEngContact, setSiteEngContact] = useState();

  useEffect(() => {
    setName(data.name);
    setSiteEngName(data.site_eng_name);
    setSiteEngContact(data.site_eng_phone);

    setCompany(data.company.id);
  }, [busy, data]);

  const handleEdit = () => {
    data = {
      id: data.id,
      name: name,
      site_eng_name: siteEngName,
      site_eng_phone: siteEngContact,
      cid: company,
    };

    console.log(data);

    dispatch(updateProject(data));
    setName();

    handleReFetch();
  };

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-center font-poppinsBold text-[30px]">
          Edit Project
        </h1>
        <div>
          <div>
            <div
              className="mt-10 sm:w-[90%] md:w-[40%] flex justify-center flex-col gap-5
             m-auto text-[15px] px-2 py-5"
            >
              <div>
                <p>* Company</p>
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
                  placeholder=" Project Name"
                ></Input>
              </div>

              <div className="mt-3">
                <p>Site Eng. Name</p>
                <Input
                  value={siteEngName}
                  onChange={(e) => setSiteEngName(e.target.value)}
                  type="text"
                  className="h-[3rem] w-full  font-[700]"
                ></Input>
              </div>
              <div className="mt-3">
                <p>Site Eng. Contact</p>
                <Input
                  value={siteEngContact}
                  onChange={(e) => setSiteEngContact(e.target.value)}
                  type="text"
                  placeholder="+88 010 0000 0000"
                  className="h-[3rem] w-full  font-[700]"
                ></Input>
              </div>

              <button
                onClick={handleEdit}
                className="cursor-pointer hover:bg-blue-300 px-2 py-2 border-2 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
