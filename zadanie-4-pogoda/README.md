# Zadanie 4 – Pogoda „tu i teraz"

Autor: **Damian Chymkowski**

## Opis celu aplikacji

Aplikacja mobilna wyświetla aktualną pogodę i prognozę godzinową na najbliższe 24 godziny dla bieżącej lokalizacji użytkownika. Dane pobierane są z darmowego API Open-Meteo bez potrzeby klucza API. Ostatni poprawny wynik jest zapisywany lokalnie w SQLite, dzięki czemu aplikacja wyświetla dane nawet przy braku połączenia.

## Dane z urządzenia

| Dane | Źródło |
|------|--------|
| Lokalizacja GPS (latitude, longitude) | `expo-location` → `getCurrentPositionAsync` |
| Nazwa miasta | `expo-location` → `reverseGeocodeAsync` (wbudowany reverse geocoding systemu) |

Uprawnienia: `ACCESS_FINE_LOCATION` (Android) / `NSLocationWhenInUseUsageDescription` (iOS). Aplikacja prosi o zgodę przed pierwszym pobraniem danych i obsługuje odmowę.

## Biblioteki i API

| Narzędzie | Wersja | Zastosowanie |
|-----------|--------|--------------|
| `expo-location` | SDK 54 | Lokalizacja GPS + reverse geocoding |
| `expo-sqlite` | SDK 54 | Lokalny cache ostatniego wyniku |
| `Open-Meteo API` | v1 | Aktualna pogoda i prognoza godzinowa |
| `expo-status-bar` | ~3.0.9 | Kolor paska statusu |

**Endpoint pogodowy:**
```
https://api.open-meteo.com/v1/forecast
  ?latitude={lat}
  &longitude={lon}
  &current=temperature_2m,wind_speed_10m,precipitation,weathercode,relative_humidity_2m
  &hourly=temperature_2m,precipitation_probability,precipitation,weathercode
  &forecast_days=2
  &timezone=auto
  &wind_speed_unit=kmh
```

API Open-Meteo jest bezpłatne, nie wymaga rejestracji ani klucza. Zwraca czasy w lokalnej strefie czasowej dzięki parametrowi `timezone=auto`.

## Przepływ danych

```
Uruchomienie aplikacji
       │
       ▼
Wczytaj cache z SQLite ──────────────────► Wyświetl dane z pamięci (flaga "dane z pamięci")
       │
       ▼
Poproś o uprawnienia do lokalizacji
       │
       ├─── ODMOWA ──► Ekran błędu z instrukcją włączenia w ustawieniach
       │
       ▼ ZGODA
Pobierz GPS (getCurrentPositionAsync)
       │
       ▼
Reverse geocoding → nazwa miasta
       │
       ▼
Zapytanie GET do Open-Meteo API
       │
       ├─── BŁĄD SIECI ──► Baner błędu (dane z cache pozostają widoczne)
       │
       ▼ SUKCES
Wyświetl aktualną pogodę + prognoza 24h
       │
       ▼
Zapisz wynik do SQLite (nadpisanie cache)
```

## Ograniczenia i problemy

- **Reverse geocoding na iOS** – na niektórych urządzeniach może zwrócić pustą listę jeśli nie ma połączenia z internetem. Aplikacja obsługuje to fallbackiem `'Nieznana lokalizacja'`.
- **Cache bez daty wygaśnięcia** – zapisany wynik jest wyświetlany przy braku połączenia niezależnie od tego, ile ma godzin. Brakuje mechanizmu automatycznego odświeżenia po pewnym czasie.
- **Limity API** – Open-Meteo ma limit zapytań na minutę. Przy bardzo częstym odświeżaniu ręcznym może zwrócić błąd 429 (Too Many Requests).
- **Brak trybu offline** – prognoza godzinowa pochodzi z API; przy braku internetu aplikacja pokazuje dane z ostatniego cache, ale mogą być nieaktualne.
- **Tylko bieżąca lokalizacja** – nie ma możliwości wpisania innego miasta; aplikacja zawsze używa GPS.
