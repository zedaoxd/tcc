import Login from "@/components/modules/auth/login";
import Register from "@/components/modules/auth/register";

export default function Auth() {
  return (
    <section className="container grid grid-cols-2 gap-8 mt-10">
      <Login />

      <Register />
    </section>
  );
}
