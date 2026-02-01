"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { fetchAdminJobs } from "@/lib/api";

export default function JobsCard() {
  const { getToken } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const token = await getToken();
        const data = await fetchAdminJobs(token);
        setJobs(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [getToken]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="font-semibold mb-4">Recent Jobs</h2>

      <div className="space-y-3">
        {jobs.length === 0 && (
          <p className="text-slate-400">No recent jobs</p>
        )}

        {jobs.map(job => (
          <div
            key={job.id}
            className="flex justify-between items-center p-4 rounded-xl hover:bg-slate-50 transition cursor-pointer"
          >
            <div>
              <p className="font-medium">{job.fileName}</p>
              <p className="text-sm text-slate-500">
                {job.pages} pages × {job.copies} | {job.colorMode}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {new Date(job.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">₹{job.price}</p>
              <span className="mt-2 inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                {job.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
