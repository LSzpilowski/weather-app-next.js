import Weather from "./components/Weather";

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col desktop-app md:flex md:flex-col">
      <Weather />
    </div>
  );
}
