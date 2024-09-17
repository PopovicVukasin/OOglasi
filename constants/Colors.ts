/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0c2e70";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000", // Primary text color
    background: "#fff", // Background color
    tint: tintColorLight, // Tint color (e.g., for icons)
    tabIconDefault: "#ccc", // Default tab icon color
    tabIconSelected: tintColorLight, // Selected tab icon color

    primary: "#0c2e70", // Primary color
    secondary: "#9c28b1", // Secondary color
    success: "#28a745", // Success color
    danger: "#dc3545", // Danger color (e.g., for errors)
    warning: "#ffc107", // Warning color
    info: "#17a2b8", // Info color
    lightGray: "#f8f9fa", // Light gray color (e.g., for borders)
    darkGray: "#343a40", // Dark gray color
    red: "#ff1e00",
  },
  dark: {
    text: "#fff", // Primary text color
    background: "#000", // Background color
    tint: tintColorDark, // Tint color (e.g., for icons)
    tabIconDefault: "#ccc", // Default tab icon color
    tabIconSelected: tintColorDark, // Selected tab icon color

    primary: "#1f6fb2", // Primary color (darker shade for dark mode)
    secondary: "#495057", // Secondary color
    success: "#218838", // Success color
    danger: "#c82333", // Danger color (e.g., for errors)
    warning: "#e0a800", // Warning color
    info: "#138496", // Info color
    lightGray: "#6c757d", // Light gray color (darker shade for dark mode)
    darkGray: "#1c1e22", // Dark gray color
  },
};
