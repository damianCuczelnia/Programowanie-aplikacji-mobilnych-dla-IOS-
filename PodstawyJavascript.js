// Zadanie 1
// Tutaj dziala prosty profil uzytkownika i kilka komunikatow z danych z obiektu.
// Od siebie dorzucilem hobby, zeby ten opis nie konczyl sie tylko na podstawowych polach.
// Najwiecej uwagi poszlo w zlozenie tego w krotkie, naturalne komunikaty.

const user = {
  firstName: "Damian",
  lastName: "Chymkowski",
  city: "Krakow",
  age: 32,
  fieldOfStudy: "Informatyka",
  hobby: "Taniec"
};

const fullName = `${user.firstName} ${user.lastName}`;

console.log(fullName);
console.log(`${fullName} mieszka w ${user.city} i studiuje ${user.fieldOfStudy}.`);
console.log(user.age >= 18 ? "Uzytkownik jest pelnoletni." : "Uzytkownik jest niepelnoletni.");
console.log(`${user.firstName} interesuje sie: ${user.hobby}.`);

// Zadanie 2
// W tym miejscu licze caly tydzien wydatkow: sume, srednia i najwyzszy koszt.
// Dodatkowo wrzucilem limit budzetu, zeby od razu bylo widac, czy plan sie spial.
// Najlatwiej bylo policzyc sume, a najwazniejsze bylo dobrze pokazac roznice wzgledem limitu.

const expenses = [18.5, 42, 9.99, 27, 61.3, 15, 33.5];
const weeklyBudgetLimit = 220;

const expenseSum = expenses.reduce((sum, expense) => sum + expense, 0);
const expenseAverage = expenseSum / expenses.length;
const expenseMax = Math.max(...expenses);
const budgetDifference = weeklyBudgetLimit - expenseSum;

console.log("Raport budzetu tygodniowego:");
console.log(`Suma wydatkow: ${expenseSum.toFixed(2)} zl`);
console.log(`Sredni wydatek: ${expenseAverage.toFixed(2)} zl`);
console.log(`Najwiekszy wydatek: ${expenseMax.toFixed(2)} zl`);
console.log(
  budgetDifference >= 0
    ? `Miescisz sie w budzecie. Zostalo ${budgetDifference.toFixed(2)} zl.`
    : `Przekroczono budzet o ${Math.abs(budgetDifference).toFixed(2)} zl.`
);

// Zadanie 3
// Tutaj lista zakupow jest najpierw opisana, potem filtrowana i na koncu przeksztalcana.
// Moim dodatkiem jest kategoria produktu i osobny podglad pozycji kupowanych w wiekszej ilosci.
// Najbardziej trzeba bylo pilnowac, zeby kazdy wynik powstawal obok oryginalnej tablicy, a nie zamiast niej.

const shoppingList = [
  { name: "chleb", quantity: 2, urgent: true, category: "pieczywo" },
  { name: "mleko", quantity: 1, urgent: false, category: "nabial" },
  { name: "jajka", quantity: 10, urgent: true, category: "nabial" },
  { name: "makaron", quantity: 3, urgent: false, category: "suche produkty" }
];

const shoppingDescriptions = shoppingList.map(
  (product) => `${product.name} (${product.quantity} szt.)`
);
const urgentProducts = shoppingList.filter((product) => product.urgent);
const upperCaseProductNames = shoppingList.map((product) => product.name.toUpperCase());
const biggerOrders = shoppingList.filter((product) => product.quantity >= 3);

console.log("Lista zakupow:", shoppingDescriptions);
console.log("Produkty pilne:", urgentProducts);
console.log(`Liczba pozycji pilnych: ${urgentProducts.length}`);
console.log("Nazwy wielkimi literami:", upperCaseProductNames);
console.log(
  `Produkty kupowane w wiekszej ilosci: ${biggerOrders.map((product) => product.name).join(", ")}`
);

// Zadanie 4
// Ten fragment sprawdza, czy student jest faktycznie przygotowany na dany typ zajec.
// Dorzucilem legitymacje jako dodatkowy drobiazg
// Najtrudniejsze bylo ulozenie warunku tak, zeby laboratorium mialo bardziej rygorystyczne wymagania niz zwykly dzien.

const hasLaptop = true;
const hasCharger = false;
const hasNotebook = true;
const dayType = "laboratorium";
const hasStudentCard = true;

let readyForClasses;

if (dayType === "laboratorium") {
  readyForClasses = hasLaptop && hasCharger && hasNotebook;
} else {
  readyForClasses = hasNotebook;
}

if (readyForClasses) {
  console.log("Student jest gotowy na zajecia.");
} else {
  console.log("Student nie jest gotowy na zajecia.");
}

const readinessStatus = readyForClasses ? "gotowy" : "niegotowy";

console.log(`Krotki status: ${readinessStatus}.`);
!hasCharger && console.log("Ostrzezenie: brakuje ladowarki.");
console.log(
  dayType === "laboratorium"
    ? "Dzisiaj sa zajecia praktyczne, warto zabrac caly sprzet."
    : "Dzisiaj jest wyklad, wystarcza podstawowe notatki."
);
hasStudentCard && console.log("Legitymacja jest spakowana.");

// Zadanie 5
// Tutaj dziala funkcja, ktora z imienia i listy rzeczy do zrobienia sklada plan dnia.
// Rozszerzeniem jest numerowanie zadan, dzieki czemu wynik wyglada bardziej jak prawdziwa lista.
// Najwiecej uwagi wymagal zwracany tekst, zeby byl prosty, ale nadal czytelny.

const tasks = ["zajecia", "zakupy", "trening"];

function createDayPlan(name, tasks = ["odpoczynek"]) {
  const numberedTasks = tasks.map((task, index) => `${index + 1}. ${task}`);
  return `${name} ma dzisiaj ${tasks.length} zadania: ${numberedTasks.join(", ")}.`;
}

console.log(createDayPlan("Damian", tasks));
console.log(createDayPlan("Ola", ["nauka", "projekt", "spacer"]));
console.log(createDayPlan("Jan"));

// Zadanie 6
// W tej czesci przegladam katalog filmow i wyciagam z niego rozne sensowne podzbiory.
// Od siebie dopisalem jeszcze liste filmow sci-fi, ktore nadal czekaja na obejrzenie.
// Najwieksza trudnosc byla bardziej organizacyjna niz techniczna: z ktorej listy najlepiej wyciagac same tytuly.

const movies = [
  { title: "Arrival", category: "sci-fi", rating: 8.1, watched: true, year: 2016 },
  { title: "Whiplash", category: "drama", rating: 8.5, watched: false, year: 2014 },
  { title: "Dune", category: "sci-fi", rating: 8.0, watched: false, year: 2021 },
  { title: "Inside Out", category: "animation", rating: 8.1, watched: true, year: 2015 }
];

const unwatchedMovies = movies.filter((movie) => !movie.watched);
const highlyRatedMovies = movies.filter((movie) => movie.rating > 8.0);
const highlyRatedTitles = highlyRatedMovies.map((movie) => movie.title);
const sciFiMoviesToWatch = movies
  .filter((movie) => movie.category === "sci-fi" && !movie.watched)
  .map((movie) => movie.title);

console.log("Raport filmow:");
console.log("Filmy nieobejrzane:", unwatchedMovies);
console.log("Filmy z ocena wyzsza niz 8.0:", highlyRatedMovies);
console.log("Tytuly dobrze ocenianych filmow:", highlyRatedTitles);
console.log(`Sci-fi do obejrzenia: ${sciFiMoviesToWatch.join(", ")}`);

// Zadanie 7
// Tutaj wyszukuje konkretne zgloszenie, potem zmieniam jego status bez ruszania oryginalnych danych.
// Wlasny dodatek to szacowany czas naprawy, zeby wpis byl troche bardziej zyciowy.
// Najbardziej pilnowalem tego, zeby aktualizacja byla niemutowalna i czytelna jednoczesnie.

const repairs = [
  { id: 1, client: "Anna", device: "laptop", status: "nowe" },
  { id: 2, client: "Piotr", device: "telefon", status: "w trakcie" },
  { id: 3, client: "Ola", device: "tablet", status: "zakonczone" }
];

const selectedRepairId = 1;
const foundRepair = repairs.find((repair) => repair.id === selectedRepairId);
const updatedRepairs = repairs.map((repair) =>
  repair.id === selectedRepairId
    ? { ...repair, status: "w trakcie", estimatedDays: 2 }
    : repair
);
const repairsInProgress = updatedRepairs.filter((repair) => repair.status === "w trakcie").length;

console.log("Znalezione zgloszenie:", foundRepair);
console.log("Oryginalna tablica napraw:", repairs);
console.log("Zaktualizowana tablica napraw:", updatedRepairs);
console.log(`Liczba zgloszen w trakcie: ${repairsInProgress}`);

// Zadanie 8
// W tym zadaniu podsumowuje oceny: licze srednia i decyduje, czy przedmiot jest zaliczony.
// Moje rozszerzenie to dodatkowa klasyfikacja wyniku oraz pokazanie najwyzszej oceny.
// Najtrudniejsze bylo ustawienie przedzialow tak, zeby opis koncowy nie byl przypadkowy.

const grades = [3.0, 4.0, 5.0, 3.5, 4.5];
const passingThreshold = 3.0;

function summarizeGrades(gradesList) {
  const gradesSum = gradesList.reduce((sum, grade) => sum + grade, 0);
  const average = gradesSum / gradesList.length;
  const status = average >= passingThreshold ? "zaliczone" : "niezaliczone";

  let category = "dostateczny";

  if (average >= 4.75) {
    category = "bardzo dobry";
  } else if (average >= 4.0) {
    category = "dobry";
  }

  return {
    average: Number(average.toFixed(2)),
    status,
    category,
    highestGrade: Math.max(...gradesList)
  };
}

const gradeSummary = summarizeGrades(grades);

console.log("Podsumowanie ocen:", gradeSummary);
console.log(`Srednia ocen: ${gradeSummary.average}`);
console.log(`Status koncowy: ${gradeSummary.status}`);
console.log(`Klasyfikacja: ${gradeSummary.category}`);
console.log(`Najwyzsza ocena: ${gradeSummary.highestGrade}`);

// Zadanie 9
// Tutaj koszyk dostaje pelne podliczenie: wartosc pozycji, sume i koncowy raport.
// Dorzucilem jeszcze darmowa dostawe, zeby poza rabatem pojawil sie drugi praktyczny warunek.
// Najwiecej uwagi wymagalo rozdzielenie tego, co jest przed rabatem, od tego, co zostaje po obnizce.

const cart = [
  { name: "Chleb", price: 4.5, quantity: 2 },
  { name: "Ser", price: 9.9, quantity: 1 },
  { name: "Sok", price: 6.2, quantity: 3 }
];

const discountThreshold = 30;
const discountPercent = 10;

const cartItemsWithValue = cart.map((item) => ({
  ...item,
  lineTotal: item.price * item.quantity
}));
const cartTotal = cartItemsWithValue.reduce((sum, item) => sum + item.lineTotal, 0);
const cartDescriptions = cart.map((item) => `${item.quantity} x ${item.name}`);
const discountValue = cartTotal > discountThreshold ? (cartTotal * discountPercent) / 100 : 0;
const totalAfterDiscount = cartTotal - discountValue;
const freeDelivery = cartTotal >= 40;

console.log("Raport koszyka:");
console.log("Opisy pozycji:", cartDescriptions);
console.log(`Suma przed rabatem: ${cartTotal.toFixed(2)} zl`);
console.log(`Rabat: ${discountValue.toFixed(2)} zl`);
console.log(`Suma po rabacie: ${totalAfterDiscount.toFixed(2)} zl`);
console.log(freeDelivery ? "Koszyk ma darmowa dostawe." : "Koszyk nie lapie sie na darmowa dostawe.");

// Zadanie 10
// W tej sekcji zbieram aktywnosci z tygodnia i skladam z nich prosty raport treningowy.
// Wlasnym dodatkiem jest wskazanie treningu, ktory spalil najwiecej kalorii.
// Najtrudniejszy moment to porownanie aktywnosci tak, zeby latwo wybrac najlepszy wynik.

const activities = [
  { type: "bieg", minutes: 35, calories: 320 },
  { type: "rower", minutes: 50, calories: 410 },
  { type: "spacer", minutes: 20, calories: 90 },
  { type: "silownia", minutes: 60, calories: 450 }
];

const totalActivityMinutes = activities.reduce((sum, activity) => sum + activity.minutes, 0);
const totalActivityCalories = activities.reduce((sum, activity) => sum + activity.calories, 0);
const longActivities = activities.filter((activity) => activity.minutes > 30);
const topCaloriesActivity = activities.reduce((best, activity) =>
  activity.calories > best.calories ? activity : best
);

console.log(
  `W tygodniu wykonano ${activities.length} aktywnosci. Laczny czas to ${totalActivityMinutes} minut, a spalone kalorie to ${totalActivityCalories} kcal.`
);
console.log(`Aktywnosci dluzsze niz 30 minut: ${longActivities.map((activity) => activity.type).join(", ")}`);
console.log(
  `Najbardziej kaloryczny trening to ${topCaloriesActivity.type} i spalil ${topCaloriesActivity.calories} kcal.`
);

// Zadanie 11
// Tutaj caly wyjazd jest rozkladany na liczby: suma, wydatki per osoba i glowny platnik.
// Rozszerzeniem jest rozliczenie, kto po rownym podziale powinien oddac, a kto odzyskac pieniadze.
// Najwiecej myslenia bylo przy przeliczeniu salda dla kazdej osoby, zeby wynik byl od razu do odczytania.

const tripCosts = [
  { label: "nocleg", amount: 420, paidBy: "Anna" },
  { label: "paliwo", amount: 260, paidBy: "Piotr" },
  { label: "jedzenie", amount: 180, paidBy: "Anna" },
  { label: "bilety", amount: 140, paidBy: "Ola" }
];

const totalTripCost = tripCosts.reduce((sum, cost) => sum + cost.amount, 0);
const costsByPerson = tripCosts.reduce((result, cost) => {
  result[cost.paidBy] = (result[cost.paidBy] || 0) + cost.amount;
  return result;
}, {});
const biggestPayer = Object.entries(costsByPerson).reduce((maxEntry, currentEntry) =>
  currentEntry[1] > maxEntry[1] ? currentEntry : maxEntry
);
const equalShare = totalTripCost / Object.keys(costsByPerson).length;
const settlements = Object.entries(costsByPerson).reduce((result, [person, amount]) => {
  result[person] = Number((amount - equalShare).toFixed(2));
  return result;
}, {});

function formatSettlement(person, balance) {
  if (balance > 0) {
    return `${person} powinien otrzymac ${balance.toFixed(2)} zl.`;
  }

  if (balance < 0) {
    return `${person} powinien oddac ${Math.abs(balance).toFixed(2)} zl.`;
  }

  return `${person} jest rozliczony idealnie.`;
}

console.log(`Calkowity koszt wyjazdu: ${totalTripCost} zl`);
console.log("Koszty per osoba:", costsByPerson);
console.log(`Najwiecej zaplacila osoba: ${biggestPayer[0]} (${biggestPayer[1]} zl)`);
console.log(`Rowny udzial na osobe: ${equalShare.toFixed(2)} zl`);
console.log("Rozliczenie:", Object.entries(settlements).map(([person, balance]) => formatSettlement(person, balance)));

// Zadanie 12
// W tym miejscu kontakty da sie przesiewac po miescie, ulubionych i potem ladnie formatowac.
// Od siebie dodalem wyszukiwanie po fragmencie nazwy, bo to juz przypomina normalna ksiazke kontaktow.
// Najwieksza trudnosc byla w zrobieniu wyszukiwania tak, zeby bylo wygodne i nie wykladalo sie na wielkosci liter.

const contacts = [
  { name: "Anna Nowak", phone: "500-100-200", city: "Katowice", favorite: true },
  { name: "Piotr Lis", phone: "501-300-700", city: "Sosnowiec", favorite: false },
  { name: "Ola Marek", phone: "502-400-900", city: "Katowice", favorite: true }
];

function getContactsByCity(contactList, city) {
  return contactList.filter((contact) => contact.city === city);
}

function getFavoriteContacts(contactList) {
  return contactList.filter((contact) => contact.favorite);
}

function formatContacts(contactList) {
  return contactList.map((contact) => `${contact.name} - ${contact.phone}`);
}

function searchContactsByName(contactList, fragment) {
  const lowerCaseFragment = fragment.toLowerCase();
  return contactList.filter((contact) => contact.name.toLowerCase().includes(lowerCaseFragment));
}

console.log("Kontakty z Katowic:", formatContacts(getContactsByCity(contacts, "Katowice")));
console.log("Kontakty ulubione:", formatContacts(getFavoriteContacts(contacts)));
console.log("Wyszukiwanie po fragmencie 'Pi':", formatContacts(searchContactsByName(contacts, "Pi")));
console.log("Wyszukiwanie po fragmencie 'a':", formatContacts(searchContactsByName(contacts, "a")));

// Zadanie 13
// Tutaj pobieram dane pogodowe z API, odczytuje potrzebne pola i lapie ewentualny blad.
// Moje rozszerzenie to parametry szerokosci i dlugosci geograficznej, zeby latwo zmieniac lokalizacje.
// Najbardziej trzeba bylo uwazac na asynchronicznosc i to, co ma sie stac, gdy odpowiedz z sieci nie przyjdzie poprawnie.

async function fetchWeather(latitude = 50.29, longitude = 19.1) {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;

  try {
    const response = await fetch(weatherUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    console.log(`Pogoda dla wspolrzednych ${latitude}, ${longitude}:`);
    console.log(`Temperatura: ${data.current.temperature_2m} ${data.current_units.temperature_2m}`);
    console.log(`Predkosc wiatru: ${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`);
    console.log(`Czas pomiaru: ${data.current.time}`);

    return data;
  } catch (error) {
    console.log(`Nie udalo sie pobrac danych pogodowych: ${error.message}`);
    return null;
  }
}

fetchWeather();

// Zadanie 14
// W tej czesci lista zadan umie urosnac, zmienic status i pokazac tylko te pozycje, ktore jeszcze zostaly.
// Rozszerzeniem jest priorytet zadania i dodatkowa informacja, kiedy cos zostalo oznaczone jako zrobione.
// Najwieksza trudnosc to zachowanie niemutowalnosci, czyli tworzenie nowych wersji listy zamiast psucia starej.

let todos = [
  { id: 1, title: "Oddac projekt", done: false },
  { id: 2, title: "Przeczytac rozdzial", done: true },
  { id: 3, title: "Przygotowac prezentacje", done: false }
];

function addTodo(todoList, title, priority = "normalny") {
  const nextId = todoList.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
  const newTodo = { id: nextId, title, done: false, priority };
  return [...todoList, newTodo];
}

function markTodoAsDone(todoList, todoId) {
  return todoList.map((todo) =>
    todo.id === todoId ? { ...todo, done: true, finished: "dzisiaj" } : todo
  );
}

function getOpenTodos(todoList) {
  return todoList.filter((todo) => !todo.done);
}

const todosAfterAdd = addTodo(todos, "Kupic notes", "wysoki");
const todosAfterUpdate = markTodoAsDone(todosAfterAdd, 1);
const openTodos = getOpenTodos(todosAfterUpdate);

console.log("Oryginalna lista todos:", todos);
console.log("Lista po dodaniu zadania:", todosAfterAdd);
console.log("Lista po oznaczeniu zadania jako wykonane:", todosAfterUpdate);
console.log("Zadania niewykonane:", openTodos);

// Zadanie 15
// Tutaj plan zajec daje sie przefiltrowac po dniu i zamienic w prosty opis do przeczytania.
// Od siebie dodalem osobne wyszukiwanie zajec online, bo to naturalne rozszerzenie takiego planera.
// Najwiecej uwagi wymagalo zrobienie jednego formatu opisu, ktory pasuje i do sali, i do zajec zdalnych.

const schedule = [
  { day: "poniedzialek", subject: "Programowanie", room: "A12", online: false },
  { day: "wtorek", subject: "Bazy danych", room: "online", online: true },
  { day: "czwartek", subject: "Grafika", room: "B03", online: false },
  { day: "piatek", subject: "UX", room: "online", online: true }
];

function getClassesByDay(scheduleList, day) {
  return scheduleList.filter((item) => item.day === day);
}

function formatSchedule(scheduleList) {
  return scheduleList.map(
    (item) => `${item.subject} - ${item.room} - ${item.online ? "online" : "stacjonarne"}`
  );
}

function getClassesByMode(scheduleList, onlineValue) {
  return scheduleList.filter((item) => item.online === onlineValue);
}

const thursdayClasses = getClassesByDay(schedule, "czwartek");
const fridayClasses = getClassesByDay(schedule, "piatek");
const onlineClasses = getClassesByMode(schedule, true);

console.log(`Liczba wszystkich zajec w tygodniu: ${schedule.length}`);
console.log("Zajecia w czwartek:", formatSchedule(thursdayClasses));
console.log("Zajecia w piatek:", formatSchedule(fridayClasses));
console.log("Zajecia online:", formatSchedule(onlineClasses));
