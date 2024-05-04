export function formatTimestamp(timestamp) {
  // Convert Firestore timestamp to milliseconds
  const milliseconds =
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);

  // Create a Date object
  const date = new Date(milliseconds);

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Return the formatted date string
  return `${day} ${month} ${year}`;
}
