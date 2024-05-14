"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, { message: "The email/username field cannot be empty" })
    .max(100, "The email/username field cannot have more than 100 characters"),
  password: z
    .string()
    .min(1, "The password field cannot be empty")
    .max(100, "The password field cannot have more than 100 characters"),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function useFormLogin() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = form.handleSubmit(async (values: FormValues) => {
    const parsedValues = formSchema.safeParse(values);

    if (!parsedValues.success) return;

    console.log(parsedValues.data);
  });

  return { form, onSubmit };
}
