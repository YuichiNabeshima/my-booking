export const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
      const hour = Math.floor(i / 4) + 11
      const minute = (i % 4) * 15
      return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
    });