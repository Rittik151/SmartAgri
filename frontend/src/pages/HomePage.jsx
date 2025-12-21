import { useState } from "react";

function Home() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // const fetchWeather = async () => {
  //   if (!location.trim()) return;

  //   try {
  //     const res = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
  //     );
  //     const data = await res.json();
  //     if (data.cod === 200) setWeather(data);
  //   } catch (err) {
  //     console.log("Weather fetch error:", err);
  //   }
  // };

  const fetchWeather = async () => {
    if (!location.trim()) return;

    try {
      let weatherUrl = "";

      // 1️⃣ Check if input is Indian PIN code
      const isPincode = /^\d{6}$/.test(location);

      if (isPincode) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${location},IN&units=metric&appid=${API_KEY}`;
      } else {
        // 2️⃣ Convert place name → coordinates (works for villages)
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
        );

        const geoData = await geoRes.json();

        if (!geoData.length) {
          alert("Location not found. Try nearby town or PIN code.");
          return;
        }

        const { lat, lon } = geoData[0];

        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      }

      // 3️⃣ Fetch weather
      const res = await fetch(weatherUrl);
      const data = await res.json();

      if (data.cod !== 200) {
        alert("Weather data unavailable for this location.");
        return;
      }

      setWeather(data);
    } catch (error) {
      console.error("Weather fetch failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-300/50 text-slate-800">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[88vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg"
            className="w-full h-full object-cover scale-105 opacity-95"
            alt="Agriculture"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-900/75 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-20 md:pb-40">
          <div className="max-w-3xl">
            <div className="inline-flex px-5 py-2 rounded-full bg-green-500/25 border border-green-400/40 backdrop-blur-md shadow-sm mb-6">
              <span className="text-green-100 text-sm font-semibold tracking-wide uppercase">
                Next Gen Farming
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-md leading-tight">
              Smart Power <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-200">
                Distribution
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-green-50 opacity-90 max-w-xl leading-relaxed">
              Efficient, transparent, and farmer-friendly power allocation
              powered by intelligent real-time analytics.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/register"
                className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold shadow-lg hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 text-center"
              >
                Get Started
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="/about"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white font-bold rounded-full transition-all duration-300 text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WEATHER SEARCH CARD ================= */}
      <section className="relative z-20 max-w-5xl mx-auto px-6 mt-20 mb-28">
        <div className="bg-white rounded-3xl shadow-2xl shadow-green-900/20 p-10 border border-slate-100">
          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800">
              Weather-Integrated Planning
            </h2>
            <p className="text-slate-500 mt-2">
              Enter your region to optimize irrigation and scheduling.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Enter district or city name..."
              className="flex-1 px-6 py-4 text-lg bg-slate-50 border-2 border-slate-200 rounded-xl 
              placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 
              outline-none transition-all"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              onClick={fetchWeather}
              className="px-10 py-4 text-lg bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-xl
              shadow-md hover:shadow-xl transition-all duration-300"
            >
              Check
            </button>

            <button
              onClick={() => {
                navigator.geolocation.getCurrentPosition(async (pos) => {
                  const { latitude, longitude } = pos.coords;

                  const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
                  );

                  const data = await res.json();
                  setWeather(data);
                });
              }}
              className="px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow-md transition"
            >
              Use My Location
            </button>
          </div>

          {/* Weather Card */}
          {weather && (
            <div className="mt-12">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                {/* Decorative lighting */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 blur-3xl rounded-full" />

                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold uppercase tracking-wider opacity-95">
                    {weather.name}
                  </h3>

                  <p className="text-7xl font-extrabold my-5 drop-shadow-sm">
                    {Math.round(weather.main.temp)}°
                  </p>

                  <p className="text-lg font-semibold bg-white/20 px-4 py-1 rounded-full inline-block mb-6">
                    {weather.weather[0].description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/25">
                    <div>
                      <p className="text-3xl font-bold">
                        {weather.main.humidity}%
                      </p>
                      <p className="text-xs uppercase opacity-70 tracking-wide">
                        Humidity
                      </p>
                    </div>

                    <div>
                      <p className="text-3xl font-bold">
                        {weather.wind.speed}{" "}
                        <span className="text-base font-normal">m/s</span>
                      </p>
                      <p className="text-xs uppercase opacity-70 tracking-wide">
                        Wind Speed
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-4 text-sm opacity-90">
                    Based on current conditions, irrigation pump load may vary.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-800">
            Why Choose Our System?
          </h2>
          <p className="text-slate-600 mt-2 text-lg">
            Modern solutions for traditional challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              📊
            </div>
            <h3 className="text-xl font-bold mb-2">Real-Time Monitoring</h3>
            <p className="text-slate-600">
              Track power distribution live with smart usage reports and
              automated outage alerts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mb-6">
              🌾
            </div>
            <h3 className="text-xl font-bold mb-2">Farmer-Friendly</h3>
            <p className="text-slate-600">
              A simplified request system ensures you receive the electricity
              you need on time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
              🛡️
            </div>
            <h3 className="text-xl font-bold mb-2">Transparent & Secure</h3>
            <p className="text-slate-600">
              Admin-approved allocation and secure logging ensure complete
              fairness.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-slate-400 py-14">
        <div className="max-w-6xl mx-auto text-center px-6">
          <div className="text-3xl font-extrabold text-white mb-4">
            Smart<span className="text-emerald-500">Agri</span>
          </div>

          <div className="flex justify-center gap-8 text-sm mb-8">
            <a href="#" className="hover:text-emerald-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-400 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-emerald-400 transition">
              Support
            </a>
          </div>

          <p className="text-sm opacity-60">
            © 2025 Smart Agriculture Power Distribution. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
