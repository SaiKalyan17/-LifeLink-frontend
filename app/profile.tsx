import dotenv from "dotenv";
dotenv.config();

import { Redirect, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./AuthContext";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;
const API_PROFILE = `${API_BASE}/user/profile`;

export default function ProfileScreen() {
  const { token, tloading, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // ✅ Block access if not logged in
  if (!token && !tloading) {
    return <Redirect href="/login" />;
  }

  // ✅ Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await fetch(API_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message || "Failed to fetch profile");
        return;
      }

      setUser(data.data);
    } catch (err) {
      Alert.alert("Error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  // ✅ Logout handler
  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#ff4d5c" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {/* USER INFO CARD */}
      <View style={styles.card}>
        <Row label="User Name" value={user?.userName} />
        <Row label="Email" value={user?.email} />
        <Row label="Mobile" value={user?.mobileNumber} />
        <Row label="Password" value="********" />
      </View>

      {/* RESET PASSWORD */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/forgot-password")}
      >
        <Text style={styles.secondaryText}>Reset Password</Text>
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ---------------- SMALL REUSABLE FIELD ROW ---------------- */

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#ff4d5c",
    textAlign: "center",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#ffe6ea",
    borderRadius: 16,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#ffccd3",
  },

  row: {
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777",
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginTop: 4,
  },

  secondaryButton: {
    borderWidth: 2,
    borderColor: "#ff4d5c",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  secondaryText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ff4d5c",
  },

  logoutButton: {
    backgroundColor: "#ff4d5c",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
