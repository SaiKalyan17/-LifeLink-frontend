import dotenv from "dotenv";
dotenv.config();

import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

export default function RegisterScreen() {
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!userName || !mobileNumber || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          mobileNumber,
          email,
          password,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        Alert.alert("Registration Failed", data.message || "Try again");
        return;
      }

      Alert.alert("Success", "Account created successfully!");
      router.push(`/verify-otp?email=${email}`);

    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Unable to register");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
      />

      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
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
        onPress={handleRegister}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.footerText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
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
