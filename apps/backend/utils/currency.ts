// src/lib/currency.ts

const KOBO_MULTIPLIER = 100;

export const toKobo = (naira: number | string): number => {
  return Math.round(parseFloat(String(naira)) * KOBO_MULTIPLIER);
};

export const formatNaira = (kobo: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(kobo / KOBO_MULTIPLIER);
};

/** 1050  →  10.50  (DB → raw number, e.g. for Paystack amount check) */
export const toNaira = (kobo: number): number => {
  return kobo / KOBO_MULTIPLIER;
};