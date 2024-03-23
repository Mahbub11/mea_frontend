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
  const [mpa, setMpa] = useState(0);
  const [cubicMeter, setCubicMeter] = useState(0);
  const [cft, setCft] = useState(0);


  useEffect(() => {
    setCft(35.315 * cubicMeter);
  }, [cubicMeter, mpa]);
  useEffect(() => {
    setName(data.name);
    setMpa(data.mpa);
    setCubicMeter(data.cubic_meter);
    setCft(data.cft_quantity);
    setCompany(data.company.id);
  }, [busy, data]);

  const handleEdit = () => {
    data = {
      id: data.id,
      name: name,
      mpa,
      cubic_meter: cubicMeter,
      cft_quantity: cft,
      cid: company,
    };

    console.log(data);

    dispatch(updateProject(data));
    setName();
    setMpa();
    setCft();
    setCubicMeter();
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
                <p>* Enter Mpa</p>
                <InputNumber
                  value={mpa}
                  onChange={(e) => setMpa(e)}
                  type="number"
                  className="h-[3rem] w-full text-[20px] font-[800]"
                ></InputNumber>
              </div>
              <div className="mt-3">
                <p>* Cubic Meter</p>
                <InputNumber
                  value={cubicMeter}
                  onChange={(e) => setCubicMeter(e)}
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
