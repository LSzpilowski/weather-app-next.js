import Image from "next/image";
import Weather from "./components/Weather";

export default function Home() {
  return (
<div className='h-screen flex flex-col justify-center items-center bg-[#292929]'>
<Weather />
</div>
  );
}
