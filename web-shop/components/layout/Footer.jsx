export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center">
        <div className="font-semibold text-lg">PrintInnovX</div>
        <p className="text-sm text-gray-400 mt-2">
          Enterprise-grade cloud printing platform
        </p>

        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-400">
          <a href="/admin">Admin</a>
          <a href="/download">Download</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </footer>
  );
}
