import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import iconsUnit from "../../assets/images/icon-units.svg";
import iconSearch from "../../assets/images/icon-search.svg";
import { fetchWeatherData } from "../../utils/weatherService";

const Header = ({ setWeather }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("Không tìm thấy địa điểm!");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2️⃣ Gọi hàm utils để lấy weather đầy đủ (temperature, humidity, wind, code,...)
      const data = await fetchWeatherData(latitude, longitude);

      // 3️⃣ Gửi toàn bộ dữ liệu lên App → CurrentWeather nhận sẽ có đủ `code`
      setWeather({
        name,
        country,
        latitude,
        longitude,
        ...data,
      });

      setQuery("");
    } catch (err) {
      console.error("Error fetching weather:", err);
      alert("Đã xảy ra lỗi khi tìm kiếm thời tiết.");
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center p-10">
        <img src={logo} alt="logo" />
        <div className="rounded-xl overflow-hidden">
          <button className="bg-gray-600 h-12 w-28 flex flex-row justify-center items-center gap-4 hover:bg-gray-500 transition-colors duration-300">
            <img src={iconsUnit} alt="icon-units" />
            <span className="font-bold">Units</span>
          </button>
        </div>
      </div>

      <h1 className="text-5xl font-bold text-center pt-20 pb-10">
        How's the sky looking today?
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center max-w-[600px] mx-auto gap-4"
      >
        <div className="flex items-center bg-gray-600 rounded-lg px-5 py-3 flex-1 gap-3">
          <img src={iconSearch} alt="icon-search" className="w-5 h-5 opacity-60" />
          <input
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-neutral-0 text-base flex-1 placeholder-neutral-300 font-sans focus:outline focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-neutral-0 rounded-lg px-8 py-3 font-semibold text-base transition-colors duration-200 hover:bg-blue-700 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-700 cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Header;
