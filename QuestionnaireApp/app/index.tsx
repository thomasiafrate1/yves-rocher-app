import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Image } from "react-native";


export default function HomeScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("");

  const CODE_SECRET = "0459";

  const handleCodeValidation = () => {
    if (code === CODE_SECRET) {
      setModalVisible(false);
      router.push("/admin/historique");
    } else {
      Alert.alert("Code incorrect", "Le code saisi est incorrect.");
    }
  };

  return (
    <ImageBackground
  source={require("../assets/images/fond.png")}
  resizeMode="cover"   // ✅ remplissage total, peut couper un peu
  style={styles.background}
>

    <View style={styles.container}>
      {/* 🔒 Cadenas */}
      <TouchableOpacity style={styles.lockIcon} onPress={() => setModalVisible(true)}>
        <Ionicons name="lock-closed" size={50} color="black" />
      </TouchableOpacity>
      <Image source={require('../assets/images/logo_yves_rocher.png')} style={styles.img}></Image>



      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => router.push("/form")}
      >
        <Text style={styles.mainButtonText}>COMMENCER <br /> LE QUESTIONNAIRE</Text>
      </TouchableOpacity>

      {/* 🔐 Modal Code Secret */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>ENTREZ LE CODE D'ACCES</Text>
            <TextInput
              style={styles.input}
              placeholder="Code secret"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleCodeValidation}>
              <Text style={styles.modalButtonText}>VALIDER</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 10, color: "#888" }}>ANNULER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: "transparent",
  },
  background: {
  flex: 1,
  width: "100%",
  height: "100%",
},
  img: {
    width: 400,
    height: 400,
    marginTop : -200
  },

  title: {
    fontSize: 22,
    marginBottom: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  mainButton: {
    backgroundColor: "#4F6A2C",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 2,
    
    marginTop: 100,
  },
  mainButtonText: {
    color: "#E1DCBC",
    fontSize: 30,
    width: 300,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#4F6A2C",
  },
  lockIcon: {
    position: "absolute",
    top: 60,
    left: 60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#E6D8B1",
    padding: 24,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    borderColor: "#4F6A2C",
    borderWidth: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
    color: "#4F6A2C",
  },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: "#4F6A2C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
