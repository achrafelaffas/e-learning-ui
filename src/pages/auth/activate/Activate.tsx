import { AuthRestApi } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Sucess from "./Sucess";
import { Link } from "react-router-dom";
import Spinner from "@/components/ui/spinner";

const Token = z.object({
  token: z
    .string()
    .min(6, "Invalid code.")
    .max(6, "Invalid code."),
});

const Activate = () => {
  const auth = new AuthRestApi();
  const form = useForm<z.infer<typeof Token>>({
    resolver: zodResolver(Token),
    defaultValues: {
      token: "",
    },
  });

  const onSubmit = async (token: z.infer<typeof Token>) => {
    console.log(token);
    await auth.activate(token.token.toString()).then(
      () => console.log("activated"),
      (err) => console.log(err)
    );
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm px-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Activate Your Account</CardTitle>
          <CardDescription>
            Enter the code we sent to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-col gap-4 justify-center">
            {form.formState.isSubmitSuccessful && (
              <Sucess message="Your account has been activated" />
            )}
            {!form.formState.isSubmitSuccessful && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4 w-full"
                >
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activation code</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <Spinner />
                    ) : (
                      "Activate my account"
                    )}
                  </Button>
                </form>
              </Form>
            )}
            {form.formState.isSubmitSuccessful && (
              <Button>
                <Link to="/login">Login to my account</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activate;
