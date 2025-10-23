export default function AudioPlayer({ audioUrl }) {
  if (!audioUrl) return null;
  return (
    <div className="mt-4">
      <h3 className="font-semibold">🎧 AI-Generated Summary</h3>
      <audio controls src={`${import.meta.env.VITE_API_URL}${audioUrl}`} className="w-full mt-2" />
    </div>
  );
}
