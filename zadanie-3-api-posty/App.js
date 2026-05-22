import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);
  const [formError, setFormError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Błąd serwera: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!title.trim() || !body.trim() || !userId.trim()) {
      setFormError("Wypełnij wszystkie pola przed wysłaniem.");
      return;
    }

    setSending(true);
    setFormError(null);
    setSuccessMsg(null);
    setServerResponse(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          userId: Number(userId.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error(`Błąd serwera: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMsg("Post został wysłany!");
      setServerResponse(data);
      setTitle("");
      setBody("");
      setUserId("");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSending(false);
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postId}>#{item.id}</Text>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
    </View>
  );

  const ListHeader = (
    <View>
      <View style={styles.headerBox}>
        <Text style={styles.eyebrow}>Zadanie 3</Text>
        <Text style={styles.appTitle}>API – Posty</Text>
        <Text style={styles.appDesc}>
          Pobieranie danych metodą GET i wysyłanie nowego posta metodą POST.
        </Text>
      </View>

      <View style={styles.formBox}>
        <Text style={styles.sectionTitle}>Dodaj nowy post</Text>

        <Text style={styles.label}>Tytuł</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Wpisz tytuł"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.label}>Treść</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          value={body}
          onChangeText={setBody}
          placeholder="Wpisz treść posta"
          placeholderTextColor="#94a3b8"
          multiline
        />

        <Text style={styles.label}>userId</Text>
        <TextInput
          style={styles.input}
          value={userId}
          onChangeText={setUserId}
          placeholder="np. 1"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
        />

        {formError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{formError}</Text>
          </View>
        ) : null}

        {successMsg ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>{successMsg}</Text>
          </View>
        ) : null}

        {serverResponse ? (
          <View style={styles.responseBox}>
            <Text style={styles.responseLabel}>Odpowiedź serwera:</Text>
            <Text style={styles.responseText}>{JSON.stringify(serverResponse, null, 2)}</Text>
          </View>
        ) : null}

        <Pressable
          onPress={createPost}
          disabled={sending}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>{sending ? "Wysyłanie..." : "Wyślij"}</Text>
        </Pressable>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Lista postów z serwera</Text>
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#1d4ed8" />
            <Text style={styles.loadingText}>Ładowanie danych...</Text>
          </View>
        ) : null}
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>Błąd: {error}</Text>
            <Pressable
              onPress={fetchPosts}
              style={({ pressed }) => [styles.retryButton, pressed && styles.buttonPressed]}
            >
              <Text style={styles.retryText}>Spróbuj ponownie</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <FlatList
        data={loading || error ? [] : posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderPost}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          !loading && !error ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Brak postów do wyświetlenia.</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerBox: {
    backgroundColor: "#0f172a",
    borderRadius: 24,
    padding: 22,
    marginBottom: 16,
  },
  eyebrow: {
    color: "#93c5fd",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
  },
  appTitle: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  appDesc: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 20,
  },
  formBox: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#0f172a",
    marginBottom: 14,
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#1d4ed8",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 14,
    fontWeight: "700",
  },
  successBox: {
    backgroundColor: "#dcfce7",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  successText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "700",
  },
  responseBox: {
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bae6fd",
  },
  responseLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0369a1",
    marginBottom: 6,
  },
  responseText: {
    fontSize: 12,
    color: "#0c4a6e",
    fontFamily: "monospace",
  },
  retryButton: {
    marginTop: 10,
    backgroundColor: "#1d4ed8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },
  retryText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },
  listHeader: {
    marginBottom: 4,
  },
  loadingBox: {
    alignItems: "center",
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748b",
    fontWeight: "600",
  },
  postCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  postId: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1d4ed8",
    marginBottom: 6,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 6,
    textTransform: "capitalize",
  },
  postBody: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 18,
  },
  emptyBox: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: "#94a3b8",
  },
});
