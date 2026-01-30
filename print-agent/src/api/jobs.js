import { apiRequest } from "./client.js";

export async function getNextJob(token) {
  const res = await apiRequest("/api/jobs/next", "POST", token);
  return res.job;
}

export function updateJobStatus(jobId, status, token) {
  return apiRequest(`/api/jobs/${jobId}/status`, "PATCH", token, { status });
}
