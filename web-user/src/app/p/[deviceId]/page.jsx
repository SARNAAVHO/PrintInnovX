import { notFound } from "next/navigation";
import PrintUI from "./PrintUI";

async function getPrinter(deviceId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/devices/${deviceId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function Page({ params }) {
  const { deviceId } = await params;
  const printer = await getPrinter(deviceId);

  if (!printer) notFound();

  return <PrintUI printer={printer} deviceId={deviceId} />;
}
