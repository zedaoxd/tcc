"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

type Props = {
  title: string;
  open: boolean;
  onOpenChange: (opem: boolean) => void;
  description?: string;
  children?: React.ReactNode;
};

export default function DialogInfo({
  description,
  children,
  title,
  onOpenChange,
  open,
}: Props) {
  return (
    <Dialog modal onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-primary/90 text-4xl flex flex-col items-center">
            {title}

            <AlertCircle className="text-center h-32 w-32 text-primary/70" />
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-xl text-center">
          {description}
          {children}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
