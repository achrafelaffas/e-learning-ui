import { UserDTO } from "@/api";
import { Card } from "@/components/ui/card";

const CardEtudiant = ({ etudiant }: { etudiant: UserDTO }) => {
  return (
    <Card className="flex flex-row p-5 gap-2">
      <h1>Nom </h1>
      <h1 className="text-primary">{etudiant.nom}</h1>
      <h1>Email</h1>
      <h1 className="text-primary">{etudiant.email}</h1>
    </Card>
  );
};

export default CardEtudiant;
