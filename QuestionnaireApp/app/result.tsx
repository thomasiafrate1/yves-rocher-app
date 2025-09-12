// ✅ Résultat avec 2 produits JOUR + 2 produits NUIT
// ✅ Support des moments en tableau: moment: ["jour", "nuit"] dans Firestore

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, Timestamp, addDoc } from "firebase/firestore";
import { imagesMap } from "@/lib/imagesMap";

// 🔧 Type produit avec moment en tableau
type Produit = {
  id: string;
  nom: string;
  description: string;
  photoLocal: string;
  typePeau: string;
  moment: string[];
};

export default function ResultScreen() {
  const { nom, prenom, email, reponses } = useLocalSearchParams();
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);

  const parsedReponses = JSON.parse(reponses as string);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const snapshot = await getDocs(collection(db, "produits"));
        const data = snapshot.docs.map((doc) => doc.data() as Produit);
        
        
        const detected = detectTypePeau(parsedReponses);
        const filtered = data.filter((p) => p.typePeau.includes(detected));
        console.log("🔍 Reponses :", parsedReponses);
        console.log("🧬 Type détecté :", detected);
        console.log("🎯 Produits filtrés :", filtered);


        setProduits(filtered);

        await saveDiagnostic({
          nom,
          prenom,
          email,
          
          createdAt: Timestamp.now(),
          reponses: parsedReponses,
          produits: filtered,
        });
      } catch (error) {
        console.error("Erreur chargement produits:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchProduits();
  }, []);

  const produitsJour = produits.filter((p) => p.moment.includes("jour")).slice(0, 2);
  const produitsNuit = produits.filter((p) => p.moment.includes("nuit")).slice(0, 2);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7abf4e" />
        <Text style={{ marginTop: 10 }}>Analyse en cours...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/fond.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>RESULTAT</Text>

        <View style={styles.resultBox}>
  <Text style={styles.sousTitre}>JOUR</Text>
  {produits.slice(0, 2).map((produit) => (
    <View key={produit.id} style={styles.produit}>
      <Image source={imagesMap[produit.photoLocal]} style={styles.image} />
      <View style={styles.texteProduit}>
        <Text style={styles.nom}>{produit.nom}</Text>
        <Text style={styles.desc}>{produit.description}</Text>
      </View>
    </View>
  ))}

  <Text style={styles.sousTitre}>NUIT</Text>
  {produits.slice(2, 4).map((produit) => (
    <View key={produit.id} style={styles.produit}>
      <Image source={imagesMap[produit.photoLocal]} style={styles.image} />
      <View style={styles.texteProduit}>
        <Text style={styles.nom}>{produit.nom}</Text>
        <Text style={styles.desc}>{produit.description}</Text>
      </View>
    </View>
  ))}
</View>


        <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>QUITTER</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

function detectTypePeau(reponses: Record<string, any>): string {
  const score: Record<string, number> = {};
  Object.values(reponses).forEach((reponse) => {
    const types = reponse.typePeau?.split("_") || [];
    types.forEach((type) => {
      if (!score[type]) score[type] = 0;
      score[type]++;
    });
  });
  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || "inconnu";
}

async function saveDiagnostic(data: any) {
  try {
    await addDoc(collection(db, "historique"), data);
    console.log("✅ Diagnostic sauvegardé !");
  } catch (error) {
    console.error("❌ Erreur sauvegarde:", error);
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 60,
    color: "#4F6A2C",
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 10,
    marginTop: 30,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  produit: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    gap: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  texteProduit: {
    flex: 1,
  },
  nom: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "left",
  },
  desc: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 8,
  },
  resultBox: {
    width: "90%",
    backgroundColor: "#E6D8B1",
    borderWidth: 2,
    borderColor: "#4F6A2C",
    borderRadius: 12,
    padding: 20,
    alignSelf: "center",
  },
  sousTitre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4F6A2C",
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#4F6A2C",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: "#fff",
  },
});
