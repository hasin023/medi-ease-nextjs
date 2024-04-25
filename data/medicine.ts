import { db } from "@/lib/db"

export const getAllMedicines = async () => {
  try {
    const medicines = await db.medicine.findMany({})

    return medicines
  } catch {
    return null
  }
}

export const getMedicineById = async (id: string) => {
  try {
    const medicine = await db.medicine.findUnique({
      where: { id },
    })

    return medicine
  } catch {
    return null
  }
}

export const getMedicineByName = async (name: string) => {
  try {
    const medicine = await db.medicine.findUnique({
      where: { medicineName: name },
    })

    return medicine
  } catch {
    return null
  }
}

export const getMedicinesByManufacturer = async (manufacturer: string) => {
  try {
    const medicines = await db.medicine.findMany({
      where: { manufacturer },
    })

    return medicines
  } catch {
    return null
  }
}
