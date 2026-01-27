-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "deviceName" TEXT NOT NULL,
    "authToken" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_authToken_key" ON "Device"("authToken");
