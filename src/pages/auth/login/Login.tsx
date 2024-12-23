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
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { AuthRestApi, AuthResponseDTO } from "@/api";
import Spinner from "@/components/ui/spinner";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useState } from "react";

const AuthRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, "Password should have 8 characters minimum"),
});

const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const auth = new AuthRestApi();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof AuthRequestSchema>>({
    resolver: zodResolver(AuthRequestSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = async (authRequest: z.infer<typeof AuthRequestSchema>) => {
    await auth.authenticate(authRequest).then(
      (response) => {
        const auth: AuthResponseDTO = response.data;
        const accessToken = auth.token || "";
        const username = auth.user?.nom || "";
        const email = auth.user?.email || "";
        const id = auth.user?.id || null;
        const isAdmin = auth.user?.roles?.some((role) => role.name == "ADMIN");

        signIn({
          auth: {
            token: accessToken,
            type: "Bearer",
          },
          userState: {
            name: username,
            email: email,
            id: id,
            isAdmin: isAdmin,
          },
        });

        if (isAdmin === true) {
          navigate("/admin/matieres");
        } else {
          navigate("/matieres");
        }
      },
      () => setError("Votre email ou mot de passe est incorrect.")
    );
  };

  return (
    <div className="flex h-screen items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 pb-2 text-sm">{error}</p>}
          <div>
            <Form {...form}>
              <form
                className="grid gap-4 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="m@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <Spinner />
                  ) : (
                    "Login to your account"
                  )}
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
