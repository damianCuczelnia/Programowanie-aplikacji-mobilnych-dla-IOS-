import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  secureTextEntry = false,
  theme,
  children
}) {
  const styles = createStyles(theme);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.muted}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          style={[styles.input, multiline && styles.inputMultiline]}
        />
        {children}
      </View>
    </View>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    wrapper: {
      marginBottom: 16
    },
    label: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 8
    },
    inputBox: {
      position: "relative"
    },
    input: {
      minHeight: 54,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.inputBackground,
      paddingHorizontal: 16,
      paddingVertical: 14,
      color: theme.text,
      fontSize: 15
    },
    inputMultiline: {
      minHeight: 120,
      paddingTop: 14
    }
  });
}
