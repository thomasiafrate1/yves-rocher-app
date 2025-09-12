// app/form.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { useRouter } from "expo-router";
import { ImageBackground } from "react-native";

export default function FormScreen() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = () => {
  const { nom, prenom, email } = form;

  if (!nom || !prenom || !email) {
    Alert.alert("Tous les champs sont obligatoires");
    return;
  }

  // ✅ Vérification du format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Alert.alert("Adresse email invalide", "Veuillez entrer une adresse email valide.");
    return;
  }

  if (!accepted) {
    Alert.alert("Consentement requis", "Veuillez accepter l'utilisation de vos données.");
    return;
  }

  // Aller au questionnaire avec les données utilisateur
  router.push({
    pathname: "/questionnaire",
    params: {
      nom,
      prenom,
      email,
    },
  });
};


  return (
    <ImageBackground
          source={require("../assets/images/fond.png")}
          resizeMode="cover"   // ✅ remplissage total, peut couper un peu
          style={styles.background}
        >
          <TouchableOpacity style={styles.closeButton} onPress={router.back}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>FORMULAIRE</Text>

        <Text style={styles.text}>NOM</Text>
        <TextInput
          style={styles.input}
          value={form.nom}
          onChangeText={(text) => handleChange("nom", text)}
        />
        <Text style={styles.text}>PRENOM</Text>
        <TextInput
          style={styles.input}
          value={form.prenom}
          onChangeText={(text) => handleChange("prenom", text)}
        />
        <Text style={styles.text}>E-MAIL</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />  

        <TouchableOpacity onPress={() => router.push("/confidentialite")} style={{ marginTop: 20 }}>
  <Text style={{ color: "#4F6A2C", textDecorationLine: "underline" }}>
    Lire la politique de confidentialité
  </Text>
</TouchableOpacity>

        
        <TouchableOpacity onPress={() => setAccepted(!accepted)} style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
  <View style={{
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#4F6A2C",
    backgroundColor: accepted ? "#4F6A2C" : "transparent",
    marginRight: 10
  }} />
  <Text>J’accepte que mes données soient utilisées pour le diagnostic</Text>
</TouchableOpacity>

        
        <TouchableOpacity style={styles.button} onPress={() => {
  console.log("Bouton cliqué !");
  handleSubmit();
}}
>
          <Text style={styles.buttonText}>C'EST PARTI</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    backgroundColor: "transparent",
    flexGrow: 1,
    alignItems: "center",
  },
    closeButton: {
  position: "absolute",
  top: 40,
  right: 20,
  backgroundColor: "#4F6A2C",
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
  elevation: 5,
},
closeText: {
  color: "#fff",
  fontSize: 24,
  lineHeight: 24,
  fontWeight: "bold",
},
  title: {
    fontSize: 60,
    color: "#4F6A2C",
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 10,
    marginTop: 70,
  },
  text :{
    fontSize: 28,
    color: "#4F6A2C",
    letterSpacing: 10,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 5,
    
  },
  background: {
  flex: 1,
  width: "100%",
  height: "100%",
},
  input: {
    
    backgroundColor: "#E6D8B1",
    borderColor: "#4F6A2C",
    borderWidth: 5,
    marginBottom: 20,
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    width: 500,
    height: 57,
  },
  button: {
    backgroundColor: "#4F6A2C",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 2,
    
    marginTop: 100,
  },
  buttonText: {
    color: "#E1DCBC",
    fontSize: 28,
    width: 300,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#4F6A2C",
  },
});
