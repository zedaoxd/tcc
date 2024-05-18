type PayerCost = {
  installment_rate: number;
  discount_rate: number;
  min_allowed_amount: number;
  labels: string[];
  installments: number;
  reimbursement_rate?: unknown;
  max_allowed_amount: number;
  payment_method_option_id: string;
  installment_amount: number;
  recommended_message: string;
  total_amount: number;
};

export type State = {
  paymentMethod: {
    id: string;
    name: string;
  };
  payerCosts: PayerCost[];
  issuerId: string;
};
