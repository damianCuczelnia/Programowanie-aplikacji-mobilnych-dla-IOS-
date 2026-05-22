export function getWeatherInfo(code) {
  if (code === 0) return { icon: '☀️', label: 'Bezchmurnie' };
  if (code <= 3) return { icon: '⛅', label: 'Częściowe zachmurzenie' };
  if (code <= 48) return { icon: '🌫️', label: 'Mgła' };
  if (code <= 55) return { icon: '🌦️', label: 'Mżawka' };
  if (code <= 65) return { icon: '🌧️', label: 'Deszcz' };
  if (code <= 75) return { icon: '❄️', label: 'Śnieg' };
  if (code <= 82) return { icon: '🌧️', label: 'Przelotny deszcz' };
  if (code <= 86) return { icon: '🌨️', label: 'Przelotny śnieg' };
  if (code <= 99) return { icon: '⛈️', label: 'Burza' };
  return { icon: '🌡️', label: 'Brak danych' };
}
