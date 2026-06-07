"use client";

export default function Error({ error }) {
  console.error("PAGE ERROR:", error);

  return (
    <div style={{ padding: 20 }}>
      <h1>Something went wrong</h1>
      <pre>{String(error?.message)}</pre>
    </div>
  );
}