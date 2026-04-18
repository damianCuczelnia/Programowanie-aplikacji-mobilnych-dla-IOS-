import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SettingsRow({ label, description, value, onPress, theme, tone = "default" }) {
  const styles = createStyles(theme, tone);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <View style={styles.leftSide}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </Pressable>
  );
}

function createStyles(theme, tone) {
  const valueColor = tone === "danger" ? theme.danger : theme.accent;

  return StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border
    },
    rowPressed: {
      opacity: 0.82
    },
    leftSide: {
      flex: 1,
      paddingRight: 14
    },
    label: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 4
    },
    description: {
      fontSize: 13,
      lineHeight: 18,
      color: theme.muted
    },
    value: {
      fontSize: 13,
      fontWeight: "700",
      color: valueColor
    }
  });
}
