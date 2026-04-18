import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View
} from "react-native";
import { StatusBar } from "expo-status-bar";
import CategoryChip from "./components/CategoryChip";
import EventCard from "./components/EventCard";
import { CATEGORIES, EVENTS } from "./data/events";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function runLayoutAnimation() {
  if (Platform.OS !== "web") {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }
}

export default function App() {
  const [events, setEvents] = useState(EVENTS);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const resultsScale = useRef(new Animated.Value(1)).current;

  const visibleEvents = events.filter((event) => {
    const matchesCategory =
      activeCategory === "Wszystkie" || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchText.trim().toLowerCase());
    const matchesFavorites = !showOnlyFavorites || event.favorite;

    return matchesCategory && matchesSearch && matchesFavorites;
  });

  useEffect(() => {
    Animated.sequence([
      Animated.timing(resultsScale, {
        toValue: 1.05,
        duration: 120,
        useNativeDriver: true
      }),
      Animated.timing(resultsScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true
      })
    ]).start();
  }, [resultsScale, visibleEvents.length]);

  const handleToggleFavorite = (eventId) => {
    runLayoutAnimation();
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === eventId ? { ...event, favorite: !event.favorite } : event
      )
    );
  };

  const handleCategoryPress = (category) => {
    runLayoutAnimation();
    setActiveCategory(category);
  };

  const handleFavoriteFilterPress = () => {
    runLayoutAnimation();
    setShowOnlyFavorites((currentValue) => !currentValue);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <FlatList
        data={visibleEvents}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          visibleEvents.length === 0 && styles.contentEmpty
        ]}
        ListHeaderComponent={
          <View>
            <View style={styles.headerBox}>
              <Text style={styles.eyebrow}>Zadanie 1</Text>
              <Text style={styles.title}>Katalog wydarzeń studenckich</Text>
              <Text style={styles.description}>
                Prosty ekran z wyszukiwaniem, filtrowaniem i oznaczaniem wydarzeń jako
                ulubione.
              </Text>
            </View>

            <Animated.View
              style={[
                styles.resultsBox,
                {
                  transform: [{ scale: resultsScale }]
                }
              ]}
            >
              <Text style={styles.resultsText}>
                Aktualnie widoczne wyniki: {visibleEvents.length}
              </Text>
            </Animated.View>

            <View style={styles.searchSection}>
              <Text style={styles.sectionLabel}>Szukaj wydarzenia</Text>
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Wpisz nazwę wydarzenia"
                placeholderTextColor="#94a3b8"
                style={styles.searchInput}
              />
            </View>

            <View style={styles.filtersSection}>
              <Text style={styles.sectionLabel}>Kategorie</Text>
              <View style={styles.filtersRow}>
                {CATEGORIES.map((category) => (
                  <CategoryChip
                    key={category}
                    label={category}
                    active={activeCategory === category}
                    onPress={() => handleCategoryPress(category)}
                  />
                ))}
              </View>

              <Pressable
                onPress={handleFavoriteFilterPress}
                style={({ pressed }) => [
                  styles.favoriteFilter,
                  showOnlyFavorites && styles.favoriteFilterActive,
                  pressed && styles.favoriteFilterPressed
                ]}
              >
                <Text
                  style={[
                    styles.favoriteFilterText,
                    showOnlyFavorites && styles.favoriteFilterTextActive
                  ]}
                >
                  {showOnlyFavorites ? "Pokaż wszystkie wydarzenia" : "Pokaż tylko ulubione"}
                </Text>
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Brak wyników</Text>
            <Text style={styles.emptyText}>
              Dla tego filtra i tekstu wyszukiwania nic teraz nie pasuje.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            date={item.date}
            category={item.category}
            location={item.location}
            favorite={item.favorite}
            badge={item.badge}
            onToggleFavorite={() => handleToggleFavorite(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc"
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28
  },
  contentEmpty: {
    flexGrow: 1
  },
  headerBox: {
    padding: 22,
    borderRadius: 28,
    backgroundColor: "#0f172a",
    marginBottom: 16
  },
  eyebrow: {
    color: "#93c5fd",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10
  },
  description: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22
  },
  resultsBox: {
    marginBottom: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: "#dbeafe"
  },
  resultsText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1e3a8a"
  },
  searchSection: {
    marginBottom: 18
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 10
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#dbeafe",
    fontSize: 15,
    color: "#0f172a"
  },
  filtersSection: {
    marginBottom: 8
  },
  filtersRow: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  favoriteFilter: {
    alignSelf: "flex-start",
    marginTop: 6,
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1d4ed8",
    backgroundColor: "#ffffff"
  },
  favoriteFilterActive: {
    backgroundColor: "#1d4ed8"
  },
  favoriteFilterPressed: {
    opacity: 0.85
  },
  favoriteFilterText: {
    color: "#1d4ed8",
    fontWeight: "700",
    fontSize: 14
  },
  favoriteFilterTextActive: {
    color: "#ffffff"
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 60
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 10
  },
  emptyText: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    color: "#475569"
  }
});