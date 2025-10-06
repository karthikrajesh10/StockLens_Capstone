export default function ArticleList({ articles }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">📰 Related News</h2>
      {articles.map((a) => (
        <div key={a.id} className="border-b py-2">
          <h3 className="font-bold">{a.headline}</h3>
          <p>{a.summary}</p>
          <p className="text-sm">
            Sentiment: <strong>{a.sentiment}</strong> ({a.score})
          </p>
        </div>
      ))}
    </div>
  );
}
