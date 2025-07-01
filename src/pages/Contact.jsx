export default function Contact() {
  return (
    <section className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
        <p className="text-gray-600 mb-8">
          Punya pertanyaan atau ingin diskusi seputar proyek crowdfunding? Silakan kirim pesan melalui form di bawah.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              placeholder="Nama lengkap"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Email kamu"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Pesan</label>
            <textarea
              rows="5"
              placeholder="Tulis pesan kamu di sini..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Kirim Pesan
          </button>
        </form>
      </div>
    </section>
  )
}
