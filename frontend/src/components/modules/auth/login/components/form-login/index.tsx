"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import useFormLogin from "./useFormLogin";
import { Checkbox } from "@/components/ui/checkbox";
import ButtonLoading from "@/components/ui/button-loading";

type Props = {
  callbackUrl?: string;
};

export default function FormLogin({ callbackUrl }: Props) {
  const { form, onSubmit } = useFormLogin(callbackUrl);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email or username*" {...field} />
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
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <FormLabel>Remember me</FormLabel>

              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonLoading className="w-full" loading={form.formState.isSubmitting}>
          Login
        </ButtonLoading>
      </form>
    </Form>
  );
}
