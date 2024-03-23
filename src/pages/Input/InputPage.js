import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, InputNumber, Select } from "antd";
import { companies, projects } from "../../utils/dummyData";
import IconExit_left from "../../Assets/SVG/IconExit_Left";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveSells } from "../../redux/slices/sells";

function InputPage(props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { companyList } = useSelector((state) => state.company);
  const [company, setCompany] = useState([]);
  const [project, setProjects] = useState([]);
  const [projectId, setProjectId] = useState();
  const [mpa, setMpa] = useState();
  const [cubicMeter, setCubicMeter] = useState();
  const [cft, setCft] = useState();
  const [sand, setSand] = useState();
  const [cement, setCement] = useState();
  const [stone, setStone] = useState();
  const [admixer, setAdmixer] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    setCft((cubicMeter * 35.315).toFixed(2));
  }, [mpa, cubicMeter, cft]);

  useEffect(() => {
    setCompany(companyList);
  }, [companyList]);

  useEffect(()=>{
    const data= project.find((val)=> val.id=== projectId)
    console.log(data)
    setMpa(data?.mpa)
    setCubicMeter(data?.cubic_meter)
    // setCft(data?.cft_quantity)
    
  },[projectId])

  console.log(project)

  useEffect(() => {
    setProjectId();

    const data = companyList?.find((val) => val.id === company);
    console.log(data?.projects);
    if (data) {
      setProjects(data?.projects);
    } else {
      setProjects([]);
    }

    // setProjects(data[0].projects)
  }, [company]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChange = (date, dateString) => {
    setDate(date);
  };

  const handleSave = () => {
    const data = {
      sell_date: date,
      cid: company,
      pid: projectId,
      mpa,
      cubic_meter: cubicMeter,
      stone,
      sand,
      cement,
      admixer,
      cft_quantity: cft,
    };
    dispatch(saveSells(data));
  };

  return (
    <div>
      <div className="px-2 py-2  sm:w-full m-auto">
        <div className="py-5 bg-slate-100">
          <div
            onClick={() => navigate(-1)}
            className="absolute md:px-2 py-2 cursor-pointer  md:mt-0"
          >
            <IconExit_left height="2rem" width="2rem"></IconExit_left>
          </div>
          <h1 className="text-center text-[30px]">Sell Production Ratio</h1>

          <div
            className="m-auto w-full
                 mt-10  flex justify-center"
          >
            <div>
              <div>
                <p>* Select a Date</p>
                <DatePicker className="w-full h-[3rem]" onChange={onChange} />
              </div>

              <div className="flex-col gap-3  mt-5">
                <div>
                  <p>* Enter Company Name</p>
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
                <div className="mt-3">
                  <p>* Enter Project Name</p>
                  <Select
                    value={projectId}
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
          </div>

          <div className="w-full px-3 py-3 flex justify-center">
            <Button onClick={handleSave} className="px-10 m-auto">
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputPage;
