const BACKEND_URL = "https://card-registry-backend.onrender.com";
const API_BASE_URL = `${BACKEND_URL}/api`;

export type RegisterCardSuccess = {
  success: true;
  message: string;
  id: string;
  submittedAt: string;
  cardNumber: string;
};

export type GetAllCardsSuccess = {
  success: true;
  count: number;
  total: number;
  cards: Array<{
    _id: string;
    cardNumber: string;
    submittedAt: string;
  }>;
};

export type CheckCardSuccess = {
  success: true;
  exists: boolean;
  submittedAt?: string;
  cardNumber?: string;
};

export type CountSuccess = {
  success: true;
  count: number;
};

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export class ApiTimeoutError extends Error {
  constructor(message = "Request timed out") {
    super(message);
    this.name = "ApiTimeoutError";
  }
}

async function fetchJson<T>(
  path: string,
  options: RequestInit & { timeoutMs?: number } = {}
): Promise<T> {
  const { timeoutMs = 90000, ...init } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
    });

    clearTimeout(timeout);
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      const msg = data?.error || `Request failed (${res.status})`;
      throw new ApiError(msg, res.status);
    }

    return data as T;
  } catch (err: any) {
    clearTimeout(timeout);
    if (err?.name === "AbortError") throw new ApiTimeoutError();
    throw err;
  }
}

export const api = {
  submitCard: (cardNumber: string) =>
    fetchJson<RegisterCardSuccess>("/cards", {
      method: "POST",
      body: JSON.stringify({ cardNumber }),
    }),

  getAllCards: () => 
    fetchJson<GetAllCardsSuccess>("/cards", { method: "GET" }),

  checkCardExists: (cardNumber: string) =>
    fetchJson<CheckCardSuccess>(
      `/cards/check/${encodeURIComponent(cardNumber)}`,
      { method: "GET" }
    ),

  getCardCount: () => 
    fetchJson<CountSuccess>("/cards/count", { method: "GET" }),

  deleteCard: (cardNumber: string) =>
    fetchJson<{ success: true; message: string }>(
      `/cards/${encodeURIComponent(cardNumber)}`,
      { method: "DELETE" }
    ),
};
