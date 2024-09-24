import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CoursDTO, MatiereDTO } from "@/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CoursAccordionProps {
  cours: CoursDTO[];
  matiere: MatiereDTO;
}

export function AccordionCours({ cours, matiere }: CoursAccordionProps) {
  const navigate = useNavigate();

  const handleButtonClick = (courId: number | undefined) => {
    navigate(`/chapitres?courId=${courId}`);
  };

  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>{matiere.nom}</CardDescription>
            <CardTitle className="text-4xl">Cours</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {cours.length > 0 ? (
                cours.map((cour, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{cour.titre}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex justify-between items-center">
                        <li>{cour.description}</li>
                        <li>
                          <Button
                            variant="ghost"
                            onClick={() => handleButtonClick(cour.id)}
                          >
                            Voir le Cour
                          </Button>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </Accordion>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
}
