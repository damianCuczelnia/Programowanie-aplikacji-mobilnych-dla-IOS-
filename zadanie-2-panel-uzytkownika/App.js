import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FormField from "./components/FormField";
import ProfileCard from "./components/ProfileCard";
import SettingsRow from "./components/SettingsRow";

const BIO_LIMIT = 120;

const LIGHT_THEME = {
  background: "#f8fafc",
  card: "#ffffff",
  text: "#0f172a",
  muted: "#64748b",
  border: "#dbe4f0",
  inputBackground: "#ffffff",
  accent: "#1d4ed8",
  accentSoft: "#dbeafe",
  avatar: "#0f172a",
  avatarText: "#ffffff",
  success: "#166534",
  successSoft: "#dcfce7",
  error: "#b91c1c",
  errorSoft: "#fee2e2",
  info: "#155e75",
  infoSoft: "#cffafe",
  danger: "#dc2626",
  logoutSoft: "#fee2e2"
};

const DARK_THEME = {
  background: "#020617",
  card: "#0f172a",
  text: "#e2e8f0",
  muted: "#94a3b8",
  border: "#243244",
  inputBackground: "#111c2f",
  accent: "#93c5fd",
  accentSoft: "#172554",
  avatar: "#1d4ed8",
  avatarText: "#eff6ff",
  success: "#86efac",
  successSoft: "#14532d",
  error: "#fca5a5",
  errorSoft: "#7f1d1d",
  info: "#67e8f9",
  infoSoft: "#164e63",
  danger: "#fda4af",
  logoutSoft: "#4c0519"
};

const INITIAL_PROFILE = {
  name: "Damian Chymkowski",
  email: "damianchymkowski@gmail.com",
  city: "Kraków",
  bio: "Lubię tańczyć",
  password: "student123"
};

export default function App() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [form, setForm] = useState(INITIAL_PROFILE);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;
  const styles = createStyles(theme);
  const bannerOpacity = useRef(new Animated.Value(0)).current;
  const bannerTranslateY = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    if (!message) {
      bannerOpacity.setValue(0);
      bannerTranslateY.setValue(-10);
      return;
    }

    Animated.parallel([
      Animated.timing(bannerOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true
      }),
      Animated.timing(bannerTranslateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true
      })
    ]).start();
  }, [bannerOpacity, bannerTranslateY, message]);

  useEffect(() => {
    if (!message || message.type === "error") {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setMessage(null);
    }, 2600);

    return () => clearTimeout(timeout);
  }, [message]);

  const updateField = (fieldName, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [fieldName]: value
    }));
  };

  const handleSave = () => {
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedCity = form.city.trim();

    if (!trimmedName) {
      setMessage({
        type: "error",
        text: "Imię nie może być puste."
      });
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setMessage({
        type: "error",
        text: "E-mail musi zawierać znak @."
      });
      return;
    }

    if (form.bio.length > BIO_LIMIT) {
      setMessage({
        type: "error",
        text: `Bio nie może mieć więcej niż ${BIO_LIMIT} znaków.`
      });
      return;
    }

    const nextProfile = {
      ...form,
      name: trimmedName,
      email: trimmedEmail,
      city: trimmedCity
    };

    setProfile(nextProfile);
    setForm(nextProfile);
    setMessage({
      type: "success",
      text: "Zmiany zostały zapisane."
    });
  };

  const handleAboutPress = () => {
    setMessage({
      type: "info",
      text: "To jest prosty ekran ćwiczeniowy do zadania z React Native."
    });
  };

  const handleLogoutPress = () => {
    setMessage({
      type: "info",
      text: "Przycisk wyloguj jest tu jako dodatkowe rozszerzenie."
    });
  };

  const bannerColors = getBannerColors(theme, message?.type);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Zadanie 2</Text>
          <Text style={styles.title}>Panel użytkownika</Text>
          <Text style={styles.description}>
            Zrobiłem przewijalny ekran z kartą profilu, formularzem, walidacją i ustawieniami.
          </Text>
        </View>

        {message ? (
          <Animated.View
            style={[
              styles.banner,
              {
                backgroundColor: bannerColors.backgroundColor,
                transform: [{ translateY: bannerTranslateY }],
                opacity: bannerOpacity
              }
            ]}
          >
            <Text style={[styles.bannerText, { color: bannerColors.textColor }]}>{message.text}</Text>
          </Animated.View>
        ) : null}

        <ProfileCard profile={profile} theme={theme} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Edycja danych</Text>

          <FormField
            label="Imię"
            value={form.name}
            onChangeText={(value) => updateField("name", value)}
            placeholder="Wpisz imię"
            theme={theme}
          />

          <FormField
            label="E-mail"
            value={form.email}
            onChangeText={(value) => updateField("email", value)}
            placeholder="Wpisz e-mail"
            theme={theme}
          />

          <FormField
            label="Miasto"
            value={form.city}
            onChangeText={(value) => updateField("city", value)}
            placeholder="Wpisz miasto"
            theme={theme}
          />

          <FormField
            label="Hasło"
            value={form.password}
            onChangeText={(value) => updateField("password", value)}
            placeholder="Wpisz hasło"
            secureTextEntry={!showPassword}
            theme={theme}
          >
            <Pressable
              onPress={() => setShowPassword((currentValue) => !currentValue)}
              style={({ pressed }) => [styles.inlineButton, pressed && styles.inlineButtonPressed]}
            >
              <Text style={styles.inlineButtonText}>{showPassword ? "Ukryj" : "Pokaż"}</Text>
            </Pressable>
          </FormField>

          <FormField
            label="Bio"
            value={form.bio}
            onChangeText={(value) => updateField("bio", value)}
            placeholder="Napisz coś o sobie"
            multiline
            theme={theme}
          />

          <Text
            style={[
              styles.counter,
              form.bio.length > BIO_LIMIT && styles.counterLimit
            ]}
          >
            {form.bio.length}/{BIO_LIMIT}
          </Text>

          <Pressable onPress={handleSave} style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}>
            <Text style={styles.saveButtonText}>Zapisz zmiany</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ustawienia</Text>

          <SettingsRow
            label="Powiadomienia"
            description="Szybki podgląd nowych informacji z aplikacji."
            value={notificationsEnabled ? "Włączone" : "Wyłączone"}
            onPress={() => setNotificationsEnabled((currentValue) => !currentValue)}
            theme={theme}
          />

          <SettingsRow
            label="Prywatność"
            description="Zmienia, czy profil ma być bardziej prywatny."
            value={privateProfile ? "Prywatny" : "Publiczny"}
            onPress={() => setPrivateProfile((currentValue) => !currentValue)}
            theme={theme}
          />

          <SettingsRow
            label="Ciemny motyw"
            description="Przełącza cały ekran pomiędzy jasnym i ciemnym widokiem."
            value={isDarkMode ? "Aktywny" : "Nieaktywny"}
            onPress={() => setIsDarkMode((currentValue) => !currentValue)}
            theme={theme}
          />

          <SettingsRow
            label="O aplikacji"
            description="Krótka informacja o tym, po co powstał ten ekran."
            value="Info"
            onPress={handleAboutPress}
            theme={theme}
          />
        </View>

        <View style={styles.logoutBox}>
          <Text style={styles.logoutTitle}>Dodatkowo:</Text>
          <Text style={styles.logoutText}>
            Sekcja wyloguj
          </Text>
          <Pressable onPress={handleLogoutPress} style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutButtonPressed]}>
            <Text style={styles.logoutButtonText}>Wyloguj</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getBannerColors(theme, type) {
  if (type === "success") {
    return {
      backgroundColor: theme.successSoft,
      textColor: theme.success
    };
  }

  if (type === "error") {
    return {
      backgroundColor: theme.errorSoft,
      textColor: theme.error
    };
  }

  return {
    backgroundColor: theme.infoSoft,
    textColor: theme.info
  };
}

function createStyles(theme) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background
    },
    content: {
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 36
    },
    header: {
      marginBottom: 18
    },
    eyebrow: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.accent,
      marginBottom: 8
    },
    title: {
      fontSize: 30,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 10
    },
    description: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.muted
    },
    banner: {
      marginBottom: 18,
      paddingHorizontal: 16,
      paddingVertical: 13,
      borderRadius: 18
    },
    bannerText: {
      fontSize: 14,
      fontWeight: "700"
    },
    section: {
      padding: 20,
      borderRadius: 28,
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 20
    },
    sectionTitle: {
      fontSize: 19,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 16
    },
    inlineButton: {
      position: "absolute",
      right: 12,
      top: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 12,
      backgroundColor: theme.accentSoft
    },
    inlineButtonPressed: {
      opacity: 0.85
    },
    inlineButtonText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.accent
    },
    counter: {
      alignSelf: "flex-end",
      marginTop: -6,
      marginBottom: 14,
      fontSize: 13,
      fontWeight: "700",
      color: theme.muted
    },
    counterLimit: {
      color: theme.error
    },
    saveButton: {
      marginTop: 2,
      borderRadius: 18,
      backgroundColor: theme.accent,
      paddingVertical: 15,
      alignItems: "center"
    },
    saveButtonPressed: {
      opacity: 0.85
    },
    saveButtonText: {
      color: theme === LIGHT_THEME ? "#ffffff" : "#0f172a",
      fontSize: 15,
      fontWeight: "800"
    },
    logoutBox: {
      padding: 20,
      borderRadius: 28,
      backgroundColor: theme.logoutSoft,
      borderWidth: 1,
      borderColor: theme.border
    },
    logoutTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 10
    },
    logoutText: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.text,
      marginBottom: 16
    },
    logoutButton: {
      alignSelf: "flex-start",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16,
      backgroundColor: theme.danger
    },
    logoutButtonPressed: {
      opacity: 0.85
    },
    logoutButtonText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "800"
    }
  });
}