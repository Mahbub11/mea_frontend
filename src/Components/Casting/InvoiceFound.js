import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import InvoiceItem from "../Invoice/InvoiceItem";
import { uid } from "uid";
import InvoiceFoundItem from "./InvoiceFoundItem";

export default function InvoiceFound({ data }) {
  const [items, setItems] = useState([
    {
      id: uid(6),
      sno: uid(6),
      itemDes: data.description,
      m3cft: 35.315,
      unit: data.unit,
      unitRate: data.unit_rate,
      remarks: data.remarks,
    },
  ]);

  const deleteItemHandler = () => {};
  const edtiItemHandler = () => {};

  return (
    <div>
      <div>
        <h1 className="font-poppins text-[25px] font-[800] text-red-600 text-center">
          Invoice Exist!
        </h1>

        <div className="mt-10">
          <div className="text-[20px]">
            <h1>
              Invoice Number:
              <span className="font-[700]">
                {data.invoice[0].invoice_number}
              </span>
            </h1>
            <span>
              Due Date:
              <span className="font-[700]">{data.due_date}</span>
            </span>
          </div>

          <hr className="py-3 h-3"></hr>

          <div className="text-[20px] flex gap-5">
            <div className="flex gap-3 w-[25%]">
              <div className="w-full">
                <div className=" mt-3">
                  <h1>Customer Name: </h1>
                  <Input disabled value={data.company.name}></Input>
                </div>
                <div className=" mt-3">
                  <h1>Project Name: </h1>
                  <Input disabled value={data.project.name}></Input>
                </div>

                <div className=" mt-3">
                  <h1>Address: </h1>
                  <TextArea
                    disabled
                    value={data.company.address}
                    className=""
                    rows={2}
                  ></TextArea>
                </div>
              </div>
              <div></div>
            </div>

            <div className="mt-10 w-[80%]">
              <h1 className="font-[700]">ITEM</h1>
              <hr></hr>

              <div
                id="journal-scroll"
                className="font-poppins font-[300] text-[12px] mt-3 md:overflow-x-auto sm:overflow-x-scroll"
              >
                <table className="w-full p-4 text-left text-[13px]">
                  <thead></thead>
                  <tbody>
                    <div className=" flex-col gap-10  px-2 py-2">
                      {items.map((item) => (
                        <InvoiceFoundItem
                          key={item.id}
                          id={item.id}
                          itemDes={item.itemDes}
                          unit={item.unit}
                          m3cft={item.m3cft}
                          unitcft={item.unitcft}
                          total={item.total}
                          unitRate={item.unitRate}
                          remarks={item.remarks}
                          onDeleteItem={deleteItemHandler}
                          onEdtiItem={edtiItemHandler}
                        />
                      ))}
                    </div>
                  </tbody>
                </table>

                <div className="ml-5 text-[15px] font-[600]">
                  {data.pump_charge ? <h2>*Pump Charge Included</h2> : ""}
                  <h2>*Vat {data.vat}% Included</h2>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2 pt-6">
                <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
                  <span className="font-bold">Net Payable Amount:</span>
                  <span className="font-bold">{60000} Tk</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mt-10 flex flex-col gap-3 w-[60%] m-auto">
            <Button>Print Existing One</Button>
            <Button>Create New One</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
