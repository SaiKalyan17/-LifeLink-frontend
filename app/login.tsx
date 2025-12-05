import Constants from "expo-constants";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./AuthContext";


const API_BASE = Constants.expoConfig?.extra?.API_BASE_URL;
const API_LOGIN = `${API_BASE}/user/login`; 

export default function LoginScreen() {
  const { login } = useAuth(); 

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobileNumber || !password) {
      Alert.alert("Error", "Please enter both fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
        return;
      }

      await login(data.data);

      Alert.alert("Success", "Login successful!");
      router.replace("/home");

    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Unable to login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleLogin}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.footerText}>Don't have an account ? Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text style={styles.footerText}>Forgot Password ? Click here</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// --------------------
// STYLES
// --------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginVertical: 20,
    color: "#ff4d5c",
    textAlign: "center",
  },

  input: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#ff4d5c",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  footerText: {
    marginTop: 15,
    textAlign: "center",
    color: "#555",
  },
});
