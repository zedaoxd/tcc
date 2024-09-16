"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { emailInUse, register } from "../../service";

const formSchema = z
  .object({
    email: z
      .string()
      .email("The email field must be a valid email")
      .refine(emailInUse, "The email is already taken"),
    fullName: z
      .string()
      .min(2, "The full name field cannot be empty")
      .max(100, "The full name field cannot have more than 100 characters")
      .regex(/^[a-zA-Z\s]*$/, "The full name field must only contain letters")
      .refine(
        (data) => data.split(" ").length >= 2,
        "The full name field must contain at least two names"
      ),
    password: z
      .string()
      .min(1, "The password field cannot be empty")
      .max(100, "The password field cannot have more than 100 characters"),
    confirmPassword: z
      .string()
      .min(1, "The password field cannot be empty")
      .max(100, "The password field cannot have more than 100 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function useFormRegister() {
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = form.handleSubmit(async (values: FormValues) => {
    const parsedValues = await formSchema.safeParseAsync(values);

    if (!parsedValues.success) {
      return;
    }

    const names = parsedValues.data.fullName.split(" ");
    const firstName = names[0];
    const lastName = names.slice(1).join(" ");

    register({
      email: parsedValues.data.email,
      password: parsedValues.data.password,
      firstName,
      lastName,
    })
      .then(() => {
        setRegisterSuccess(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  });

  return {
    form,
    onSubmit,
    registerSuccess,
    setRegisterSuccess,
  };
}
