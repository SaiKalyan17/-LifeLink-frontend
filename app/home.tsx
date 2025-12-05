// import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { Redirect, router } from "expo-router";
// import React from "react";
// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useAuth } from "./AuthContext";
// export default function HomeScreen() {
//     const { token, tloading } = useAuth();
//     const { logout } = useAuth();
//     if (tloading) return null;

//     if (!token) {
//         return <Redirect href="/login" />;
//     }
//   const handleLogout = async () => {
//     await logout();                 
//     router.replace("/login");       
//   };

    
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>

//         {/* Greeting */}
//         <Text style={styles.greeting}>Hello, Kalyan 👋</Text>
//         <Text style={styles.subGreeting}>Welcome to PulseConnect</Text>

//         {/* Stats Card */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Nearby Donors</Text>
//           <Text style={styles.cardNumber}>27</Text>
//           <Text style={styles.cardSubtitle}>Available in your area</Text>
//         </View>
        
//         <TouchableOpacity onPress={handleLogout} style={styles.button}>
//             <Text style={styles.buttonText}>Logout</Text>
//         </TouchableOpacity>

//         {/* Quick Actions */}
//         <Text style={styles.sectionTitle}>Quick Actions</Text>

//         <View style={styles.actionContainer}>
//           <TouchableOpacity
//             style={styles.actionBox}
//             onPress={() => router.push("/search")}
//           >
//             <Ionicons name="search" size={28} color="#ff4d5c" />
//             <Text style={styles.actionText}>Search Donors</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionBox}
//             onPress={() => router.push("/emergencyblood")}
//           >
//             <MaterialIcons name="bloodtype" size={28} color="#ff4d5c" />
//             <Text style={styles.actionText}>Emergency Blood</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionBox}
//             onPress={() => router.push("/donor")}
//           >
//             <Feather name="heart" size={28} color="#ff4d5c" />
//             <Text style={styles.actionText}>Become a Donor</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* BOTTOM NAVIGATION */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity onPress={() => router.push("/home")} style={styles.navItem}>
//           <Ionicons name="home" size={26} color="#ff4d5c" />
//           <Text style={styles.navTextActive}>Home</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => router.push("/login")} style={styles.navItem}>
//           <Ionicons name="search-outline" size={26} color="#666" />
//           <Text style={styles.navText}>Search</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => router.push("/createemergencyblood")} style={styles.navItem}>
//           <MaterialIcons name="bloodtype" size={28} color="#666" />
//           <Text style={styles.navText}>Emergency</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => router.push("/login")} style={styles.navItem}>
//           <Ionicons name="person-outline" size={26} color="#666" />
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   greeting: {
//     fontSize: 28,
//     fontWeight: "700",
//     marginTop: 10,
//     marginLeft: 20,
//     color: "#ff4d5c",
//   },

//   subGreeting: {
//     fontSize: 16,
//     marginLeft: 20,
//     marginBottom: 20,
//     color: "#777",
//   },

//   card: {
//     backgroundColor: "#ffe6ea",
//     marginHorizontal: 20,
//     padding: 20,
//     borderRadius: 15,
//     shadowColor: "#ffbac2",
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     elevation: 4,
//   },

//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#ff4d5c",
//   },

//   cardNumber: {
//     fontSize: 40,
//     fontWeight: "800",
//     marginVertical: 5,
//     color: "#ff4d5c",
//   },

//   cardSubtitle: {
//     fontSize: 14,
//     color: "#555",
//   },

//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginLeft: 20,
//     marginTop: 30,
//     marginBottom: 10,
//   },

//   actionContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingHorizontal: 10,
//   },

//   actionBox: {
//     alignItems: "center",
//     backgroundColor: "#f8f8f8",
//     padding: 20,
//     borderRadius: 15,
//     width: "28%",
//     shadowColor: "#ccc",
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },

//   actionText: {
//     fontSize: 14,
//     marginTop: 10,
//     color: "#000",
//     textAlign: "center",
//   },

//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//     backgroundColor: "#fff",
//   },

//   navItem: {
//     alignItems: "center",
//   },

//   navText: {
//     fontSize: 12,
//     color: "#666",
//     marginTop: 4,
//   },

//   navTextActive: {
//     fontSize: 12,
//     color: "#ff4d5c",
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   button: {
//     backgroundColor: "#ff4d5c",
//     paddingVertical: 15,
//     borderRadius: 10,
//     marginTop: 10,
//     alignItems: "center",
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },

// });


import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./AuthContext";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { token, tloading, logout } = useAuth();
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<ScrollView | null>(null);

  if (tloading) return null;
  if (!token) return <Redirect href="/login" />;

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const sliderImages = [
    require("../assets/images/image1.jpg"),
    require("../assets/images/image2.jpg"),
    require("../assets/images/image1.jpg"),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <Text style={styles.greeting}>Hello, Kalyan 👋</Text>
        <Text style={styles.subGreeting}>Welcome to PulseConnect</Text>

        {/* 📸 IMAGE SLIDER */}
        <ScrollView
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  ref={sliderRef}
  onScroll={(e) => {
    const index = Math.round(
      e.nativeEvent.contentOffset.x / width
    );
    setActiveSlide(index);
  }}
>
  {sliderImages.map((img, i) => (
    <Image key={i} source={img} style={styles.sliderImage} />
  ))}
</ScrollView>

        {/* DOT INDICATOR */}
        <View style={styles.dotsContainer}>
          {sliderImages.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                activeSlide === i && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* Stats Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nearby Donors</Text>
          <Text style={styles.cardNumber}>27</Text>
          <Text style={styles.cardSubtitle}>Available in your area</Text>
        </View>

        {/* Logout */}
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionBox}
            onPress={() => router.push("/search")}
          >
            <Ionicons name="search" size={28} color="#ff4d5c" />
            <Text style={styles.actionText}>Search Donors</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBox}
            onPress={() => router.push("/emergencyblood")}
          >
            <MaterialIcons name="bloodtype" size={28} color="#ff4d5c" />
            <Text style={styles.actionText}>Emergency</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBox}
            onPress={() => router.push("/donor")}
          >
            <Feather name="heart" size={28} color="#ff4d5c" />
            <Text style={styles.actionText}>Become Donor</Text>
          </TouchableOpacity>
        </View>

        {/* 💬 TESTIMONIALS */}
        <Text style={styles.sectionTitle}>Testimonials</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["Saved my brother’s life!", "Fast & reliable donors!", "Best blood app"].map(
            (text, i) => (
              <View key={i} style={styles.testimonialCard}>
                <Text style={styles.testimonial}>{text}</Text>
                <Text style={styles.testimonialAuthor}>- User {i + 1}</Text>
              </View>
            )
          )}
        </ScrollView>

        {/* 🩸 ABOUT US */}
        <Text style={styles.sectionTitle}>About PulseConnect</Text>
        <Text style={styles.aboutText}>
          PulseConnect is a life-saving platform that connects blood donors with
          patients in real time. Our mission is to ensure that no one suffers due
          to lack of timely blood availability.
        </Text>

        {/* 👣 FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 PulseConnect</Text>
          <Text style={styles.footerText}>Connecting Lives, Saving Lives</Text>
        </View>
      </ScrollView>

      {/* ✅ BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/home")} style={styles.navItem}>
          <Ionicons name="home" size={26} color="#ff4d5c" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/search")} style={styles.navItem}>
          <Ionicons name="search-outline" size={26} color="#666" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/createemergencyblood")} style={styles.navItem}>
          <MaterialIcons name="bloodtype" size={28} color="#666" />
          <Text style={styles.navText}>Emergency</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/profile")} style={styles.navItem}>
          <Ionicons name="person-outline" size={26} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  greeting: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
    marginLeft: 20,
    color: "#ff4d5c",
  },

  subGreeting: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
    color: "#777",
  },

  sliderImage: {
    width,
    height: 180,
    resizeMode: "cover",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#ff4d5c",
  },

  card: {
    backgroundColor: "#ffe6ea",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 4,
  },

  cardTitle: { fontSize: 18, fontWeight: "600", color: "#ff4d5c" },
  cardNumber: { fontSize: 40, fontWeight: "800", marginVertical: 5, color: "#ff4d5c" },
  cardSubtitle: { fontSize: 14, color: "#555" },

  button: {
    backgroundColor: "#ff4d5c",
    paddingVertical: 14,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
  },

  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 10,
  },

  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  actionBox: {
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 15,
    width: "28%",
  },

  actionText: { fontSize: 14, marginTop: 10, textAlign: "center" },

  testimonialCard: {
    backgroundColor: "#fff0f3",
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 10,
    width: 220,
  },

  testimonial: { fontSize: 15, fontStyle: "italic" },
  testimonialAuthor: { marginTop: 10, fontWeight: "700", color: "#ff4d5c" },

  aboutText: {
    marginHorizontal: 20,
    lineHeight: 22,
    fontSize: 15,
    color: "#555",
  },

  footer: {
    marginTop: 30,
    paddingVertical: 20,
    alignItems: "center",
  },

  footerText: {
    fontSize: 13,
    color: "#888",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  navItem: { alignItems: "center" },

  navText: { fontSize: 12, color: "#666", marginTop: 4 },

  navTextActive: {
    fontSize: 12,
    color: "#ff4d5c",
    marginTop: 4,
    fontWeight: "700",
  },
});

