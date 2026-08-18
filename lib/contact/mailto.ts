export type MailtoInput = {
  email: string;
  subject: string;
  body: string;
};

export function buildMailtoHref({ email, subject, body }: MailtoInput): string {
  const query = new URLSearchParams({ subject, body });
  return `mailto:${email}?${query.toString().replace(/\+/g, '%20')}`;
}
