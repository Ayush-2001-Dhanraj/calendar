export function convertTo12Hour(time24h: string): string {
    let [hours, minutes] = time24h.split(":").map(Number);
    const modifier = hours >= 12 ? "PM" : "AM";

    if (hours === 0) {
        hours = 12; // Midnight case: 00 -> 12 AM
    } else if (hours > 12) {
        hours -= 12; // Convert 13-23 hours to 1-11 PM
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${modifier}`;
}

export function convertTo24Hour(time12h: string): string {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
        hours += 12;
    } else if (modifier === "AM" && hours === 12) {
        hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function getFormattedDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };

    return date.toLocaleDateString(
        "en-CA",
        options
    ); // "en-CA" ensures YYYY-MM-DD format
}

