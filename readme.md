# Programowanie aplikacji mobilnych dla iOS

Repozytorium zawiera zadania przygotowane na przedmiot **Programowanie aplikacji mobilnych dla iOS**.

Autor: **Damian Chymkowski**  
Uczelnia: **WSB w Dąbrowie Górniczej**

## Zawartość repozytorium

### 1. `PodstawyJavascript.js`
Plik zawiera zestaw zadań z podstaw języka JavaScript, obejmujących między innymi:
- pracę na obiektach i tablicach,
- instrukcje warunkowe,
- funkcje,
- operacje `map`, `filter`, `reduce`, `find`,
- obsługę danych i prostych raportów,
- wywołanie API z użyciem `fetch`,
- podstawowe operacje na listach zadań, kontaktach i planie zajęć.


### 2. `zadanie-1-katalog-wydarzen`
Projekt mobilny przygotowany w **React Native + Expo**.  
Aplikacja przedstawia katalog wydarzeń studenckich i zawiera:
- wyszukiwanie wydarzeń,
- filtrowanie po kategoriach,
- oznaczanie wydarzeń jako ulubione,
- prosty interfejs listy z kartami wydarzeń.

### 3. `zadanie-2-panel-uzytkownika`
Projekt mobilny przygotowany w **React Native + Expo**.  
Aplikacja przedstawia panel użytkownika i zawiera:
- kartę profilu,
- formularz edycji danych,
- walidację pól,
- ustawienia użytkownika,
- przełączanie motywu jasnego i ciemnego,
- dodatkowe komunikaty i sekcję wylogowania.


### 4. `zadanie-3-api-posty`
Projekt mobilny przygotowany w **React Native + Expo**.  
Aplikacja demonstruje komunikację z REST API i zawiera:
- pobieranie postów z serwera metodą GET (`jsonplaceholder.typicode.com`),
- wyświetlanie listy postów w komponencie `FlatList` (id, tytuł, treść),
- stan ładowania z `ActivityIndicator`,
- obsługę błędów sieciowych z opcją ponowienia,
- formularz dodawania nowego posta (tytuł, treść, userId),
- wysyłanie danych metodą POST w formacie JSON,
- wyświetlanie odpowiedzi serwera po zapisie,
- walidację pól formularza i czyszczenie po sukcesie.

### 5. `zadanie-4-pogoda`
Projekt mobilny przygotowany w **React Native + Expo**.  
Aplikacja pokazuje aktualną pogodę i prognozę godzinową na 24h dla bieżącej lokalizacji i zawiera:
- pobieranie lokalizacji GPS przez `expo-location`,
- reverse geocoding – zamiana współrzędnych na nazwę miasta,
- komunikację z bezpłatnym API Open-Meteo (temperatura, wiatr, wilgotność, opad),
- prognozę godzinową na najbliższe 24 godziny z `FlatList`,
- cache ostatniego wyniku w lokalnej bazie SQLite (`expo-sqlite`),
- obsługę odmowy uprawnień do lokalizacji,
- obsługę błędów sieciowych z wyświetleniem danych z cache,
- ręczne odświeżanie danych.

## Technologie

- JavaScript
- React Native
- Expo

## Uruchamianie

### Plik JavaScript
W katalogu repozytorium:

```bash
node PodstawyJavascript.js
```

### Projekty React Native / Expo
Dla każdego projektu osobno:

```bash
cd zadanie-1-katalog-wydarzen
npm install
npm start
```

lub

```bash
cd zadanie-2-panel-uzytkownika
npm install
npm start
```

lub

```bash
cd zadanie-3-api-posty
npm install
npm start
```

lub

```bash
cd zadanie-4-pogoda
npm install
npx expo start --clear
```

Możliwe jest także uruchomienie aplikacji poleceniami `npm run ios`, `npm run android` lub `npm run web`.
