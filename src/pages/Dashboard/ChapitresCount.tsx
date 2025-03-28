import { Card } from "@/components/ui/card";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";

const ChapitresCount = () => {
  const [count, setCount] = useState(0);
  const api = useApi();

  useEffect(() => {
    const fetch = async () =>
      await api.statistiqueRestApi
        .countCompletedChapitres()
        .then((response) => setCount(response.data));

    fetch();
  }, []);

  return (
    <Card className="p-5 text-lg flex flex-row justify-between gap-5 w-full">
      <h1>Les chapitres completer</h1>
      <h1 className="text-xl text-primary">{count}</h1>
    </Card>
  );
};

export default ChapitresCount;
