import React, { useEffect, useState } from "react";
import InvoiceField from "../Invoice/InvoiceField";
import { Button, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import axiosInstance from "../../utils/axios";
import { useDispatch } from "react-redux";
import { API_LEVEL } from "../../config";
import { ShowNotification } from "../../redux/actions";

export default function InvoiceFoundItem({
  id,
  itemDes,
  m3cft,
  unit,
  unitRate,
  total_amount,
  remarks,
  pump_charge,
  vat,
  setPreviousDue,
  mainInvoiceId,
}) {
  const dispatch = useDispatch();
  const [unitCft, setUnitCft] = useState(0);
  const [totalBill, setTotal] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setUnitCft(Math.round(unit * m3cft));
    setTotal(Math.round(unitCft * unitRate));
  }, [unit, m3cft, unitRate, unitCft]);

  const addBalance = () => {
    const data = {
      id: id,
      status: 2,
      tid: mainInvoiceId,
    };
    axiosInstance
      .put(`${API_LEVEL}/sells-report/status-change`, data)
      .then((response) => {
        dispatch(
          ShowNotification({
            severity: "success",
            message: "Added to New Invoice",
          })
        );
      })

      .catch((error) => {
        console.log(error);
        dispatch(
          ShowNotification({ severity: "error", message: error.message })
        );
      });

    setPreviousDue(total_amount);
    setStatus(true);
  };

  return (
    <div className="bg-header/30 px-2 py-2 rounded-md mt-2">
      {/* <div>
        <tr className="">
          <td className="w-auto px-2 ">
            <p> Description</p>
            <Input className="font-[700]" disabled value={itemDes}></Input>
          </td>
          <td cclassName="w-auto px-2 ">
            <p> Unit(m3)</p>
            <Input className="font-[700]" value={unit} disabled></Input>
          </td>
          <td className="w-auto px-2 ">
            <p> 1m3=cft</p>
            <Input disabled className="font-[700]" value={m3cft}></Input>
          </td>
          <td className="w-auto px-2 ">
            <p> Unit(cft)</p>
            <Input value={unitCft} disabled className="font-[700]"></Input>
          </td>
          <td className="w-auto px-2 ">
            <p> Unit Rate</p>
            <Input className="font-[700]" disabled value={unitRate}></Input>
          </td>
          <td className="w-auto px-2 ">
            <p>Total Amount</p>
            <Input value={totalBill} disabled className="font-[700]"></Input>
          </td>
          <td className="w-auto px-2 ">
            <p>Remarks</p>
            <TextArea
              className="font-[700] text-red-300"
              value={remarks}
              id={id}
              name="remarks"
              rows={1.9}
            />
          </td>
          <td className="w-auto px-2 ">
          <p className="text-center">Action</p>
          <Button
            className="hover:bg-blue-400 bg-blue-200"
            onClick={deleteItemHandler}
          >
            Delete
          </Button>
        </td>
        </tr>
      </div> */}
      <div>
        {/* <div className="ml-2 text-[15px] font-[600]">
          {pump_charge ? <h2>*Pump Charge Included</h2> : ""}
          <h2>*Vat {vat}% Included</h2>
        </div> */}
        <div className="flex flex-col items-end space-y-2 ">
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Net Payable Amount:</span>
            <span className="font-bold">{total_amount} Tk</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Button disabled={status ? true : false} onClick={addBalance}>
          {status ? "Added" : "Add to this Invoice"}
        </Button>
      </div>
    </div>
  );
}
