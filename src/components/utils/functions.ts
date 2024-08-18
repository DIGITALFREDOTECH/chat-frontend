export function formatDate(date: Date) {
  let newDate = date;
  if (typeof date == "string") {
    newDate = new Date(date);
  }
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(newDate);
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

type EncodedMessage = {
  email: string;
  chatId: string;
  message: string;
  userId: string;
  event: boolean;
  timestamp: Date;
};

export function encodeMessage(message: EncodedMessage): string {
  return JSON.stringify(message);
}

export function decodeMessage(data: string): EncodedMessage {
  const json = JSON.parse(data);
  const message: EncodedMessage = {
    email: json.email,
    chatId: json.chatId,
    message: json.message,
    userId: json.userId,
    event: json.event,
    timestamp: json.timestamp,
  };

  return message;
}
