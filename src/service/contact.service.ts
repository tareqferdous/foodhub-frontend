const API_URL =
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL : "/api";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const submitContactMessage = async (payload: ContactPayload) => {
  const response = await fetch(`${API_URL}/contact-messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok || !json?.success) {
    return {
      data: null,
      error: {
        message: json?.message || "Failed to send message",
      },
    };
  }

  return {
    data: json.data,
    error: null,
  };
};

export const contactService = {
  submitContactMessage,
};
