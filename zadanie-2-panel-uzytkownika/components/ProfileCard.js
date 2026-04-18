import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileCard({ profile, theme }) {
  const styles = createStyles(theme);
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.city}>{profile.city}</Text>
      <Text style={styles.bio}>{profile.bio}</Text>
    </View>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    card: {
      padding: 22,
      borderRadius: 28,
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 20
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.avatar
    },
    avatarText: {
      color: theme.avatarText,
      fontSize: 24,
      fontWeight: "800"
    },
    name: {
      marginTop: 16,
      fontSize: 24,
      fontWeight: "800",
      color: theme.text
    },
    city: {
      marginTop: 4,
      fontSize: 15,
      color: theme.muted
    },
    bio: {
      marginTop: 12,
      fontSize: 15,
      lineHeight: 22,
      color: theme.text
    }
  });
}
