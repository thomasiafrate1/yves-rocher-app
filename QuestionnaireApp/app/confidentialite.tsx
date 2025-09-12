// app/confidentialite.tsx
import { ScrollView, Text, StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ConfidentialiteScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/fond.png")}
      resizeMode="cover"
      style={styles.background}
    >
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Politique de confidentialité</Text>

        <Text style={styles.text}>
          Nous collectons les données suivantes : nom, prénom, email, et vos réponses
          au questionnaire de soin visage. Ces données servent uniquement à établir
          un diagnostic personnalisé et à vous proposer des produits adaptés.
        </Text>

        <Text style={styles.text}>
          Les données sont stockées de façon sécurisée dans Firebase (Google Cloud),
          qui peut héberger les serveurs hors de l’Union Européenne.
        </Text>

        <Text style={styles.text}>
          Nous ne partageons pas vos données avec des tiers. Elles sont conservées
          uniquement le temps nécessaire à l’utilisation de l’application.
        </Text>
        <Text style={styles.text}>
          Vos données sont conservées pendant une durée maximale de 6 mois après votre dernier diagnostic, sauf si vous en demandez la suppression avant.
        </Text>
        <Text style={styles.text}>
        Le traitement de vos données personnelles repose sur votre consentement (article 6.1.a du Règlement Général sur la Protection des Données - RGPD).
        </Text>

        <Text style={styles.text}>
  Pour toute demande (modification ou suppression de vos données), contactez-nous à :
  <Text style={{ fontWeight: "bold", color: "#4F6A2C" }}> contact@yves-rocher-app.com</Text>

</Text>
<View style={{ marginTop: 30 }}>
  <Text style={styles.sectionTitle}>Mentions légales</Text>
  <Text style={styles.text}>Responsable de l’application : Iafrate Thomas / SARL SAGYR</Text>
  <Text style={styles.text}>Contact : contact@yves-rocher-app.com</Text>
  <Text style={styles.text}>Hébergement : Google Firebase (Google Cloud Platform)</Text>
</View>

    <Text style={styles.version}>Politique mise à jour le 12 septembre 2025</Text>


      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    padding: 24,
    backgroundColor: "#E6D8B1",
    width:"80%",   
    marginLeft:"auto",
    marginRight:"auto",
    margin : "auto",
    borderRadius: 0,
    borderColor: "#4F6A2C",
    borderWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 24,
    textAlign: "center",
    color: "#4F6A2C",
    borderBottomWidth: 3,
    borderBottomColor: "#4F6A2C",
    paddingBottom: 8,
    letterSpacing: 1,
  },
  version: {
  marginTop: 30,
  fontSize: 12,
  fontStyle: "italic",
  textAlign: "center",
  color: "#999",
},

  text: {
    fontSize: 17,
    marginBottom: 18,
    lineHeight: 26,
    textAlign: "justify",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    color: "#4F6A2C",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
    closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#4F6A2C",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
