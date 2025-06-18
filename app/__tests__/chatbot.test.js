import { describe, it, expect, vi } from 'vitest';
import { POST as chatbotHandler } from '../api/chatbot/route';

// Monkey-patch global fetch to mock Gemini response
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        candidates: [
          {
            content: {
              parts: [{ text: "Yes, this food is healthy if eaten in moderation." }]
            }
          }
        ]
      })
  })
);

describe("POST /api/chatbot", () => {
  it("should return a Gemini-generated answer for a valid message", async () => {
    const req = new Request("http://localhost/api/chatbot", {
      method: "POST",
      body: JSON.stringify({ message: "Is eating paneer daily okay?" }),
      headers: { "Content-Type": "application/json" }
    });

    const res = await chatbotHandler(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.answer).toBeDefined();
    expect(json.answer).toContain("healthy"); // based on mock above
  });

  it("should return 400 if no message is provided", async () => {
    const req = new Request("http://localhost/api/chatbot", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" }
    });

    const res = await chatbotHandler(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("Invalid input");
  });
});
