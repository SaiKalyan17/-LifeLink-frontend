import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_VERIFY = `${API_BASE}/user/verify-otp`;
const API_RESEND = `${API_BASE}/user/resend-otp`;

export default function VerifyOtpScreen(){
  const { email } = useLocalSearchParams<{ email?: string }>(); // may be undefined
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [cooldown, setCooldown] = useState(0); // seconds remaining for resend cooldown

  // NOTE: in RN setInterval returns a number
  useEffect(() => {
    let timer: number | null = null;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((c) => {
          if (c <= 1) {
            if (timer !== null) {
              clearInterval(timer);
            }
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer !== null) clearInterval(timer);
    };
  }, [cooldown]);

  const handleVerify = async () => {
    if (!otp) {
      setResponseMessage("❌ Please enter OTP");
      return;
    }
    if (!email) {
      setResponseMessage("❌ Missing email");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(API_VERIFY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setResponseMessage(
          `❌ Verification Failed: ${data?.message || "Invalid OTP"}`
        );
        return;
      }

      setResponseMessage("✅ OTP Verified Successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      console.error("verify error:", err);
      setLoading(false);
      setResponseMessage("❌ Unable to verify OTP. Check your connection.");
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setResponseMessage("❌ Missing email to resend OTP.");
      return;
    }
    if (cooldown > 0) return;

    setResendLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(API_RESEND, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setResendLoading(false);

      if (!response.ok) {
        setResponseMessage(`❌ Failed to resend OTP: ${data?.message || "Try again"}`);
        return;
      }

      setResponseMessage("📩 New OTP sent to your email!");
      setCooldown(30); // start 30s cooldown
    } catch (err) {
      console.error("resend error:", err);
      setResendLoading(false);
      setResponseMessage("❌ Unable to resend OTP. Check your connection.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>

      <Text style={styles.subtitle}>OTP sent to: {email ?? "your email"}</Text>

      <TextInput
        placeholder="Enter OTP"
        style={styles.input}
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerify}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.resendButton, cooldown > 0 && styles.resendDisabled]}
          onPress={handleResendOtp}
          disabled={resendLoading || cooldown > 0}
        >
          {resendLoading ? (
            <ActivityIndicator color="#ff4d5c" />
          ) : (
            <Text
              style={[
                styles.resendButtonText,
                cooldown > 0 && styles.resendDisabledText,
              ]}
            >
              {cooldown > 0 ? `Resend OTP (${cooldown}s)` : "Resend OTP"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {responseMessage !== "" && <Text style={styles.response}>{responseMessage}</Text>}
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
    marginTop: 40,
    textAlign: "center",
    color: "#ff4d5c",
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#777",
    fontSize: 15,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 3,
  },
  button: {
    backgroundColor: "#ff4d5c",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  row: {
    marginTop: 16,
    alignItems: "center",
  },
  resendButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ff4d5c",
    backgroundColor: "transparent",
  },
  resendButtonText: {
    color: "#ff4d5c",
    fontWeight: "600",
  },
  resendDisabled: {
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
  },
  resendDisabledText: {
    color: "#bbb",
  },
  response: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
});
