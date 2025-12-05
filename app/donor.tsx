// // app/create-donor.tsx
// import { router } from "expo-router";
// import React, { useState } from "react";
// import {
//     ActivityIndicator,
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const API_CREATE_DONOR = `${import.meta.env.VITE_API_BASE_URL}/user/create-donor`;

// export default function CreateDonorScreen(): JSX.Element {
//   const [name, setName] = useState("");
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [dob, setDob] = useState(""); // YYYY-MM-DD
//   const [loading, setLoading] = useState(false);
//   const [responseMessage, setResponseMessage] = useState<string | null>(null);

//   const validate = () => {
//     if (!name.trim()) return "Please enter name";
//     if (!bloodGroup.trim()) return "Please enter blood group";
//     if (!mobileNumber.trim()) return "Please enter mobile number";
//     if (!city.trim()) return "Please enter city";
//     if (!address.trim()) return "Please enter address";
//     if (!email.trim()) return "Please enter email";
//     if (!dob.trim()) return "Please enter date of birth (YYYY-MM-DD)";
//     // basic email regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) return "Please enter a valid email";
//     // basic mobile check
//     if (!/^\d{10,15}$/.test(mobileNumber)) return "Please enter a valid mobile number";
//     return null;
//   };

//   const handleCreate = async () => {
//     const err = validate();
//     if (err) {
//       setResponseMessage(`❌ ${err}`);
//       return;
//     }

//     setLoading(true);
//     setResponseMessage(null);

//     try {
//       const res = await fetch(API_CREATE_DONOR, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           bloodGroup,
//           mobileNumber,
//           city,
//           address,
//           email,
//           dob,
//         }),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (!res.ok) {
//         setResponseMessage(`❌ ${data?.message || "Failed to create donor"}`);
//         return;
//       }

//       setResponseMessage("✅ Donor created successfully!");
//       // Optionally redirect to home or donor list
//       setTimeout(() => {
//         router.push("/home");
//       }, 1200);
//     } catch (err) {
//       setLoading(false);
//       setResponseMessage("❌ Network error — unable to create donor");
//       console.error("create-donor error:", err);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.select({ ios: "padding", android: undefined })}
//       >
//         <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
//           <Text style={styles.title}>Become a Donor</Text>

//           <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
//           <TextInput placeholder="Blood Group (e.g. AB+)" style={styles.input} value={bloodGroup} onChangeText={setBloodGroup} />
//           <TextInput placeholder="Mobile Number" style={styles.input} keyboardType="phone-pad" value={mobileNumber} onChangeText={setMobileNumber} />
//           <TextInput placeholder="City" style={styles.input} value={city} onChangeText={setCity} />
//           <TextInput placeholder="Address" style={[styles.input, styles.multiline]} value={address} onChangeText={setAddress} multiline />
//           <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail} />
//           <TextInput placeholder="DOB (YYYY-MM-DD)" style={styles.input} value={dob} onChangeText={setDob} />

//           <TouchableOpacity style={styles.button} onPress={handleCreate} activeOpacity={0.8}>
//             {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Donor</Text>}
//           </TouchableOpacity>

//           {responseMessage ? <Text style={styles.response}>{responseMessage}</Text> : null}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: "#fff" },
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#ff4d5c",
//     marginBottom: 12,
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#f2f2f2",
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: 12,
//     fontSize: 16,
//   },
//   multiline: {
//     minHeight: 80,
//     textAlignVertical: "top",
//   },
//   button: {
//     backgroundColor: "#ff4d5c",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 6,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   response: {
//     marginTop: 14,
//     textAlign: "center",
//     fontSize: 15,
//     color: "#333",
//   },
// });


import { Picker } from "@react-native-picker/picker";
import { Redirect, router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_CREATE_DONOR = `${API_BASE}/user/create-donor`;

export default function CreateDonorScreen() {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const { token, tloading } = useAuth();
  if (tloading) return null;

  if (!token) {
    return <Redirect href="/login" />;
  }
  const validate = () => {
    if (!name) return "Please enter your name";
    if (!bloodGroup) return "Please select blood group";
    if (!mobileNumber) return "Please enter mobile number";
    if (!city) return "Please enter city";
    if (!address) return "Please enter address";
    if (!email) return "Please enter email";
    if (!dob) return "Please enter date of birth";
    return null;
  };

  const handleCreate = async () => {
    const error = validate();
    if (error) {
      setResponseMessage(`❌ ${error}`);
      return;
    }

    setLoading(true);
    setResponseMessage("");

    try {
      const res = await fetch(API_CREATE_DONOR, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          bloodGroup,
          mobileNumber,
          city,
          address,
          email,
          dob,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setResponseMessage(`❌ ${data.message || "Something went wrong"}`);
        return;
      }

      setResponseMessage("✅ Donor created successfully!");

      setTimeout(() => {
        router.push("/home");
      }, 1500);
    } catch (err) {
      setLoading(false);
      setResponseMessage("❌ Network error, please try again");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.formWrapper}>
            <Text style={styles.title}>Become a Donor</Text>

            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            {/* BLOOD GROUP DROPDOWN */}
            <View style={styles.dropdownContainer}>
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

            <TextInput
              placeholder="Mobile Number"
              style={styles.input}
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />

            <TextInput
              placeholder="City"
              style={styles.input}
              value={city}
              onChangeText={setCity}
            />

            <TextInput
              placeholder="Address"
              style={[styles.input, styles.multiline]}
              value={address}
              onChangeText={setAddress}
              multiline
            />

            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="DOB (YYYY-MM-DD)"
              style={styles.input}
              value={dob}
              onChangeText={setDob}
            />

            <TouchableOpacity style={styles.button} onPress={handleCreate}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Create Donor</Text>
              )}
            </TouchableOpacity>

            {responseMessage !== "" && (
              <Text style={styles.response}>{responseMessage}</Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    padding: 20,
    alignItems: "center",
  },

  formWrapper: {
    width: "100%",
    maxWidth: 450, // prevents stretching on large screens
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ff4d5c",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#f4f4f4",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  multiline: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  dropdownContainer: {
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  picker: {
    height: 55,
    width: "100%",
  },

  button: {
    backgroundColor: "#ff4d5c",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  response: {
    marginTop: 14,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
});
