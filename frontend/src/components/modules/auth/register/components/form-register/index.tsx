"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import useFormRegister from "./useFormRegister";
import DialogInfo from "@/components/shared/dialogInfo";
import ButtonLoading from "@/components/ui/button-loading";

export default function FormRegister() {
  const { form, onSubmit, registerSuccess, setRegisterSuccess } =
    useFormRegister();

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Full name*" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email*" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputPassword placeholder="Password*" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputPassword placeholder="Confirm password*" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonLoading
            className="w-full"
            loading={form.formState.isSubmitting}
          >
            Create your account
          </ButtonLoading>
        </form>
      </Form>

      <DialogInfo
        open={registerSuccess}
        onOpenChange={() => setRegisterSuccess(false)}
        description="You have successfully registered. Please check your email to activate your account."
        title="Register success"
      />
    </>
  );
}
