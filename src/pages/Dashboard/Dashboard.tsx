import ChapitresCount from "./ChapitresCount";
import Chart from "./Chart";
import CoursCount from "./CoursCount";
import MatiereCount from "./MatiereCount";
import ProgressPerMatiereChart from "./ProgressPerMatiereChart";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-row justify-between gap-3">
        <MatiereCount />
        <CoursCount />
        <ChapitresCount />
      </div>
      <div className="flex sm:flex-row flex-col gap-3">
        <div className="lg:w-1/3 md:w-1/2 w-full h-full">
          <Chart />
        </div>
        <div className="lg:w-2/3 md:w-1/2 w-full h-full">
          <ProgressPerMatiereChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
