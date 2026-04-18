import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EventCard({
  title,
  date,
  category,
  location,
  favorite,
  badge,
  onToggleFavorite
}) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
        <Text style={styles.category}>{category}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>{date}</Text>
      <Text style={styles.meta}>{location}</Text>

      <Pressable
        onPress={onToggleFavorite}
        style={({ pressed }) => [
          styles.favoriteButton,
          favorite && styles.favoriteButtonActive,
          pressed && styles.favoriteButtonPressed
        ]}
      >
        <Text style={[styles.favoriteButtonText, favorite && styles.favoriteButtonTextActive]}>
          {favorite ? "Usun z ulubionych" : "Dodaj do ulubionych"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
    padding: 18,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6
    },
    elevation: 2
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "#dbeafe"
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1d4ed8"
  },
  category: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569"
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 10
  },
  meta: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 4
  },
  favoriteButton: {
    marginTop: 14,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: "#eff6ff"
  },
  favoriteButtonActive: {
    backgroundColor: "#1d4ed8"
  },
  favoriteButtonPressed: {
    opacity: 0.85
  },
  favoriteButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1d4ed8"
  },
  favoriteButtonTextActive: {
    color: "#ffffff"
  }
});
