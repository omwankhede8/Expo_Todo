import { Redirect } from "expo-router";
import { useAuth } from "../lib/firebase/authContext";

export default function Index() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
