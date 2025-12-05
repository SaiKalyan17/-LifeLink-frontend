import { Picker } from "@react-native-picker/picker";
import Constants from "expo-constants";
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

const API_BASE = Constants.expoConfig?.extra?.API_BASE_URL;
const API_GET_CITIES = `${API_BASE}/user/get-cities`;
const API_SEARCH_CITY_BG = `${API_BASE}/user/get-by-bloodgroup`;
const API_SEARCH_CITY_ONLY = `${API_BASE}/user/get-donors`;

export default function SearchScreen() {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(true);
  const [message, setMessage] = useState("");

  // ------------------------------
  // Fetch Cities
  // ------------------------------
  const fetchCities = async () => {
    try {
      const res = await fetch(API_GET_CITIES);
      const data = await res.json();

      if (res.ok) {
        setCities(data.data);
      } else {
        setMessage("Unable to load cities");
      }
    } catch (err) {
      setMessage("Network error while loading cities");
    }
    setLoadingCities(false);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // ------------------------------
  // SEARCH
  // ------------------------------
  const handleSearch = async () => {
    if (!selectedCity) {
      setMessage("Please select city");
      return;
    }

    setLoading(true);
    setMessage("");
    setResults([]);

    try {
      let res;
      let data;

      if (selectedBloodGroup) {
        res = await fetch(API_SEARCH_CITY_BG, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city: selectedCity,
            bloodGroup: selectedBloodGroup,
          }),
        });
        data = await res.json();
      } else {
        res = await fetch(`${API_SEARCH_CITY_ONLY}/${selectedCity}`);
        data = await res.json();
      }

      setLoading(false);

      if (!res.ok) {
        setMessage(`❌ ${data.message}`);
        return;
      }

      setResults(data.data);
      setMessage(`Found ${data.count} donors`);
    } catch (err) {
      setLoading(false);
      setMessage("❌ Network error");
    }
  };

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={results}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Search Donors</Text>

            {/* CITY */}
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
                  {cities.map((city, index) => (
                    <Picker.Item label={city} value={city} key={index} />
                  ))}
                </Picker>
              )}
            </View>

            {/* BLOOD GROUP */}
            <View style={styles.dropdown}>
              <Picker
                selectedValue={selectedBloodGroup}
                onValueChange={(val) => setSelectedBloodGroup(val)}
                style={styles.picker}
              >
                <Picker.Item label="Select Blood Group (Optional)" value="" />
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

            {/* SEARCH BUTTON */}
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Search</Text>
              )}
            </TouchableOpacity>

            {/* MESSAGE */}
            {message !== "" && <Text style={styles.message}>{message}</Text>}
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardText}>
              Blood Group: {item.bloodGroup}
            </Text>
            <Text style={styles.cardText}>
              Mobile: {item.mobileNumber}
            </Text>
            <Text style={styles.cardText}>City: {item.city}</Text>
            <Text style={styles.cardText}>Email: {item.email}</Text>
          </View>
        )}
        ListFooterComponent={<View style={{ height: 40 }} />}
      />
    </SafeAreaView>
  );
}

// ------------------------------
// STYLES
// ------------------------------
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
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
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
    width: "100%",
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
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#444",
  },

  card: {
    backgroundColor: "#ffecef",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ffd6dc",
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
});
