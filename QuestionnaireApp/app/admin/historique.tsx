// app/admin/historique.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Platform, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

type Diagnostic = {
  id: string;
  nom: string;
  prenom: string;
  date: string;       // version affichage
  createdAt: Date;    // version Date pour le tri
};

export default function HistoriqueScreen() {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [sortMode, setSortMode] = useState<"recent" | "oldest" | "az" | "za">("recent");
  const router = useRouter();

  useEffect(() => {
    const fetchDiagnostics = async () => {
      const snapshot = await getDocs(collection(db, "historique"));
      const data = snapshot.docs.map((d) => {
        const raw = d.data();
        const created = raw.createdAt?.toDate() || new Date();

        return {
          id: d.id,
          nom: raw.nom,
          prenom: raw.prenom,
          createdAt: created,
          date: created.toLocaleDateString("fr-FR"),
        };
      }) as Diagnostic[];
      setDiagnostics(data);
    };

    fetchDiagnostics();
  }, []);

  // ✅ Appliquer le tri
  const sortedDiagnostics = [...diagnostics].sort((a, b) => {
    switch (sortMode) {
      case "recent":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime();
      case "az":
        return a.nom.localeCompare(b.nom);
      case "za":
        return b.nom.localeCompare(a.nom);
      default:
        return 0;
    }
  });

  const handleDelete = async (id: string) => {
    const confirm =
      Platform.OS === "web"
        ? window.confirm("Voulez-vous vraiment supprimer ce diagnostic ?")
        : true;

    if (confirm) {
      try {
        await deleteDoc(doc(db, "historique", id));
        setDiagnostics((prev) => prev.filter((d) => d.id !== id));
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/fond.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <TouchableOpacity style={styles.closeButton} onPress={router.back}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container} key={diagnostics.length}>
        <Text style={styles.title}>HISTORIQUE</Text>


<View style={styles.sortBar}>
  <TouchableOpacity
    style={[styles.sortButton, sortMode === "recent" && styles.sortButtonActive]}
    onPress={() => setSortMode("recent")}
  >
    <Text style={[styles.sortText, sortMode === "recent" && styles.sortTextActive]}>
      Plus récents
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.sortButton, sortMode === "oldest" && styles.sortButtonActive]}
    onPress={() => setSortMode("oldest")}
  >
    <Text style={[styles.sortText, sortMode === "oldest" && styles.sortTextActive]}>
      Plus anciens
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.sortButton, sortMode === "az" && styles.sortButtonActive]}
    onPress={() => setSortMode("az")}
  >
    <Text style={[styles.sortText, sortMode === "az" && styles.sortTextActive]}>
      A → Z
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.sortButton, sortMode === "za" && styles.sortButtonActive]}
    onPress={() => setSortMode("za")}
  >
    <Text style={[styles.sortText, sortMode === "za" && styles.sortTextActive]}>
      Z → A
    </Text>
  </TouchableOpacity>
</View>


        {sortedDiagnostics.map((d) => (
          <View key={d.id} style={styles.card}>
            {/* Partie gauche : détails du diagnostic */}
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={0.7}
              onPress={() =>
                router.push({
                  pathname: "/admin/detail",
                  params: { id: d.id },
                })
              }
            >
              <Text style={styles.nom}>{`${d.prenom} ${d.nom}`}</Text>
              <Text style={styles.sousTitre}>Diagnostic soin visage</Text>
              <Text style={styles.date}>{d.date}</Text>
            </TouchableOpacity>

            {/* Partie droite : corbeille */}
            <TouchableOpacity
              onPress={() => handleDelete(d.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="trash" size={34} color="red" />
            </TouchableOpacity>
          </View>
        ))}
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
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    fontWeight: "bold",
  },
  title: {
    fontSize: 60,
    color: "#4F6A2C",
    marginBottom: 40,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 10,
    marginTop: 70,
  },
  sortBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
  },
  sort: {
    fontSize: 16,
    color: "#555",
  },
  sortActive: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F6A2C",
    textDecorationLine: "underline",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#E6D8B1",
    borderColor: "#4F6A2C",
    borderWidth: 4,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    height: 140,
    width: 610,
  },
  nom: {
    fontSize: 35,
    fontWeight: "bold",
  },
  sousTitre: {
    fontSize: 30,
    color: "#555",
  },
  date: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
  },
sortButton: {
  backgroundColor: "#E6D8B1",
  borderWidth: 2,
  borderColor: "#4F6A2C",
  borderRadius: 20,
  paddingVertical: 10,
  paddingHorizontal: 15,
  marginHorizontal: 5,
  marginBottom: 10,
},
sortButtonActive: {
  backgroundColor: "#4F6A2C",
},
sortText: {
  fontSize: 16,
  color: "#4F6A2C",
  fontWeight: "600",
},
sortTextActive: {
  color: "#fff",
},

});
