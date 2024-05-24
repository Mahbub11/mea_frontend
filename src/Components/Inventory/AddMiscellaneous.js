import { Button, Input } from "antd";

export const AddMiscellaneous = ({ handleMisc }) => {
  const handleMiscBody = () => {
    handleMisc();
  };

  return (
    <div>
      <h1 onClick={handleMiscBody}>Add Miscellaneous</h1>
      <div>
        <table>
            <tr>
                <td><Input placeholder="Intem Name" disabled></Input></td>
                <td><Input className=""></Input></td>
            </tr>
            <tr>
                <td><Input placeholder="Amount" disabled></Input></td>
                <td><Input className=""></Input></td>
            </tr>
        </table>
      </div>
      <Button
        //   onClick={() => deleteItemHandler(id)}
          className=" w-[20%] mt-3 border-red-500"
        >
          Remove
        </Button>
    </div>
  );
};
