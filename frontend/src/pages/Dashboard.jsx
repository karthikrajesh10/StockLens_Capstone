import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ArticleList from "../components/ArticleList";
import SentimentSummary from "../components/SentimentSummary";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (symbol) => {
    setLoading(true);
    try {
       console.log("Calling API:", `${import.meta.env.VITE_API_URL}/api/sentiment?stock=${symbol}`);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/sentiment?stock=${symbol}`
      );
      setData(res.data);
    } catch (error) {
      alert("Failed to fetch sentiment data.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mt-4">📈 StockLens Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-center">Loading...</p>}
      {data && (
        <>
          <SentimentSummary data={data.overall_sentiment} />
          <ArticleList articles={data.articles} />
        </>
      )}
    </div>
  );
}
