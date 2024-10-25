import { Card } from "@/components/ui/card";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";

const ChapitresCount = ({ idEtud }: { idEtud: number }) => {
  const [count, setCount] = useState(0);
  const api = useApi();

  useEffect(() => {
    const fetch = async (id: number) =>
      await api.userRestApi
        .etudiantCountCompletedChapitres(id)
        .then((response) => setCount(response.data));

    fetch(idEtud);
  }, []);

  return (
    <Card className="p-5 text-lg flex flex-row justify-between gap-5 w-full">
      <h1>Les chapitres completer</h1>
      <h1 className="text-xl text-primary">{count}</h1>
    </Card>
  );
};

export default ChapitresCount;
