import { create } from "zustand";

interface UIState {
  loading: boolean;
  isBreadScrumbShow: boolean;
  setLoading: (loading: boolean, delay?: number) => void;
  setBreadCrumbShowStatus: (isBreadScrumbShow: boolean) => void;
}

// ✅ UI Store with Delay Support
export const useUIStore = create<UIState>((set) => ({
  loading: false,
  isBreadScrumbShow: true,
  setLoading: (loading, delay = 0) => {
    if (!loading && delay > 0) {
      setTimeout(() => set({ loading }), delay); // 🔥 Delay hiding
    } else {
      set({ loading });
    }
  },
  setBreadCrumbShowStatus: (isBreadScrumbShow: boolean): void => {
    set({ isBreadScrumbShow });
  }
}));
