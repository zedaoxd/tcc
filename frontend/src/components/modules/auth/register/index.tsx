import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormRegister from "./components/form-register";

export default function Register() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>

      <CardContent>
        <FormRegister />
      </CardContent>
    </Card>
  );
}
