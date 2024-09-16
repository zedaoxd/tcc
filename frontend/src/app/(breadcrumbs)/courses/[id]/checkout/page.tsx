import FormCreditCard from "@/components/modules/checkout/components/form-credit-card";
import { CardCourseCheckout } from "@/components/modules/courses/components/card-course-checkout";
import { getOneCourse } from "@/components/modules/courses/course/service";

type Props = {
  params: {
    id: string;
  };
};

export default async function Checkout({ params: { id } }: Props) {
  const data = await getOneCourse(id);
  const amount = data.price - data.price * data.discount;

  return (
    <section className="container py-6">
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-4 flex justify-between">
          <FormCreditCard amount={amount} courseId={id} />
        </div>

        <div>
          <CardCourseCheckout
            price={data.price}
            thumbnail={data.imageUrl}
            title={data.title}
            discount={data.discount}
          />
        </div>
      </div>
    </section>
  );
}
