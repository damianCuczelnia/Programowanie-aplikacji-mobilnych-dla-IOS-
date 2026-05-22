import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import CurrentWeather from './components/CurrentWeather';
import HourlyItem from './components/HourlyItem';

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  const [db] = useState(() => {
    const database = SQLite.openDatabaseSync('weather.db');
    database.execSync(
      'CREATE TABLE IF NOT EXISTS cache (id INTEGER PRIMARY KEY, data TEXT, city TEXT, ts INTEGER)'
    );
    return database;
  });

  useEffect(() => {
    loadFromCache();
    fetchWeather();
  }, []);

  function loadFromCache() {
    const row = db.getFirstSync('SELECT * FROM cache WHERE id = 1');
    if (row) {
      setWeather(JSON.parse(row.data));
      setCity(row.city);
      setLastUpdated(new Date(row.ts));
      setFromCache(true);
    }
  }

  function saveToCache(data, cityName) {
    db.runSync(
      'INSERT OR REPLACE INTO cache (id, data, city, ts) VALUES (1, ?, ?, ?)',
      [JSON.stringify(data), cityName, Date.now()]
    );
  }

  async function fetchWeather() {
    setLoading(true);
    setError(null);
    setPermissionDenied(false);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermissionDenied(true);
        return;
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = pos.coords;

      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      const cityName =
        geocode[0]?.city ||
        geocode[0]?.subregion ||
        geocode[0]?.region ||
        'Nieznana lokalizacja';

      const url =
        `${WEATHER_API}?latitude=${latitude.toFixed(4)}&longitude=${longitude.toFixed(4)}` +
        `&current=temperature_2m,wind_speed_10m,precipitation,weathercode,relative_humidity_2m` +
        `&hourly=temperature_2m,precipitation_probability,precipitation,weathercode` +
        `&forecast_days=2&timezone=auto&wind_speed_unit=kmh`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Błąd serwera: ${res.status}`);
      const data = await res.json();

      setWeather(data);
      setCity(cityName);
      setLastUpdated(new Date());
      setFromCache(false);
      saveToCache(data, cityName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function getNext24Hours() {
    if (!weather?.hourly) return [];
    const currentTime = weather.current.time;
    const { time, temperature_2m, precipitation_probability, precipitation, weathercode } =
      weather.hourly;
    let start = time.findIndex((t) => t >= currentTime);
    if (start === -1) start = 0;
    return time.slice(start, start + 24).map((t, i) => ({
      key: t,
      time: t.substring(11, 16),
      temp: temperature_2m[start + i],
      precipProb: precipitation_probability[start + i],
      precip: precipitation[start + i],
      code: weathercode[start + i],
    }));
  }

  if (loading && !weather) {
    return (
      <SafeAreaView style={styles.center}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#93c5fd" />
        <Text style={styles.loadingText}>Pobieranie pogody...</Text>
      </SafeAreaView>
    );
  }

  if (permissionDenied && !weather) {
    return (
      <SafeAreaView style={styles.center}>
        <StatusBar style="light" />
        <Text style={styles.bigIcon}>📍</Text>
        <Text style={styles.errorTitle}>Brak dostępu do lokalizacji</Text>
        <Text style={styles.errorDesc}>
          Aplikacja potrzebuje lokalizacji, aby pobrać pogodę. Włącz dostęp w ustawieniach telefonu i spróbuj ponownie.
        </Text>
        <Pressable
          onPress={fetchWeather}
          style={({ pressed }) => [styles.retryBtn, pressed && styles.pressed]}
        >
          <Text style={styles.retryText}>Spróbuj ponownie</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (error && !weather) {
    return (
      <SafeAreaView style={styles.center}>
        <StatusBar style="light" />
        <Text style={styles.bigIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Błąd połączenia</Text>
        <Text style={styles.errorDesc}>{error}</Text>
        <Pressable
          onPress={fetchWeather}
          style={({ pressed }) => [styles.retryBtn, pressed && styles.pressed]}
        >
          <Text style={styles.retryText}>Spróbuj ponownie</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const hours = getNext24Hours();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <FlatList
        data={hours}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            {fromCache && (
              <View style={styles.cacheBanner}>
                <Text style={styles.cacheBannerText}>Wyświetlam ostatnio zapisane dane</Text>
              </View>
            )}
            {error && weather && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>Nie udało się odświeżyć: {error}</Text>
              </View>
            )}

            <CurrentWeather
              current={weather.current}
              city={city}
              lastUpdated={lastUpdated}
            />

            <Pressable
              onPress={fetchWeather}
              disabled={loading}
              style={({ pressed }) => [styles.refreshBtn, pressed && styles.pressed]}
            >
              <Text style={styles.refreshText}>
                {loading ? 'Odświeżanie...' : '⟳  Odśwież pogodę'}
              </Text>
            </Pressable>

            <Text style={styles.forecastTitle}>Prognoza godzinowa</Text>
          </View>
        }
        renderItem={({ item }) => <HourlyItem hour={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1f38',
  },
  center: {
    flex: 1,
    backgroundColor: '#0b1f38',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  loadingText: {
    color: '#93c5fd',
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  bigIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorDesc: {
    color: '#94a3b8',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  retryBtn: {
    backgroundColor: '#1d4ed8',
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
  cacheBanner: {
    backgroundColor: '#1e3a5f',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  cacheBannerText: {
    color: '#93c5fd',
    fontSize: 13,
    fontWeight: '600',
  },
  errorBanner: {
    backgroundColor: '#4c0519',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  errorBannerText: {
    color: '#fda4af',
    fontSize: 13,
    fontWeight: '600',
  },
  refreshBtn: {
    backgroundColor: '#1d4ed8',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  refreshText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  forecastTitle: {
    color: '#93c5fd',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
});
