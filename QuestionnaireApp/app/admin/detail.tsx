// app/admin/detail.tsx
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { questions } from "../questionnaire";
import { imagesMap } from "@/lib/imagesMap";
import { ImageBackground } from "react-native";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";


type Diagnostic = {
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  date: string;
  reponses: Record<string, any>;
  produits: {
    id: string;
    nom: string;
    description: string;
    photoLocal: string;
  }[];
};

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<Diagnostic | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const ref = doc(db, "historique", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setData(snap.data() as Diagnostic);
      }
    };
    fetchDetail();
  }, []);

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  
  return (
    <ImageBackground
      source={require("../../assets/images/fond.png")}
      resizeMode="cover"   // ✅ remplissage total, peut couper un peu
      style={styles.background}
    >
      <TouchableOpacity style={styles.closeButton} onPress={router.back}>
  <Text style={styles.closeText}>✕</Text>
</TouchableOpacity>

    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section1}>
        <Text style={styles.title}>{data.prenom} {data.nom}</Text>
        <Text style={styles.subtitle}>{data.email}</Text>
        <Text>{data.adresse}</Text>
        <Text style={styles.date}>{data.date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Réponses au questionnaire</Text>
        {Object.entries(data.reponses).map(([questionId, reponse]) => {
          const question = questions.find((q) => q.id === questionId);
          return (
            <View key={questionId} style={styles.questionBlock}>
              <Text style={styles.question}>{question?.question}</Text>
              <Text style={styles.answer}>{reponse.label}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Produits proposés :</Text>
  <View style={styles.productContainer}>
    {data.produits.map((produit) => (
      <View key={produit.id} style={styles.productCard}>
        <Image
          source={imagesMap[produit.photoLocal] || require("@/assets/images/adaptive-icon.png")}
          style={styles.image}
        />
        <Text style={styles.productName}>{produit.nom}</Text>
      </View>
    ))}
  </View>
</View>

    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "transparent",
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#4F6A2C",
    textAlign: "center",
    letterSpacing: 6,
    marginBottom: 12,
    marginTop: 30,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#4F6A2C",
    textAlign: "center",
    letterSpacing: 6,
    marginBottom: 12,
  },
  date: {
    color: "#4F6A2C",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    width: "90%",
    backgroundColor: "#E6D8B1",
    borderColor: "#4F6A2C",
    borderWidth: 2,
    padding: 20,
    marginBottom: 30,
  },
  section1: {
    width: "90%",
    textAlign: "center",
    alignItems: "center",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4F6A2C",
    marginBottom: 10,
  },
  questionBlock: {
    marginBottom: 10,
  },
  question: {
    fontWeight: "bold",
    color: "#4F6A2C",
    fontSize: 16,
  },
  answer: {
    fontSize: 15,
    color: "#333",
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
    flexWrap: "wrap",
  },
  productCard: {
    alignItems: "center",
    width: 130,
    marginBottom: 20,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
});
