"use client";

import { useEffect, useState } from "react";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  CircleDashed, 
  AlertCircle,
  TrendingUp,
  Receipt
} from "lucide-react";
import { fetchAdminJobs } from "@/lib/api";

export default function JobsCard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAdminJobs();
        setJobs(data);
      } catch (err) {
        console.error("Jobs error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-8 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Jobs</h2>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-md">
              <TrendingUp size={12} className="text-green-600" />
              <span className="text-[10px] font-bold text-green-600 uppercase">Live</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium">Real-time print activity logs</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
          <Receipt size={20} />
        </div>
      </div>

      {/* List Container */}
      <div className="px-4 pb-8">
        <div className="space-y-1">
          {loading ? (
            <div className="py-20 flex justify-center">
              <CircleDashed className="animate-spin text-indigo-500" size={32} />
            </div>
          ) : jobs.length === 0 ? (
            <div className="py-20 flex flex-col items-center text-center">
              <div className="p-4 bg-slate-50 rounded-full text-slate-300 mb-3">
                <FileText size={32} />
              </div>
              <p className="text-slate-400 font-medium">No recent print jobs</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="group flex justify-between items-center p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* File Icon with Status Overlay */}
                  <div className="relative">
                    <div className="p-3 bg-slate-100 text-slate-500 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                      <FileText size={22} />
                    </div>
                    {job.status === "completed" && (
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800 leading-none mb-1 group-hover:text-indigo-600 transition-colors">
                      {job.fileName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>{job.pages} pages</span>
                      <span className="text-slate-300">•</span>
                      <span>{job.copies} {job.copies > 1 ? 'copies' : 'copy'}</span>
                      <span className="text-slate-300">•</span>
                      <span className="capitalize">{job.colorMode}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1.5 uppercase tracking-wider font-bold">
                      <Clock size={10} />
                      {new Date(job.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-lg font-bold text-slate-900 leading-none">
                    ₹{job.price}
                  </p>
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg border ${getStatusStyle(job.status)}`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}