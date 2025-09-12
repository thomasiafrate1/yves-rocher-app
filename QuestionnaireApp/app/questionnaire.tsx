// app/questionnaire.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground } from "react-native";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // pour l'icône X


// Exemple de questions (tu pourras déplacer ça dans /data/questions.ts)
export const questions = [
  {
    id: "q1",
    question: "Quelle est la sensation de votre peau après le nettoyage ?",
    options: [
      { label: "Tiraillements", typePeau: "seche" },
      { label: "Douce et confortable", typePeau: "normale" },
      { label: "Légèrement grasse", typePeau: "mixte" },
      { label: "Très brillante / grasse", typePeau: "grasse" },
    ],
  },
  {
    id: "q2",
    question: "À quel rythme votre peau devient-elle brillante dans la journée ?",
    options: [
      { label: "Jamais", typePeau: "seche_normale" },
      { label: "En fin de journée", typePeau: "mixte" },
      { label: "Dans la matinée", typePeau: "grasse" },
      { label: "Dès le réveil", typePeau: "grasse" },
    ],
  },
  {
    id: "q3",
    question: "Ressentez-vous souvent des tiraillements ou des zones sèches ?",
    options: [
      { label: "Jamais", typePeau: "grasse_normale" },
      { label: "Rarement", typePeau: "normale" },
      { label: "Régulièrement", typePeau: "mixte" },
      { label: "Très souvent", typePeau: "seche" },
    ],
  },
  {
    id: "q4",
    question: "Avez-vous tendance à avoir des imperfections (boutons, points noirs...) ?",
    options: [
      { label: "Non, jamais", problemes: [] },
      { label: "Parfois", problemes: ["imperfections"] },
      { label: "Régulièrement", problemes: ["imperfections"] },
      { label: "Souvent / quotidiennement", problemes: ["imperfections"] },
    ],
  },
  {
    id: "q5",
    question: "Comment décririez-vous votre grain de peau ?",
    options: [
      { label: "Fin et uniforme", typePeau: "normale" },
      { label: "Léger grain visible", typePeau: "mixte" },
      { label: "Pores visibles sur la zone T", typePeau: "mixte_grasse" },
      { label: "Pores dilatés sur l’ensemble du visage", typePeau: "grasse" },
    ],
  },
  {
    id: "q6",
    question: "Votre peau réagit-elle facilement (rougeurs, échauffements...) ?",
    options: [
      { label: "Non", typePeau: "normale_grasse" },
      { label: "Très rarement", typePeau: "normale" },
      { label: "Oui, parfois", typePeau: "mixte" },
      { label: "Oui, très souvent", typePeau: "sensible" },
    ],
  },
  {
    id: "q7",
    question: "Quel est votre principal besoin aujourd’hui ?",
    options: [
      { label: "Hydrater et apaiser", problemes: ["deshydratation"] },
      { label: "Matifier et purifier", problemes: ["impuretés"] },
      { label: "Éclat et uniformité", problemes: ["imperfections"] },
      { label: "Anti-âge / fermeté", problemes: ["rides"] },
    ],
  },
  {
    id: "q8",
    question: "À quelle fréquence utilisez-vous des soins pour le visage ?",
    options: [
      { label: "Quotidiennement (matin et soir)" },
      { label: "Une fois par jour" },
      { label: "Quelques fois par semaine" },
      { label: "Jamais / très rarement" },
    ],
  },
];


export default function QuestionnaireScreen() {
  const router = useRouter();
  const client = useLocalSearchParams(); // contient nom, prenom, email, adresse

  const [currentIndex, setCurrentIndex] = useState(0);
  const [reponses, setReponses] = useState<Record<string, any>>({});

  const currentQuestion = questions[currentIndex];
  const handleQuit = () => {
  Alert.alert(
    "Quitter le questionnaire",
    "Êtes-vous sûr(e) ? Vos réponses ne seront pas sauvegardées.",
    [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Quitter",
        style: "destructive",
        onPress: () => router.replace("/"),
      },
    ]
  );
};


  const handleAnswer = (answer: { label: string; typePeau?: string; problemes?: string[] }) => {
  setReponses((prev) => ({
    ...prev,
    [currentQuestion.id]: answer,
  }));

  if (currentIndex === questions.length - 1) {
    router.push({
      pathname: "/result",
      params: {
        ...client,
        reponses: JSON.stringify({
          ...reponses,
          [currentQuestion.id]: answer,
        }),
      },
    });
  } else {
    setCurrentIndex((prev) => prev + 1);
  }
};


  return (
    <ImageBackground
              source={require("../assets/images/fond.png")}
              resizeMode="cover"   // ✅ remplissage total, peut couper un peu
              style={styles.background}
            >
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleQuit}>
  <Ionicons name="close" size={28} color="#E6D8B1" />
</TouchableOpacity>

      <Text style={styles.progress}>
        QUESTION {currentIndex + 1} / {questions.length}
      </Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option) => (
        <TouchableOpacity
  key={option.label}
  style={styles.optionButton} // <== Ajoute ça
  onPress={() => handleAnswer(option)}
>
  <Text style={styles.optionText}>{option.label}</Text>
</TouchableOpacity>


      ))}

      
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 100,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
  },
  closeButton: {
  position: "absolute",
  top: 60,
  right: 20,
  backgroundColor: "#4F6A2C",
  borderRadius: 20,
  padding: 8,
  zIndex: 999,
},

  background: {
  flex: 1,
  width: "100%",
  height: "100%",
},
  questionText: {
    fontSize: 38,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "#4F6A2C",
  },
  optionButton: {
    backgroundColor: "#4F6A2C",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 2,
    width: "60%",
    marginTop: 20,  
  },
  optionText: {
    color: "#fff",
    fontSize: 35,
    textAlign: "center",
  },
  progress: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 40,
    color: "#4F6A2C",
    fontWeight: "700",
    marginBottom: 50,
    letterSpacing: 5,
  },
});
