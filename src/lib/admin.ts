export const ADMIN_EMAILS = [
  "wambuguelvis64@gmail.com",
  "elviselite64@gmail.com",
  "dkirema375@gmail.com",
];

export function isAdminEmail(email: string | undefined | null) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
