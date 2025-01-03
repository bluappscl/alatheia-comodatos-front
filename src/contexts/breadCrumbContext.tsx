import { create } from "zustand";

type BreadcrumbState = {
  items: { title: string; path?: string }[];
  setBreadcrumbs: (items: { title: string; path?: string }[]) => void;
};

export const useBreadcrumbContext = create<BreadcrumbState>((set) => ({
  items: [],
  setBreadcrumbs: (items) => set({ items }),
}));
