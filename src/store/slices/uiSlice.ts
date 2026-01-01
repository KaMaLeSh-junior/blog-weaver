import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  theme: "light" | "dark";
  isCarouselEnabled: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  timestamp: number;
}

const initialState: UIState = {
  isSidebarOpen: false,
  isMobileMenuOpen: false,
  theme: "light",
  isCarouselEnabled: true,
  notifications: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    toggleCarousel: (state) => {
      state.isCarouselEnabled = !state.isCarouselEnabled;
    },
    setCarouselEnabled: (state, action: PayloadAction<boolean>) => {
      state.isCarouselEnabled = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, "id" | "timestamp">>) => {
      state.notifications.push({
        ...action.payload,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  setTheme,
  toggleCarousel,
  setCarouselEnabled,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;
export default uiSlice.reducer;
