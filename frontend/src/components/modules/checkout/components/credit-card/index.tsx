"use client";

import Cards from "react-credit-cards-2";

import "./style.scss";

type Props = {
  cvc: string;
  expiry: string;
  focused: "name" | "number" | "expiry" | "cvc";
  name: string;
  number: string;
  issuer?: string;
};

export default function CreditCard({
  cvc,
  expiry,
  focused,
  name,
  number,
  issuer,
}: Props) {
  return (
    <div className="flex justify-center">
      <Cards
        cvc={cvc}
        expiry={expiry}
        name={name}
        number={number}
        focused={focused}
        acceptedCards={["visa", "mastercard", "amex", "discover"]}
        preview
        placeholders={{ name: "FULL NAME" }}
        issuer={issuer}
      />
    </div>
  );
}
