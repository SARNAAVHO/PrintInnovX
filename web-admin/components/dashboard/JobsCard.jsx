export default function JobsCard() {
  return (
    <div className="bg-white rounded-xl border p-6">
      <h2 className="font-semibold mb-4">Recent Jobs</h2>

      <div className="border rounded-lg p-4 flex justify-between items-center">
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
          <span className="mt-2 inline-block px-3 py-1 text-xs rounded bg-slate-100">
            CREATED
          </span>
        </div>
      </div>
    </div>
  );
}
