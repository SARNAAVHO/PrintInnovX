import QRCode from "qrcode";

export async function generateQrPng(url) {
  return QRCode.toBuffer(url, {
    type: "png",
    width: 400,
    margin: 2,
  });
}
