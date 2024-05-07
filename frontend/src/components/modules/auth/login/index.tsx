import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormLogin from "./components/form-login";
import Link from "next/link";

export default function Login() {
  return (
    <Card className="w-full h-min">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent>
        <FormLogin />
      </CardContent>

      <CardFooter>
        <Link href="/auth/forgot-password">Forgot your password?</Link>
      </CardFooter>
    </Card>
  );
}
