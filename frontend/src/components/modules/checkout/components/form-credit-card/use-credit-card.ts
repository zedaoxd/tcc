"use client";

import { useForm } from "react-hook-form";
import { FormSchema, formSchema } from "./credit-card-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useReducer, useState } from "react";
import { State } from "./types";
import { createCheckout } from "../../services";
import { initMercadoPago } from "@mercadopago/sdk-react";
import {
  createCardToken,
  getInstallments,
  getIssuers,
  getPaymentMethods,
} from "@mercadopago/sdk-react/coreMethods";
import { Installments } from "@mercadopago/sdk-react/coreMethods/getInstallments/types";
import { Issuers } from "@mercadopago/sdk-react/coreMethods/getIssuers/types";

initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY, {
  locale: "en-US",
});

const reducer = (state: State, newState: Partial<State>): State => ({
  ...state,
  ...newState,
});

type Props = {
  amount: number;
  courseId: string;
};

export default function useCreditCard({ amount, courseId }: Props) {
  const session = useSession();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [showModal, setShowModal] = useState(false);

  const [state, setState] = useReducer(reducer, {
    paymentMethod: { id: "", name: "" },
    payerCosts: [],
    issuerId: "",
  });

  const cardNumber = form.watch("cardNumber") ?? "";
  const cardExpirationMonth = form.watch("cardExpirationMonth");
  const cardExpirationYear = form.watch("cardExpirationYear");
  const expiry =
    cardExpirationMonth && cardExpirationYear
      ? `${form.watch("cardExpirationMonth")}/${form.watch(
          "cardExpirationYear"
        )}`
      : "MM/YY";

  useEffect(() => {
    async function fetchPaymentMethods() {
      const bin = cardNumber?.replace(/\s+/g, "").slice(0, 6);
      if (!bin || bin.length < 6) {
        if (state.paymentMethod.id !== "" || state.paymentMethod.name !== "")
          setState({ paymentMethod: { id: "", name: "" } });
        return;
      }

      const payments = await getPaymentMethods({ bin: bin });

      const paymentMethodId = payments?.results[0].id;

      if (!paymentMethodId) return;

      const promeses = [
        getIssuers({ bin: bin, paymentMethodId }),
        getInstallments({
          amount: String(amount),
          paymentMethodId,
          bin: bin,
        }),
      ];

      const [issuers, installments] = await Promise.all(promeses);

      setState({
        payerCosts: (installments as Installments[])?.[0].payer_costs ?? [],
        paymentMethod: {
          id: paymentMethodId,
          name: payments?.results[0].name ?? "",
        },
        issuerId: (issuers as Issuers[])?.[0]?.id ?? "",
      });
    }

    fetchPaymentMethods();
  }, [cardNumber, amount, state.paymentMethod.id, state.paymentMethod.name]);

  async function onSubmit(values: FormSchema) {
    const accessToken = session.data?.token;

    if (!accessToken) {
      console.error("User not authenticated");
      return;
    }

    const parseValues = formSchema.safeParse(values);

    if (!parseValues.success) {
      console.error(parseValues.error);
      return;
    }

    const cardToken = await createCardToken({
      cardholderName: values.cardholderName,
      identificationType: values.identificationType,
      identificationNumber: values.identificationNumber,
      cardExpirationMonth: values.cardExpirationMonth,
      cardExpirationYear: values.cardExpirationYear,
      cardNumber: values.cardNumber.replace(/\s+/g, ""), // Remove spaces
      securityCode: values.securityCode,
    });

    console.log("Card token", cardToken);

    if (!cardToken) return;

    const body: Parameters<typeof createCheckout>[0] = {
      courseId,
      payment: {
        paymentMethodId: state.paymentMethod.id,
        issuerId: state.issuerId,
        token: cardToken.id,
        transactionAmount: amount,
        payerEmail: values.payerEmail,
        installments: Number(values.installments),
        description: `Course purchase id: ${courseId}`,
      },
    };

    const checkout = await createCheckout(body, accessToken);

    const success = checkout.status === "approved";

    setShowModal(success);
  }

  const YEARS = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i + new Date().getFullYear()),
    []
  );

  return {
    form,
    expiry,
    state,
    showModal,
    setShowModal,
    YEARS,
    onSubmit,
  };
}
