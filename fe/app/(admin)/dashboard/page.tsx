
import Card from "@/components/admin-components/common/Card";
import { MdOutlineArrowUpward } from "react-icons/md";

export default function Dashboard() {
  return (
    <div className="">
      <div className="my-4 md:mx-0 mx-2">Admin Dashboard</div>
      <div className="md:flex justify-around gap-3 flex-wrap flex-2">
        <Card>
          <div className="p-4 flex justify-between items-center gap-4 md:my-0 my-2">
            <div className="w-64">
              <p className="text-sm font-bold text-gray-500">Total Products</p>
              <h4 className="font-medium text-3xl">100</h4>
            </div>
            <div>
              <MdOutlineArrowUpward size={40} color="green" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-4 flex justify-between items-center gap-4 md:my-0 my-2">
            <div className="w-64">
              <p className="text-sm font-bold text-gray-500">Total Products</p>
              <h4 className="font-medium text-3xl">100</h4>
            </div>
            <div>
              <MdOutlineArrowUpward size={40} color="green" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-4 flex justify-between items-center gap-4 md:my-0 my-2">
            <div className="w-64">
              <p className="text-sm font-bold text-gray-500">Total Products</p>
              <h4 className="font-medium text-3xl">100</h4>
            </div>
            <div>
              <MdOutlineArrowUpward size={40} color="green" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-4 flex justify-between items-center gap-4 md:my-0 my-2">
            <div className="w-64">
              <p className="text-sm font-bold text-gray-500">Total Products</p>
              <h4 className="font-medium text-3xl">100</h4>
            </div>
            <div>
              <MdOutlineArrowUpward size={40} color="green" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
