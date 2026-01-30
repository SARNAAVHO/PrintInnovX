import DeviceItem from "./DeviceItem";

export default function DevicesCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="font-semibold mb-4">Registered Devices</h2>

      <div className="space-y-4">
        <DeviceItem
          name="Test Shop 050205"
          printer="Test Printer 050205"
          status="online"
          lastSeen="1/26/2026, 10:32:05 AM"
        />

        <DeviceItem
          name="Test Shop Playwright"
          printer="Test Printer Playwright"
          status="offline"
        />

        <DeviceItem
          name="Campus Printing Shop"
          printer="Campus Printer"
          status="offline"
        />
      </div>
    </div>
  );
}
