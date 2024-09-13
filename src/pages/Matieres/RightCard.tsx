import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function RightCard() {
  return (
    <div>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Etudiant Nom&Prenom
            </CardTitle>
            <CardDescription></CardDescription>
          </div>
        </CardHeader>
        <Separator />
        {/* chapitres */}
        <CardContent className="p-6 text-sm">
          <p>Description de Matiere</p>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">November 23, 2023</time>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
