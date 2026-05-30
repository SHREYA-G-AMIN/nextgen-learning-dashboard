import Sidebar from "@/components/layout/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="flex">
        <Sidebar />

        <section className="flex-1 p-6">
          Dashboard Content
        </section>
      </div>
    </main>
  );
}