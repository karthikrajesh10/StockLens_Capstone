import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function SentimentSummary({ data }) {
  const pieData = [
    { name: "Positive", value: data.positive_articles },
    { name: "Negative", value: data.negative_articles },
    { name: "Neutral", value: data.neutral_articles },
  ];

  const COLORS = ["#4caf50", "#f44336", "#ff9800"];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">📊 Sentiment Summary</h2>
      <PieChart width={300} height={250}>
        <Pie
          data={pieData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {pieData.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <p className="text-center mt-2 text-lg font-bold">
        Overall: {data.overall}
      </p>
    </div>
  );
}
