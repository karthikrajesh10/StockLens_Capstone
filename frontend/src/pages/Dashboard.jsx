import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ArticleList from "../components/ArticleList";
import SentimentSummary from "../components/SentimentSummary";
import AudioPlayer from "../components/AudioPlayer"; // ✅ Import AudioPlayer

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (symbol) => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      console.log("Calling API:", `${import.meta.env.VITE_API_URL}/api/sentiment?stock=${symbol}`);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/sentiment?stock=${symbol}`
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch sentiment data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">📈 StockLens Dashboard</h1>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Loading state */}
      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}

      {/* Error message */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Data display */}
      {data && (
        <div className="mt-6 space-y-6">
          {/* Overall Sentiment Summary */}
          <SentimentSummary data={data.overall_sentiment} />

          {/* AI Summary Text */}
          {data.summary_text && (
            <div className="bg-gray-50 rounded-xl shadow-sm p-4 border border-gray-200">
              <h3 className="font-semibold text-lg mb-2">🧠 AI-Generated Summary</h3>
              <p className="text-gray-700 leading-relaxed">{data.summary_text}</p>
            </div>
          )}

          {/* Audio Player */}
          <AudioPlayer audioUrl={data.audio_url} />

          {/* Article List */}
          <ArticleList articles={data.articles} />
        </div>
      )}
    </div>
  );
}
