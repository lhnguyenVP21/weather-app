
export const fetchWeatherData = async (latitude, longitude) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weathercode&timezone=auto`
  );
  const data = await res.json();

  return {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    wind: data.current.wind_speed_10m,
    code: data.current.weathercode,
  };
};
