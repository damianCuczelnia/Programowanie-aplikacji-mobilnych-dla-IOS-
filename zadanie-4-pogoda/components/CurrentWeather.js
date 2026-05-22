import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getWeatherInfo } from '../utils/weather';

export default function CurrentWeather({ current, city, lastUpdated }) {
  const { icon, label } = getWeatherInfo(current.weathercode);

  const updatedStr = lastUpdated
    ? lastUpdated.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
    : '--:--';

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.temp}>{current.temperature_2m}°C</Text>
      <Text style={styles.desc}>{label}</Text>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statVal}>💨 {current.wind_speed_10m}</Text>
          <Text style={styles.statLabel}>km/h</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statVal}>💧 {current.relative_humidity_2m}%</Text>
          <Text style={styles.statLabel}>Wilgotność</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statVal}>🌧 {current.precipitation} mm</Text>
          <Text style={styles.statLabel}>Opad</Text>
        </View>
      </View>

      <Text style={styles.updated}>Aktualizacja: {updatedStr}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e3a5f',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    marginBottom: 16,
  },
  city: {
    color: '#93c5fd',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  icon: {
    fontSize: 72,
    marginBottom: 8,
  },
  temp: {
    color: '#ffffff',
    fontSize: 64,
    fontWeight: '800',
    lineHeight: 72,
  },
  desc: {
    color: '#bfdbfe',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172f4e',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  statLabel: {
    color: '#93c5fd',
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#2d5080',
  },
  updated: {
    color: '#64748b',
    fontSize: 12,
  },
});
