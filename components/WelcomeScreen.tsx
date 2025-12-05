import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={["#ff3d47", "#ff4f8b", "#b83df5"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}  // <-- FIX PATH
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>PulseConnect</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          
          {/* Login Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={() => router.push("/register")}
          >
            <Text style={[styles.buttonText, styles.registerButtonText]}>
              Register
            </Text>
          </TouchableOpacity>

        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 90,
  },

  logo: {
    width: 180,
    height: 180,
  },

  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
  },

  buttonsContainer: {
    marginBottom: 80,
    alignItems: "center",
    width: "100%",
  },

  button: {
    width: "70%",
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff3d47",
  },

  registerButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#fff",
  },

  registerButtonText: {
    color: "#fff",
  },
});
