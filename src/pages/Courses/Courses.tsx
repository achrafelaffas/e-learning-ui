import { RightCard } from "./RightCard";
import { AccordionCours } from "./AccordionCours";

function Courses() {
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
        <AccordionCours />
        <RightCard />
      </main>
    </>
  );
}

export default Courses;
