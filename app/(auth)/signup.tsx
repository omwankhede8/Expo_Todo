import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AuthForm from "../../components/AuthForm";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <AuthForm isLogin={false} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.footerLink}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#BCD8EC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    marginRight: 5,
    color: "#666",
  },
  footerLink: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
