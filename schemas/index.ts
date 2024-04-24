import * as z from "zod"

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
})

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(4, { message: "Minimum 4 characters required" }),
  role: z.enum(["PATIENT", "DOCTOR", "ADMIN", "null"]),
  patientType: z.enum(["STUDENT", "FACULTY", "STAFF", "null"]),
})
