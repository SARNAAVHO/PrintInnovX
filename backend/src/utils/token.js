import crypto from "crypto";

export function generateAuthToken() {
  return crypto.randomBytes(32).toString("hex");
}
