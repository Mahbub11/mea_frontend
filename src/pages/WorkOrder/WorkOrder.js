import { Button, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkOrderModal from "../../Components/WorkOrder/WorkOrderModal";
import CreateWorkOrder from "../../Components/WorkOrder/CreateWorkOrder";
import { resetWorkOrderData } from "../../redux/slices/workOrder";

export default function WorkOrder() {
  const dispatch = useDispatch();
  const { companyList } = useSelector((state) => state.company);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [company, setCompany] = useState();
  const [project, setProjects] = useState([]);
  const [projectId, setProjectId] = useState();
  const [companyInfo, setCompanyInfo] = useState();
  const [projectInfo, setProjectInfo] = useState();
  const [mpa, setMpa] = useState();
  const [cubicMeter, setCubicMeter] = useState();
  const [cft, setCft] = useState();
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };
  const [showWorkOrderModal, setShowWorkOrderModal] = useState(false);
  const [workOrderData, setworkOrderData] = useState();

  useEffect(() => {
    setCft((cubicMeter * 35.315).toFixed(2));
  }, [mpa, cubicMeter, cft]);

  useEffect(() => {
    setCompany(companyList);
  }, [companyList]);

  useEffect(() => {
    setProjectId();
    const data = companyList?.find((val) => val.id === company);
    if (data) {
      setCompanyInfo(data);
      setProjects(data?.projects);
    } else {
      setProjects([]);
    }

    // setProjects(data[0].projects)
  }, [company]);

  const createWorkOrder = (id) => {
    dispatch(resetWorkOrderData())
    const data={
      company:companyInfo,
      project:project.filter(val=> val.id===projectId)[0]
    }
    setworkOrderData(data);
    setShowWorkOrderModal(true);
  };

  const workOrderModal = () => {
    setShowWorkOrderModal(false);
  };

  const workOrderModalActivity=()=>{
    window.location.reload()
    setShowWorkOrderModal(false)
      dispatch(resetWorkOrderData())
  }


  return (
    <div className="mt-10 ">
      <div>
        <h1 className="text-center text-[30px] font-poppinsBold">Work Order</h1>

        <div className="w-full m-auto  px-2 py-10 ">
          <div className="flex justify-center">
            <div className="flex flex-col gap-2 md:w-[50%] sm:w-[90%]">
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
            </div>
          </div>
        </div>

        <Button
          onClick={createWorkOrder}
          className="m-auto flex justify-center border-blue-400"
        >
          Create Work Order
        </Button>
      </div>

      <div>
        <Modal
          style={config}
          footer={null}
          maskClosable={false}
          closable={true}
          width="md:w-[100%] sm:w-full"
          open={showWorkOrderModal}
          onCancel={workOrderModalActivity}
          className=" top-[1rem] m-auto z-10"
        >
          <div>
            <CreateWorkOrder
              handleInvoiceReFetch={workOrderModal}
              workOrderData={workOrderData}
            ></CreateWorkOrder>
          </div>
        </Modal>
      </div>
    </div>
  );
}
