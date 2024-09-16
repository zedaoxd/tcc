import Login from "@/components/modules/auth/login";
import Register from "@/components/modules/auth/register";

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};

export default function Auth({ searchParams: { callbackUrl } }: Props) {
  return (
    <section className="container grid grid-cols-2 gap-8 mt-10">
      <Login callbackUrl={callbackUrl} />

      <Register />
    </section>
  );
}
