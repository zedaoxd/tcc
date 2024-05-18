type CeateCheckoutBody = {
  courseId: string;
  payment: {
    token: string;
    transactionAmount: number;
    paymentMethodId: string;
    payerEmail: string;
    issuerId: string;
    installments: number;
    description: string;
  };
};

type CheckoutStatus =
  | "pending"
  | "approved"
  | "authorized"
  | "in_process"
  | "in_mediation"
  | "rejected"
  | "cancelled"
  | "refunded"
  | "charged_back";

type CreateCheckoutResponse = {
  id: string;
  courseId: string;
  userId: string;
  mercadoPagoId: string;
  createdAt: string;
  updatedAt: string;
  status: CheckoutStatus;
};

export const createCheckout = async (
  body: CeateCheckoutBody,
  authToken: string
): Promise<CreateCheckoutResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/purchase`,
    {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      method: "POST",
    }
  ).then((res) => res.json());

  return response;
};
