import { cn } from "@/lib/utils";

const Counts = ({ text, color }: { text: string; color: string }) => {
  return (
    <div className="basis-1/3">
      <div
        className={cn(
          "h-full ${color} p-5 rounded-sm text-white flex justify-center items-center",
          color
        )}
      >
        <div className="text-2xl"> {text}</div>
      </div>
    </div>
  );
};

export default Counts;
