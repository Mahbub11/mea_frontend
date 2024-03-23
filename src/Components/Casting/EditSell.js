import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, InputNumber, Select, Skeleton } from "antd";
import { companies, projects } from "../../utils/dummyData";
import IconExit_left from "../../Assets/SVG/IconExit_Left";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateSells } from "../../redux/slices/sells";
import { CloseOutlined } from "@ant-design/icons";

function EditSell({ data, handleReFetch, handleCloseModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyList } = useSelector((state) => state.company);
  const [company, setCompany] = useState([]);
  const [project, setProjects] = useState([]);
  const [companyDefault, setCompanyDefault] = useState("--");
  const [projectDefault, setProjectDefault] = useState("--");
  const [projectId, setProjectId] = useState();
  const [companyId, setCompanyId] = useState();
  const [mpa, setMpa] = useState();
  const [cubicMeter, setCubicMeter] = useState();
  const [cft, setCft] = useState();
  const [sand, setSand] = useState();
  const [cement, setCement] = useState();
  const [stone, setStone] = useState();
  const [admixer, setAdmixer] = useState();
  const [sellDate, setSellDate] = useState();
  const [busy, isBusy] = useState(true);

  useEffect(() => {
    setCompanyDefault(data.company.name);
    setProjectDefault(data.project.name);
    setMpa(data.mpa);
    setCubicMeter(data.cubic_meter);
    setCft(data.cft_quantity);
    setStone(data.stone);
    setSand(data.sand);
    setCement(data.cement);
    setAdmixer(data.admixer);
    setSellDate(data.sell_date);
    setProjectId(data.project.id);
    setCompanyId(data.company.id);
    console.log("wd");

    isBusy(false);
  }, [data]);
  useEffect(() => {
    setCft(cubicMeter * 35.315);
  }, [mpa, cubicMeter, cft]);

  useEffect(() => {
    setCompany(companyList);
  }, [companyList]);

  useEffect(() => {
    // setProjectId();
    // setProjectDefault()
    console.log(companyId);
    const data = companyList?.find(
      (val) => parseInt(val.id) === parseInt(companyId)
    );
    console.log(data?.projects);
    if (data) {
      setProjects(data?.projects);
    } else {
      setProjects([]);
    }

    // setProjects(data[0].projects)
  }, [company, companyId]);

  const onChange = (date, dateString) => {
    setSellDate(dateString);
  };

  const handleSave = () => {
    const sellEditData = {
      id: data.id,
      sell_date: sellDate,
      cid: companyId,
      pid: projectId,
      mpa,
      cubic_meter: cubicMeter,
      stone,
      sand,
      cement,
      admixer,
      cft_quantity: cft,
    };

    dispatch(updateSells(sellEditData));
    handleReFetch();
    isBusy(true);
  };

  const handleclose = () => {
    setCompanyDefault();
    setProjectDefault();
    handleCloseModal();
  };
  console.log(companyDefault);
  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div>
          <div className="flex justify-end">
            <CloseOutlined onClick={handleclose}></CloseOutlined>
          </div>
          <h2 className="font-poppinsBold text-[25px] text-center">
            Edit Casting
          </h2>

          {/* <button onClick={handleclose}>Close</button> */}

          <div className="md:w-[30%] sm:w-[40%] m-auto mt-5">
            <div>
              <div>
                <p>* Select a Date</p>
                <DatePicker
                  format="YYYY-MM-DD"
                  defaultValue={moment(sellDate)}
                  className="w-full h-[3rem]"
                  onChange={onChange}
                />
              </div>

              <div className="flex-col gap-3  mt-5">
                <div>
                  <p>* Enter Company Name</p>
                  <Select
                    defaultValue={companyDefault}
                    //   value={company.name}
                    onChange={(e) => setCompanyId(e)}
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
                <div className="mt-3">
                  <p>* Enter Project Name</p>
                  <Select
                    defaultValue={projectDefault}
                    // value={projectId}
                    onChange={(e) => setProjectId(e)}
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
                    options={project?.map((val) => {
                      return {
                        value: val.id,
                        label: val.name,
                      };
                    })}
                  />
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
                  <p>* Stone(MT)</p>
                  <InputNumber
                    value={stone}
                    onChange={(e) => setStone(e)}
                    type="number"
                    className="h-[3rem] w-full text-[20px] font-[800]"
                  ></InputNumber>
                </div>
                <div className="mt-3">
                  <p>* Sand(CFT)</p>
                  <InputNumber
                    value={sand}
                    onChange={(e) => setSand(e)}
                    type="number"
                    className="h-[3rem] w-full text-[20px] font-[800]"
                  ></InputNumber>
                </div>
                <div className="mt-3">
                  <p>* Cement(MT)</p>
                  <InputNumber
                    value={cement}
                    onChange={(e) => setCement(e)}
                    type="number"
                    className="h-[3rem] w-full text-[20px] font-[800]"
                  ></InputNumber>
                </div>
                <div className="mt-3">
                  <p>* Admixer(KG)</p>
                  <InputNumber
                    value={admixer}
                    onChange={(e) => setAdmixer(e)}
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
              </div>
            </div>
            <div className="w-full px-3 py-3 flex justify-center">
              <Button onClick={handleSave} className="px-10 m-auto">
                UPDATE
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditSell;
