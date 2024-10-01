import { Configuration, MatiereDTO, MatiereRestApi } from "@/api";
import { Button } from "@/components/ui/button";
import { FormEvent, SyntheticEvent, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const Admin = () => {


  const config = new Configuration();
  const authHeader = useAuthHeader();
  if (authHeader) config.accessToken = authHeader.replace("Bearer ", "");
  const api = new MatiereRestApi(config);
  const [image, setImage] = useState<File | undefined>();

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setImage(target.files[0]);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const data: MatiereDTO = {
      description: "Description",
      nom: "Nom",
      filiere: "Filere",
    };
    const matiere = JSON.stringify(data);
    if (image)
      api.createMatiereWithImage(matiere, image).then(
        () => console.log("Yey! the image was uploaded."),
        () => console.log(" F*** this! I am chaging careers")
      );
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} />
        <Button className="mt-4" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
};

export default Admin;
