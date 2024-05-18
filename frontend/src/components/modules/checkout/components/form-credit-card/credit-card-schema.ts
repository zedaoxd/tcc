import { z } from "zod";

const formSchema = z.object({
  cardholderName: z.string().min(2).max(100),
  identificationType: z.enum(["CPF", "CNPJ"]),
  identificationNumber: z.string().min(2).max(100),
  cardExpirationMonth: z.string().min(2).max(100),
  cardExpirationYear: z.string(),
  cardNumber: z.string().min(2).max(100),
  securityCode: z.string().min(2).max(100),
  payerEmail: z.string().email(),
  installments: z.string().min(1).max(12),
});

type FormSchema = z.infer<typeof formSchema>;

export { formSchema, type FormSchema };
