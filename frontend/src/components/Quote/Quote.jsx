import React, { useEffect, useState } from "react";

const Quote = () => {
  const [quote, setQuote] = useState("Loading your daily motivation...");
  const [author, setAuthor] = useState("");
  const [fade, setFade] = useState(true);

  const fetchQuote = async () => {
    try {
      // ⭐ FIXED: Using stable proxy instead of allorigins
      const res = await fetch(
        "https://thingproxy.freeboard.io/fetch/https://zenquotes.io/api/random"
      );

      const data = await res.json();

      if (Array.isArray(data) && data[0]) {
        setFade(false);
        setTimeout(() => {
          setQuote(data[0].q);
          setAuthor(data[0].a);
          setFade(true);
        }, 400);
      }
    } catch (err) {
      console.error("QUOTE ERROR:", err);
      setFade(false);
      setTimeout(() => {
        setQuote("Small steps each day lead to big results.");
        setAuthor("Unknown");
        setFade(true);
      }, 400);
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bg-slate-900 text-white text-center
      flex flex-col justify-center items-center
      rounded-2xl shadow-lg p-2
      overflow-hidden
      h-auto
      w-[350px] sm:w-[400px] md:w-[450px] lg:w-[480px] transition-transform duration-300 
      "
    >
      <p
        className={`text-base sm:text-lg md:text-xl italic font-medium leading-relaxed 
        max-w-[90%] transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        “{quote}”
      </p>
      <p
        className={`text-xs sm:text-sm md:text-base mt-3 text-gray-300 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        — {author}
      </p>
    </div>
  );
};

export default Quote;
