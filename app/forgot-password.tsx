import dotenv from "dotenv";
dotenv.config();

import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;
const API_SEND_OTP = `${API_BASE}/user/forgot-password`;
const API_RESET_PASSWORD = `${API_BASE}/user/reset-password`;

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP, 3 = Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // ----------------------
  // STEP 1: SEND OTP
  // ----------------------
  const handleSendOtp = async () => {
    if (!email) {
      setResponseMessage("Please enter your email");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(API_SEND_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setResponseMessage(`${data.message || "Failed to send OTP"}`);
        return;
      }

      setResponseMessage("OTP has been sent to your email");
      setStep(2); // Move to OTP entry step
    } catch (err) {
      setLoading(false);
      setResponseMessage("Network error! Try again");
    }
  };

  // ----------------------
  // STEP 2 + 3: RESET PASSWORD
  // ----------------------
  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      setResponseMessage("Enter OTP & New Password");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(API_RESET_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setResponseMessage(`${data.message || "Failed to reset password"}`);
        return;
      }

      setResponseMessage("Password reset successful!");
      setTimeout(() => {
        router.push("/login"); // Redirect to login
      }, 1500);
    } catch (err) {
      setLoading(false);
      setResponseMessage("Unable to reset password");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      {/* STEP 1: Enter Email */}
      {step === 1 && (
        <>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>
        </>
      )}

      {/* STEP 2: Enter OTP */}
      {step === 2 && (
        <>
          <Text style={styles.subtitle}>OTP sent to: {email}</Text>

          <TextInput
            placeholder="Enter OTP"
            style={styles.input}
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => setStep(3)}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}

      {/* STEP 3: Enter New Password */}
      {step === 3 && (
        <>
          <TextInput
            placeholder="Enter new password"
            secureTextEntry
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Reset Password</Text>
            )}
          </TouchableOpacity>
        </>
      )}

      {responseMessage !== "" && (
        <Text style={styles.response}>{responseMessage}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#ff4d5c",
    marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    color: "#777",
  },
  input: {
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
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  response: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
});
