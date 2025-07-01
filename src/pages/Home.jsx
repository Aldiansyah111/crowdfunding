export default function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-16 bg-white">
      {/* Kiri: Konten Teks */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Bangun Proyekmu Bersama <span className="text-blue-600">Crowdfunding Web3</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Kumpulkan dana dengan transparansi dan kepercayaan menggunakan teknologi blockchain.
        </p>
        <a
          href="/crowdfunding"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Mulai Sekarang 🚀
        </a>
      </div>

      {/* Kanan: Gambar */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/vite.svg" // ganti dengan file kamu
          alt="Crowdfunding Illustration"
          className="max-w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </section>
  )
}
