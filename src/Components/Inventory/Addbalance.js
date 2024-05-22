import { Input } from "antd";
import React, { useState } from "react";

export default function Addbalance() {
  const [sand, setSand] = useState(0);
  const [stone, setStone] = useState(0);
  const [cement, setCement] = useState(0);
  const [admixer, setAdmixer] = useState(0);
  const [brickChips, setBrickChips] = useState(0);

  return (
    <div>
      <div>
        <h1 className="font-poppinsBold text-[25px] text-center">
          Add Purchase Items
        </h1>

        <div>
          <div className="mt-10 sm:w-[90%] md:w-[40%] flex justify-center flex-col gap-5 m-auto text-[15px] px-2 py-5">
            <div className="flex gap-4">
              <div>
                <p>* Enter Sand Amount(ton)</p>
                <Input
                  value={sand}
                  onChange={(e) => setSand(e.target.value)}
                  className="h-10"
                  placeholder="Enter Sand Amount(ton)"
                ></Input>
              </div>

              <div>
                <p>* Rate</p>
                <Input
                  value={sand}
                  onChange={(e) => setSand(e.target.value)}
                  className="h-10"
                  placeholder="Enter Sand Amount(ton)"
                ></Input>
              </div>
            </div>

            <div className="flex gap-4">
              <div>
                <p>* Enter Cement Amount(ton)</p>
                <Input
                  value={sand}
                  onChange={(e) => setCement(e.target.value)}
                  className="h-10"
                  placeholder="Enter Cement Amount(ton)"
                ></Input>
              </div>

              <div>
                <p>* Rate</p>
                <Input
                  value={sand}
                  onChange={(e) => setSand(e.target.value)}
                  className="h-10"
                 
                ></Input>
              </div>
            </div>



            <div className="flex gap-4">
              <div>
                <p>* Enter Stone Amount(ton)</p>
                <Input
                  value={sand}
                  onChange={(e) => setSand(e.target.value)}
                  className="h-10"
                  placeholder="Enter Sand Amount(ton)"
                ></Input>
              </div>

              <div>
                <p>* Rate</p>
                <Input
                  value={sand}
                  onChange={(e) => setSand(e.target.value)}
                  className="h-10"
                  placeholder="Enter Sand Amount(ton)"
                ></Input>
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <p>* Enter Admixer Amount(ton)</p>
                <Input
                  value={sand}
                  onChange={(e) => setSand(e.target.value)}
                  className="h-10"
                  placeholder="Enter Sand Amount(ton)"
                ></Input>
              </div>

              <div>
                <p>* Rate</p>
                <Input
                  value={sand}
                  onChange={(e) => setSand(e.target.value)}
                  className="h-10"
                  placeholder="Enter Sand Amount(ton)"
                ></Input>
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <p>* Enter Brics Chips Amount(ton)</p>
                <Input
                  value={sand}
                  onChange={(e) => setSand(e.target.value)}
                  className="h-10"
                  placeholder="Enter Sand Amount(ton)"
                ></Input>
              </div>

              <div>
                <p>* Rate</p>
                <Input
                  value={sand}
                  onChange={(e) => setSand(e.target.value)}
                  className="h-10"
                  placeholder="Enter Sand Amount(ton)"
                ></Input>
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <p>Others</p>
                <Input
                  value={sand}
                  onChange={(e) => setSand(e.target.value)}
                  className="h-10"
                  placeholder="Enter Sand Amount(ton)"
                ></Input>
              </div>

              <div>
                <p>* Rate</p>
                <Input
                  value={sand}
                  onChange={(e) => setSand(e.target.value)}
                  className="h-10"
                  placeholder="Enter Sand Amount(ton)"
                ></Input>
              </div>
            </div>



            <button
              //    onClick={handleSave}
              className="cursor-pointer hover:bg-blue-300 px-2 py-2 border-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
