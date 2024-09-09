import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen bg-white text-black relative`}>
      <Navbar />
      <main className="flex-1">
        <section className="min-h-screen w-full flex justify-center pt-24"></section>
      </main>
    </div>
  );
}
