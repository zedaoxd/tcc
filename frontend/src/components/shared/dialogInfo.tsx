"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Check } from "lucide-react";

type Props = {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (opem: boolean) => void;
  html?: boolean;
};

export default function DialogInfo({
  description,
  title,
  onOpenChange,
  open,
  html = false,
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
          {html ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            description
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
