import { create } from "zustand";

type ProductStore = {
  currency: "RMB" | "IDR";
  language: "CN" | "EN";
  setCurrency: (currency: "RMB" | "IDR") => void;
  setLanguage: (language: "CN" | "EN") => void;
};

// 2. Apply the interface to the create function
export const useProducts = create<ProductStore>((set) => ({
  currency: "RMB",
  language: "EN",
  setCurrency: (newCurrency) => set({ currency: newCurrency }),
  setLanguage: (newLanguage) => set({ language: newLanguage }),
}));
