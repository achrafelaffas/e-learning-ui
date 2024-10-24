import { MatiereCards } from "./MatiereCards";
import { useEffect, useState } from "react";
import { Configuration, MatiereDTO, MatiereRestApi } from "@/api";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface Search {
  keyword: string;
}

const Matieres = () => {
  const [error, setError] = useState("");
  const [noResults, setNoResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matieres, setMatieres] = useState<MatiereDTO[]>([]);

  const form = useForm<Search>({
    defaultValues: { keyword: "" },
  });

  const config = new Configuration();
  const authHeader = useAuthHeader();
  if (authHeader) config.accessToken = authHeader.replace("Bearer ", "");
  const api = new MatiereRestApi(config);

  const fetchMatieres = async () => {
    setIsLoading(true);
    try {
      const response = await api.getAllMatieres();
      const matieres = response.data;
      setMatieres(matieres);
    } catch {
      setError("Error happened while getting your data!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatieres();
  }, []);

  const submit = async (data: Search) => {
    setIsLoading(true);
    try {
      const response = await api.searchMatieres(data.keyword);
      const matieres = response.data;
      setMatieres(matieres);
      if (matieres.length == 0) setNoResults("No results were found");
      else setNoResults("");
    } catch {
      setError("Error happened while getting your data!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="flex flex-row justify-between gap-3 lg:w-1/3 w-full mb-4">
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem className="w-3/4">
                <FormControl>
                  <Input
                    placeholder="Search matieres..."
                    {...field}
                    onKeyUp={form.handleSubmit(submit)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <main>
        <p>{noResults}</p>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <MatiereCards matieres={matieres} />
        )}
      </main>
    </>
  );
};

export default Matieres;
