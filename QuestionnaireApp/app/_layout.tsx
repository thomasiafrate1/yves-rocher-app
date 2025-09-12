import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { importerProduits } from "../scripts/importProduits"; // adapte le chemin si besoin
import { useEffect } from 'react';
import { Slot } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
// app/_layout.tsx

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  return <Slot />;
}

export const options = {
  headerShown: false,
};



