export async function registerDevice({ shopName, deviceName }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/devices/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shopName, deviceName }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to register device");
  }

  return data;
}
