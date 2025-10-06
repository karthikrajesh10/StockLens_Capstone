import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [symbol, setSymbol] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol.trim()) onSearch(symbol.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex gap-2">
      <input
        type="text"
        placeholder="Enter Stock Symbol (e.g. INFY)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="border px-4 py-2 rounded w-60"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Analyze
      </button>
    </form>
  );
}
