import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormLogin from "./components/form-login";
import Link from "next/link";

type Props = {
  callbackUrl?: string;
};

export default function Login({ callbackUrl }: Props) {
  return (
    <Card className="w-full h-min">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent>
        <FormLogin callbackUrl={callbackUrl} />
      </CardContent>

      <CardFooter>
        <Link href="/auth/forgot-password">Forgot your password?</Link>
      </CardFooter>
    </Card>
  );
}
