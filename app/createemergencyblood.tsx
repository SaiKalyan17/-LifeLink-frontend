import { Redirect, router } from "expo-router";
import React, { useState } from "react";
import { useAuth } from "./AuthContext";

import { Picker } from "@react-native-picker/picker";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_CREATE_EMERGENCY = `${API_BASE}/user/emergency-blood`;

export default function EmergencyBloodCreateScreen() {
  const { token, tloading } = useAuth();
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [packets, setPackets] = useState("");

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  if (tloading) return null;

  if (!token) {
    return <Redirect href="/login" />;
  }
  // -----------------------------
  // Create Emergency Blood Request
  // -----------------------------
  const handleCreateRequest = async () => {
    if (
      !name ||
      !bloodGroup ||
      !mobileNumber ||
      !city ||
      !address ||
      !email ||
      !packets
    ) {
      setResponseMessage("❌ Please fill all fields");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    try {
      const res = await fetch(API_CREATE_EMERGENCY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          bloodGroup,
          mobileNumber,
          city,
          address,
          email,
          packets: Number(packets),
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setResponseMessage(`❌ ${data.message}`);
        return;
      }
      
      setResponseMessage("✅ Emergency request submitted successfully!");
      
      // Optional clear form
      setName("");
      setBloodGroup("");
      setMobileNumber("");
      setCity("");
      setAddress("");
      setEmail("");
      setPackets("");
      
      // Redirect to home after success
      setTimeout(() => {
        router.push("/home");
      }, 1000);
      
    } catch (error) {
      setLoading(false);
      setResponseMessage("❌ Network error. Try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Emergency Blood Request</Text>

        {/* Full Name */}
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* Blood Group */}
        <View style={styles.dropdown}>
          <Picker
            selectedValue={bloodGroup}
            onValueChange={(val) => setBloodGroup(val)}
            style={styles.picker}
          >
            <Picker.Item label="Select Blood Group" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
          </Picker>
        </View>

        {/* Mobile Number */}
        <TextInput
          placeholder="Mobile Number"
          style={styles.input}
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

        {/* City */}
        <TextInput
          placeholder="City"
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />

        {/* Address */}
        <TextInput
          placeholder="Address"
          style={[styles.input, styles.multiline]}
          multiline
          value={address}
          onChangeText={setAddress}
        />

        {/* Email */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Packets */}
        <TextInput
          placeholder="No. of Blood Packets Required"
          style={styles.input}
          keyboardType="numeric"
          value={packets}
          onChangeText={setPackets}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleCreateRequest}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit Request</Text>
          )}
        </TouchableOpacity>

        {/* Response Message */}
        {responseMessage !== "" && (
          <Text style={styles.response}>{responseMessage}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  container: {
    padding: 20,
    maxWidth: 450,
    alignSelf: "center",
    width: "100%",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ff4d5c",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#f4f4f4",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  dropdown: {
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    overflow: "hidden",
  },

  picker: {
    height: 55,
    width: "100%",
  },

  multiline: {
    minHeight: 70,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#ff4d5c",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  response: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});


