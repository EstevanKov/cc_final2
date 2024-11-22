import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { AuthProvider } from '@/components/features/auth/providers/AuthProvider';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
      headerShown: false,
    }}>

    

        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
        <Stack.Screen name='users/loged'/>
        <Stack.Screen name='medications'/>
        <Stack.Screen name='medications/create'/>
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
    </AuthProvider>
  );
}
