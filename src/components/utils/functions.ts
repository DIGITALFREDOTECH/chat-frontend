export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function getInitials(data: string): string {
  if (data.split(" ").length > 2) {
    return `${data.toUpperCase().split(" ")[0].charAt(0).toUpperCase()}${data
      .split(" ")[1]
      .charAt(0)}`;
  } else {
    return data.charAt(0) + data.charAt(0);
  }
}

export function getMember(count: number): string {
  if (count === 1) {
    return "1 Memeber";
  } else {
    return `${count} Members`;
  }
}
