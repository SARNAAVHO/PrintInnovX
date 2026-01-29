export async function apiFetch(path, options = {}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
    options
  );

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
}
