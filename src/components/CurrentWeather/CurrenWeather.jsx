import { useEffect, useState } from "react";
import { fetchWeatherData } from "../../utils/weatherService";

import iconSunny from "../../assets/images/icon-sunny.webp";
import iconPartlyCloudy from "../../assets/images/icon-partly-cloudy.webp";
import iconOvercast from "../../assets/images/icon-overcast.webp";
import iconFog from "../../assets/images/icon-fog.webp";
import iconDrizzle from "../../assets/images/icon-drizzle.webp";
import iconRain from "../../assets/images/icon-rain.webp";
import iconSnow from "../../assets/images/icon-snow.webp";
import iconStorm from "../../assets/images/icon-storm.webp";

const getWeatherIcon = (code) => {
  if (code === 0) return iconSunny;
  if (code === 1 || code === 2) return iconPartlyCloudy;
  if (code === 3) return iconOvercast;
  if (code === 45 || code === 48) return iconFog;
  if (code >= 51 && code <= 57) return iconDrizzle;
  if (code >= 61 && code <= 67) return iconRain;
  if (code >= 71 && code <= 77) return iconSnow;
  if (code >= 80 && code <= 82) return iconRain;
  if (code >= 85 && code <= 86) return iconSnow;
  if (code >= 95 && code <= 99) return iconStorm;
  return iconSunny;
};

const CurrentWeather = ({ weather: searchedWeather }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (latitude, longitude, name = "Current Location") => {
    try {
      const data = await fetchWeatherData(latitude, longitude);
      setCurrentWeather({
        name,
        ...data,
      });
    } catch (err) {
      console.error("❌ Error fetching weather data", err);
      alert("Unable to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchedWeather) {
      setCurrentWeather(searchedWeather);
      setLoading(false);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          console.warn("⚠️ Unable to get location ", err);
          fetchWeather(10.762622, 106.660172, "Ho Chi Minh City");
          alert(
            "Unable to retrieve your location."
          );
        }
      );
    } else {
      console.warn("⚠️ Geolocation not supported");
      fetchWeather(10.762622, 106.660172, "Ho Chi Minh City");
    }
  }, [searchedWeather]);

  if (loading)
    return (
      <div className="text-center mt-10 text-neutral-400 text-lg animate-pulse">
        ⛅ Loading current weather...
      </div>
    );

  if (!currentWeather)
    return (
      <div className="text-center mt-10 text-neutral-400 text-lg">
        ⚠️ Unable to display weather data.
      </div>
    );

  const icon = getWeatherIcon(currentWeather.code);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col items-center mt-16">
      {/* Weather Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-3xl w-full max-w-2xl p-8 shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-center">
          {/* Left */}
          <div className="text-white">
            <h2 className="text-2xl font-semibold">{currentWeather.name}</h2>
            <p className="text-neutral-200 text-sm mt-1">{today}</p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <img src={icon} alt="weather" className="w-16 h-16 drop-shadow-md" />
            <p className="text-6xl font-bold text-white">
              {currentWeather.temperature}°
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 w-full max-w-2xl">
        <div className="bg-[#0b0b2a] rounded-2xl p-4 text-center">
          <p className="text-neutral-400 text-sm">Feels Like</p>
          <p className="text-white text-xl font-semibold">
            {currentWeather.temperature}°
          </p>
        </div>
        <div className="bg-[#0b0b2a] rounded-2xl p-4 text-center">
          <p className="text-neutral-400 text-sm">Humidity</p>
          <p className="text-white text-xl font-semibold">
            {currentWeather.humidity}%
          </p>
        </div>
        <div className="bg-[#0b0b2a] rounded-2xl p-4 text-center">
          <p className="text-neutral-400 text-sm">Wind</p>
          <p className="text-white text-xl font-semibold">
            {currentWeather.wind} km/h
          </p>
        </div>
        <div className="bg-[#0b0b2a] rounded-2xl p-4 text-center">
          <p className="text-neutral-400 text-sm">Precipitation</p>
          <p className="text-white text-xl font-semibold">0 mm</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;