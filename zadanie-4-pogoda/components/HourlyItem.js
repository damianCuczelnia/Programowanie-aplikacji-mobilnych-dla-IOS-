import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getWeatherInfo } from '../utils/weather';

export default function HourlyItem({ hour }) {
  const { icon } = getWeatherInfo(hour.code);

  return (
    <View style={styles.item}>
      <Text style={styles.time}>{hour.time}</Text>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.temp}>{hour.temp}°C</Text>
      <View style={styles.precipBox}>
        <Text style={styles.precipText}>💧 {hour.precipProb}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#1e3a5f',
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: '#93c5fd',
    fontSize: 15,
    fontWeight: '700',
    width: 52,
  },
  icon: {
    fontSize: 24,
    width: 36,
    textAlign: 'center',
  },
  temp: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginLeft: 8,
  },
  precipBox: {
    backgroundColor: '#172f4e',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  precipText: {
    color: '#93c5fd',
    fontSize: 13,
    fontWeight: '600',
  },
});
