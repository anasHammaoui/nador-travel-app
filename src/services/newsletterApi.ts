import axios from "axios";
import type { NewsletterSubscription, NewsletterResponse } from "../types";

const WEBHOOK_URL = import.meta.env.VITE_NEWSLETTER_WEBHOOK_URL;

/** Subscribe an email to the newsletter via n8n webhook */
export async function subscribeToNewsletter(
  data: NewsletterSubscription
): Promise<NewsletterResponse> {
  if (!WEBHOOK_URL) {
    // Mock success for development when webhook URL is not configured
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: "Inscription réussie (mode développement)" };
  }

  const response = await axios.post<NewsletterResponse>(WEBHOOK_URL, data, {
    headers: { "Content-Type": "application/json" },
    timeout: 10000,
  });
  return response.data;
}
