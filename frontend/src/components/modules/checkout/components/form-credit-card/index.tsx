"use client";

import CreditCard from "../credit-card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import DialogSuccess from "@/components/shared/dialogSuccess";
import ButtonLoading from "@/components/ui/button-loading";
import { MONTHS } from "@/constants/months";
import { useRouter } from "next/navigation";
import useCreditCard from "./use-credit-card";

type Props = {
  amount: number;
};

export default function FormCreditCard({ amount }: Props) {
  const router = useRouter();

  const { YEARS, form, state, expiry, onSubmit, setShowModal, showModal } =
    useCreditCard({ amount });

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-2 w-full gap-10 items-end">
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="cardholderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name as it is on the card</FormLabel>
                    <FormControl>
                      <Input placeholder="ex.: Jhon Diggle" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex.: 5031 4332 1540 6351"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="cardExpirationMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration month</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MONTHS.map(({ reference, month }) => (
                            <SelectItem key={reference} value={reference}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardExpirationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration year</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(YEARS).map(([key, value]) => (
                            <SelectItem key={key} value={value.toString()}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="installments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Installments</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger disabled={state.payerCosts.length === 0}>
                          <SelectValue placeholder="Installments" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {state.payerCosts.map(
                          ({ installments, installment_amount }, index) => (
                            <SelectItem
                              key={index}
                              value={installments.toString()}
                            >
                              {installments}x ${installment_amount}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="securityCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security code</FormLabel>
                    <FormControl>
                      <Input placeholder="ex.: 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-8">
              <CreditCard
                cvc={form.watch("securityCode")}
                expiry={expiry}
                focused="number"
                name={form.watch("cardholderName")}
                number={form.watch("cardNumber")}
                issuer={state.paymentMethod.name}
              />

              <FormField
                control={form.control}
                name="payerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex.: jhondiggle@mail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identificationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identification type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="ID type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CPF">CPF</SelectItem>
                        <SelectItem value="CNPJ">CNPJ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identificationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identification number</FormLabel>
                    <FormControl>
                      <Input placeholder="ex.: 12345678909" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormDescription>
            You will be charged{" "}
            <span className="text-red-400 font-semibold">${amount} USD</span>
          </FormDescription>

          <ButtonLoading
            size="lg"
            className="w-full"
            type="submit"
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
          >
            Pay
          </ButtonLoading>
        </form>
      </Form>

      <DialogSuccess
        title="Payment"
        open={showModal}
        onOpenChange={setShowModal}
        successAction={() => router.push("/profile")}
        description="pagamento bem sucedido"
      />
    </div>
  );
}
