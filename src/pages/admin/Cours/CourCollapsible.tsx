import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoursDTO, MatiereDTO } from "@/api";

interface CoursCollapsibleProps {
  cours: CoursDTO[];
  matiere: MatiereDTO;
}

export default function CourCollapsible({
  cours,
  matiere,
}: CoursCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleButtonClick = (courId: number | undefined) => {
    navigate(`/chapitres?courId=${courId}`);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">{matiere.nom}</h4>

        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <CaretSortIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
        {matiere.description}
      </div>

      <CollapsibleContent className="space-y-2">
        {cours.map((cour) => (
          <div key={cour.id} className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            <Button
              variant="ghost"
              className="w-full h-fit"
              onClick={() => handleButtonClick(cour.id)}
            >
              {cour.titre}
            </Button>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
