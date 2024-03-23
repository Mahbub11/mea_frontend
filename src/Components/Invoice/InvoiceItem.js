import React, { useEffect, useState } from "react";
import InvoiceField from "./InvoiceField";
import { Button, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function InvoiceItem({
  id,
  itemDes,
  m3cft,
  unit,
  unitcft,
  unitRate,
  total,
  remarks,
  onDeleteItem,
  onEdtiItem,
}) {
  const [unitCft, setUnitCft] = useState(unit * m3cft);
  const [totalBill, setTotal] = useState(unit * unitRate);
  useEffect(() => {
    setUnitCft(Math.round(unit * m3cft));
    setTotal(Math.round(unitcft * unitRate));
    onEdtiItem({
      event: {
        id,
        name: "unitcft",
        value: Math.round(unit * m3cft),
      },
      flag: 2,
    });
    onEdtiItem({
      event: {
        id,
        name: "total",
        value: Math.round(unitcft * unitRate),
      },
      flag: 2,
    });
  }, [unit, m3cft, unitRate, total,  unitcft]);

  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  const handleNext = (e) => {
    console.log(e);
  };

  return (
    <div>
      <tr className="">
        <td className="w-auto px-2 ">
          <p>* Description</p>
          <InvoiceField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              placeholder: "Description",
              type: "text",
              name: "itemDes",
              id: id,
              value: itemDes,
              className: " px-2 py-2 w-[8rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <p>* Unit(m3)</p>
          <InvoiceField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              type: "number",
              min: "1",
              name: "unit",
              id: id,
              value: unit,
              className: " px-2 py-2 w-[8rem] drop-shadow-sm",
            }}
          />
        </td>
        <td className="w-auto px-2 ">
          <p>* 1m3=cft</p>
          <InvoiceField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: true,
              className: " px-2 py-2 w-[5rem] drop-shadow-sm",
              type: "number",
              min: "0.01",
              step: "0.01",
              name: "m3cft",
              id: id,
              value: m3cft,
            }}
          />
        </td>
        <td className="w-auto px-2 ">
          <p>* Unit(cft)</p>

          <InvoiceField
            cellData={{
              className: " px-2 py-2 w-[8rem] drop-shadow-sm",
              type: "number",
              min: "0.01",
              step: "0.01",
              name: "unitcft",
              id: id,
              value: unitCft,
              isDisable: true,
            }}
          />
        </td>
        <td className="w-auto px-2 ">
          <p>* Unit Rate</p>
          <InvoiceField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              className: " px-2 py-2 w-[5rem] drop-shadow-sm",
              type: "number",
              min: "0.01",
              step: "0.01",
              name: "unitRate",

              id: id,
              value: unitRate,
            }}
          />
        </td>
        <td className="w-auto px-2 ">
          <p>* Total Amount</p>
          <InvoiceField
            onEditItem={(event) => onEdtiItem(event)}
            cellData={{
              className: " px-2 py-2 w-[8rem] drop-shadow-sm",
              type: "number",
              min: "0.01",
              step: "0.01",
              name: "total",
              isDisable: true,
              id: id,
              value: totalBill,
            }}
          />
        </td>
        <td className="w-auto px-2 ">
          <p>Remarks</p>
          <TextArea
            className="font-[700] text-red-300"
            value={remarks}
            id={id}
            name="remarks"
            onChange={(event) => onEdtiItem({ event: event })}
            rows={1.9}
            onEditItem={(event) => onEdtiItem({ event: event })}
          />
        </td>
        {/* <td className="w-auto px-2 ">
          <p className="text-center">Action</p>
          <Button
            className="hover:bg-blue-400 bg-blue-200"
            onClick={deleteItemHandler}
          >
            Delete
          </Button>
        </td> */}
      </tr>
    </div>
  );
}
