import FormCreditCard from "@/components/modules/checkout/components/form-credit-card";

export default async function Checkout({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log(id);

  return (
    <section className="container py-6">
      <div className="grid grid-cols-5">
        <div className="col-span-4 flex justify-between">
          <FormCreditCard amount={100} />
        </div>

        <div></div>
      </div>
    </section>
  );
}
