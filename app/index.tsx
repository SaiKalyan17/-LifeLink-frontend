import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "./AuthContext";

export default function Index() {
  const { token, tloading } = useAuth();

  if (tloading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff4d5c" />
      </View>
    );
  }

  if (token) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
}
