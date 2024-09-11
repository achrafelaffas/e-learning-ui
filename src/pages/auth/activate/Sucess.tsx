import { CircleCheck } from "lucide-react";

const Sucess = ({ message }: { message: string }) => {
  return (
    <>
      <div className="py-3 p-3 bg-green-300 text-green-600 text-sm rounded-md w-full bg-opacity-50 flex gap-2">
        <CircleCheck />
        {message}
      </div>
    </>
  );
};
export default Sucess;
