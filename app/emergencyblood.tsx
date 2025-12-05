import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;
const API_GET_CITIES = `${API_BASE}/user/get-cities`;
const API_GET_EMERGENCY =
  `${API_BASE}/user/get-emergency-blood`; // + /:city

export default function EmergencySearchScreen() {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [results, setResults] = useState<any[]>([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [loadingCities, setLoadingCities] = useState(true);
  const [loading, setLoading] = useState(false);

  // --------------------------
  // Load cities
  // --------------------------
  const fetchCities = async () => {
    try {
      const res = await fetch(API_GET_CITIES);
      const data = await res.json();

      if (res.ok) {
        setCities(data.data);
      } else {
        setResponseMessage("Unable to load cities");
      }
    } catch (err) {
      setResponseMessage("Network error while loading cities");
    }
    setLoadingCities(false);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // --------------------------
  // Search emergency blood
  // --------------------------
  const handleSearch = async () => {
    if (!selectedCity) {
      setResponseMessage("❌ Please select city");
      return;
    }

    setLoading(true);
    setResults([]);
    setResponseMessage("");

    try {
      const res = await fetch(`${API_GET_EMERGENCY}/${selectedCity}`);
      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        setResponseMessage(`❌ ${data.message}`);
        return;
      }

      setResults(data.data);
      setResponseMessage(`Found ${data.count} emergency requests`);
    } catch (err) {
      setLoading(false);
      setResponseMessage("❌ Network error");
    }
  };

  // --------------------------
  // Date Formatter
  // --------------------------
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------
  // UI
  // --------------------------
  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={results}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Emergency Blood Search</Text>

            {/* CITY DROPDOWN */}
            <View style={styles.dropdown}>
              {loadingCities ? (
                <ActivityIndicator color="#ff4d5c" />
              ) : (
                <Picker
                  selectedValue={selectedCity}
                  onValueChange={(val) => setSelectedCity(val)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select City" value="" />
                  {cities.map((city, i) => (
                    <Picker.Item label={city} value={city} key={i} />
                  ))}
                </Picker>
              )}
            </View>

            {/* SEARCH BUTTON */}
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Search</Text>
              )}
            </TouchableOpacity>

            {/* MESSAGE */}
            {responseMessage !== "" && (
              <Text style={styles.message}>{responseMessage}</Text>
            )}
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardName}>{item.name}</Text>

            <Text style={styles.cardText}>
              Blood Group: <Text style={styles.bold}>{item.bloodGroup}</Text>
            </Text>

            <Text style={styles.cardText}>
              City: <Text style={styles.bold}>{item.city}</Text>
            </Text>

            <Text style={styles.cardText}>
              Mobile: <Text style={styles.bold}>{item.mobileNumber}</Text>
            </Text>

            <Text style={styles.cardText}>
              Packets Needed: <Text style={styles.bold}>{item.packets}</Text>
            </Text>

            <Text style={styles.cardDate}>
              Requested On: {formatDate(item.createdAt)}
            </Text>
          </View>
        )}
        ListFooterComponent={<View style={{ height: 40 }} />}
      />
    </SafeAreaView>
  );
}

// ---------------------------
// STYLES
// ---------------------------
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  container: {
    padding: 20,
    width: "100%",
    maxWidth: 450,
    alignSelf: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ff4d5c",
    textAlign: "center",
    marginBottom: 20,
  },

  dropdown: {
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 12,
    overflow: "hidden",
  },

  picker: {
    height: 55,
    width: "100%",
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
    fontSize: 18,
    fontWeight: "700",
  },

  message: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#ffe6ea",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffccd3",
    marginBottom: 12,
  },

  cardName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff2e45",
  },

  cardText: {
    fontSize: 15,
    marginTop: 3,
  },

  bold: {
    fontWeight: "700",
    color: "#333",
  },

  cardDate: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: "italic",
    color: "#444",
  },
});
