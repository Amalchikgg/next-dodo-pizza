"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token='e6a885ba7a1c059938d76eb355e3da6c6f6b58ad'
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
