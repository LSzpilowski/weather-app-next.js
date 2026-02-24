export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-white text-xl font-light">Loading weather data...</p>
    </div>
  );
}
