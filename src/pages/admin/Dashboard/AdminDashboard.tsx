import MarksCard from "./QuizCard";
import CouresList from "./CouresList";
import Counts from "./CountsCard";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-3">
        <Counts text={`Completed ${16} courses`} color="bg-purple-500" />
        <Counts text={`${16} courses in progress`} color="bg-red-500" />
        <Counts text={`Passed ${16} quizs`} color="bg-green-500" />
      </div>
      <div className="flex flex-col md:flex-row w-full gap-3">
        <div className="basis-1/2">
          <MarksCard />
        </div>
        <div className="basis-1/2">
          <CouresList />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
