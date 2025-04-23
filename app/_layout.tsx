import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import { AuthProvider } from "../lib/firebase/authContext";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </Provider>
  );
}
