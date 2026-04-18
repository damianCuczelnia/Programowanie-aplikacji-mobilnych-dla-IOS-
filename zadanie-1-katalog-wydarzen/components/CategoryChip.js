import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function CategoryChip({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        active && styles.chipActive,
        pressed && styles.chipPressed
      ]}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#d4d4d8",
    backgroundColor: "#ffffff"
  },
  chipActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb"
  },
  chipPressed: {
    opacity: 0.85
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155"
  },
  labelActive: {
    color: "#ffffff"
  }
});
