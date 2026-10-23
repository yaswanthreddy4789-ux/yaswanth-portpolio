/** Shared (client + server) validation for the quote form. */

export type ContactInput = {
  name: string;
  email: string;
  businessName: string;
  service: string;
  budget: string;
  contactMethod: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = { name: 100, email: 254, businessName: 120, service: 100, budget: 60, contactMethod: 40, message: 4000 } as const;

export function validateContact(v: ContactInput): FieldErrors {
  const e: FieldErrors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  else if (v.name.length > LIMITS.name) e.name = "Name is too long.";

  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL.test(v.email.trim()) || v.email.length > LIMITS.email) e.email = "Please enter a valid email address.";

  if (v.businessName.length > LIMITS.businessName) e.businessName = "Business name is too long.";

  if (!v.service.trim()) e.service = "Please choose a service.";
  else if (v.service.length > LIMITS.service) e.service = "Invalid service.";

  if (v.budget.length > LIMITS.budget) e.budget = "Invalid budget.";
  if (v.contactMethod.length > LIMITS.contactMethod) e.contactMethod = "Invalid contact method.";

  if (v.message.trim().length < 10) e.message = "Please describe your project (at least 10 characters).";
  else if (v.message.length > LIMITS.message) e.message = `Please keep this under ${LIMITS.message} characters.`;
  return e;
}
