import { getCountryDataList } from "countries-list";
import { array, z } from "zod";
export const registerSchema = z.object({
  firstName: z.string().trim().min(50, { message: "This field is required" }),
  lastName: z.string().trim().min(50, { message: "This field is required" }),
  phoneNumber: z.string().trim().min(15, { message: "This field is required" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .min(50, { message: "This field is required" }),
  password: z.string().trim().min(8, { message: "Minimum of 8 characters" }),
  acceptTerms: z.coerce.boolean(),
});

export type RegisterValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().trim().min(8),
  rememberMe: z.coerce.boolean(),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const newPasswordSchema = z.object({
  password: z.string().trim().min(8, { message: "Minimum of 8 characters" }),
  password_confirm: z
    .string()
    .trim()
    .min(8, { message: "Minimum of 8 characters" }),
});

export type NewPasswordValues = z.infer<typeof newPasswordSchema>;

export const otpSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export type OTPValues = z.infer<typeof otpSchema>;

const countries = getCountryDataList().map((country) => country.name);

export const senderSchema = z
  .object({
    firstName: z.string().trim().min(2, { message: "This field is required" }),
    lastName: z.string().trim().min(2, { message: "This field is required" }),
    email: z
      .string({ message: "This field is required" })
      .trim()
      .email({ message: "Invalid email address" }),
    phoneNumber: z
      .string()
      .trim()
      .min(15, { message: "This field is required" }),
    address1: z.string({ message: "This field is required" }).trim(),
    address2: z.string().trim().optional(),
    country: z.string({ message: "This field is required" }).trim(),
    state: z.string({ message: "This field is required" }).trim(),
    city: z.string({ message: "This field is required" }).trim(),
    zipCode: z.string({ message: "This field is required" }).trim(),
  })
  .refine((data) => !countries.includes(data.country), { path: ["country"] });

export type SenderValues = z.infer<typeof senderSchema>;

export const recieverSchema = z
  .object({
    firstName: z.string().trim().min(2, { message: "This field is required" }),
    lastName: z.string().trim().min(2, { message: "This field is required" }),
    email: z
      .string({ message: "This field is required" })
      .trim()
      .email({ message: "Invalid email address" }),
    phoneNumber: z
      .string()
      .trim()
      .min(15, { message: "This field is required" }),
    address1: z.string({ message: "This field is required" }).trim(),
    address2: z.string().trim().optional(),
    country: z.string({ message: "This field is required" }).trim(),
    state: z.string({ message: "This field is required" }).trim(),
    city: z.string({ message: "This field is required" }).trim(),
    zipCode: z.string({ message: "This field is required" }).trim(),
  })
  .refine((data) => !countries.includes(data.country), { path: ["country"] });

export type RecieverValues = z.infer<typeof recieverSchema>;

export const itemTypeSchema = z.object({
  itemType: z.literal("items"),
  name: z
    .string({ message: "This field is required" })
    .trim()
    .min(1, { message: "This field is required" }),
  category: z.string().trim(),
  subCategory: z.string().trim(),
  hsCode: z.string().trim(),
  weight: z.coerce.number({ message: "This field is required" }),
  quantity: z.coerce.number({ message: "This field is required" }),
  value: z.coerce.number({ message: "This field is required" }),
});

export const documentSchema = z.object({
  itemType: z.literal("documents"),
  name: z
    .string({ message: "This field is required" })
    .trim()
    .min(1, { message: "This field is required" }),
  description: z.string({ message: "This field is required" }).trim(),
  weight: z.coerce.number({ message: "This field is required" }),
  quantity: z.coerce.number({ message: "This field is required" }),
});

export const itemSchema = z.discriminatedUnion("itemType", [
  itemTypeSchema,
  documentSchema,
]);

export type ItemValues = z.infer<typeof itemSchema>;

export const parcelSchema = z.object({
  packaging: z.enum(["default", "More"]),
  currency: z.enum(["NGN", "USD", "GBP"]),
  proofOfResidence: z.instanceof(File, { message: "This field is required" }),
  proofOfWeight: z.instanceof(File, { message: "This field is required" }),
  items: z.array(itemSchema),
});

export const parcelListSchema = z.object({
  parcels: array(parcelSchema),
});

export type ParcelListValues = z.infer<typeof parcelListSchema>;

export type ParcelValues = z.infer<typeof parcelSchema>;

export const qouteSchema = z.object({
  from_country: z.string({ message: "This field is required" }).trim(),
  from_state: z.string({ message: "This field is required" }).trim(),
  from_city: z.string({ message: "This field is required" }).trim(),
  to_country: z.string({ message: "This field is required" }).trim(),
  to_state: z.string({ message: "This field is required" }).trim(),
  to_city: z.string({ message: "This field is required" }).trim(),
  estimated_weight: z.coerce.number({ message: "This field is required" }),
});

export type QouteValues = z.infer<typeof qouteSchema>;
