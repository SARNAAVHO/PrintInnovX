export default function JobsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="font-semibold mb-4">Recent Jobs</h2>

      <div className="flex justify-between items-center p-4 rounded-xl hover:bg-slate-50 transition cursor-pointer">
        <div>
          <p className="font-medium">test_document.pdf</p>
          <p className="text-sm text-slate-500">
            1 pages × 1 copies | B&W
          </p>
          <p className="text-xs text-slate-400 mt-1">
            1/26/2026, 10:32:06 AM
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold">₹2.00</p>
          <span className="mt-2 inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
            CREATED
          </span>
        </div>
      </div>
    </div>
  );
}
