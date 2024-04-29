"use server"

import {
  getAppointmentByTime,
  getPatientSpecificAppointments,
} from "@/data/appointment"
import { db } from "@/lib/db"
import { AppointmentSchema } from "@/schemas"
import * as z from "zod"

export const scheduleAppointment = async (
  values: z.infer<typeof AppointmentSchema>
) => {
  const validatedFields = AppointmentSchema.safeParse(values)

  if (!validatedFields.success) {
    return { Error: "Invalid fields" }
  }

  const { doctorId, patientId, time, weekday, reason } = validatedFields.data

  const existingAppointment = await getAppointmentByTime(time)

  if (existingAppointment) {
    return { Error: "An appointment already exists at that time" }
  }

  const existingAppointments = await getPatientSpecificAppointments(patientId)

  let pendingAppointments = []

  existingAppointments?.map((appointment) => {
    if (appointment.status === "PENDING") {
      pendingAppointments.push(appointment)
    }
  })

  if (pendingAppointments.length > 0) {
    return {
      Error: "You already have a pending appointment, please finish it first",
    }
  }

  await db.appointment.create({
    data: {
      doctorId,
      patientId,
      time,
      weekday,
      reason,
    },
  })

  return { Success: "Appointmend created successfully" }
}
