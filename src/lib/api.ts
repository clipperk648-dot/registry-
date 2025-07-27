const API_BASE_URL = 'http://localhost:3001/api';

export interface GiftCardSubmission {
  _id?: string;
  card_number: string;
  balance: number;
  date_checked: string;
}

export const api = {
  // Get all gift card submissions
  getGiftCards: async (): Promise<GiftCardSubmission[]> => {
    const response = await fetch(`${API_BASE_URL}/gift-cards`);
    if (!response.ok) {
      throw new Error('Failed to fetch gift cards');
    }
    return response.json();
  },

  // Create new gift card submission
  createGiftCard: async (data: { card_number: string; balance: number }): Promise<GiftCardSubmission> => {
    const response = await fetch(`${API_BASE_URL}/gift-cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create gift card submission');
    }
    return response.json();
  },

  // Delete all gift card submissions
  deleteAllGiftCards: async (): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/gift-cards`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete gift cards');
    }
    return response.json();
  },

  // Health check
  healthCheck: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('Server health check failed');
    }
    return response.json();
  }
};
