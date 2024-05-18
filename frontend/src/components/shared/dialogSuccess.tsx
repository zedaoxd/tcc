"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check } from "lucide-react";

type Props = {
  title: string;
  open: boolean;
  onOpenChange: (opem: boolean) => void;
  successAction: () => void;
  description?: string;
};

export default function DialogSuccess({
  title,
  onOpenChange,
  open,
  successAction,
  description,
}: Props) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col justify-center items-center">
          <AlertDialogTitle className="text-primary font-bold text-3xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col justify-center items-center">
            <Check className="h-32 w-32 text-primary text-center" />

            <div>
              <p>{description}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={successAction}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
