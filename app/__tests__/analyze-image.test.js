import { describe, it, expect, vi } from 'vitest';
import { FormData } from 'formdata-node';
import { fileFromPath } from 'formdata-node/file-from-path';
import { POST as handler } from '../api/analyze-image/route.js';

const mockGeminiResponse = {
  candidates: [
    {
      content: {
        parts: [
          {
            text: `
              Nutrition: 250 calories, 15g protein, 10g fat.
              Disease Risk: High sodium, avoid for hypertension.
              Alternatives: Grilled tofu, chickpeas, steamed broccoli.
            `
          }
        ]
      }
    }
  ]
};

describe('POST /api/analyze-image', async () => {
  it('should return analysis result for uploaded image', async () => {
    // 🔥 MOCKING global.fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockGeminiResponse),
        status: 200
      })
    );

    const form = new FormData();
    form.set('file', await fileFromPath('./public/testDish.jpeg'));

    const req = new Request('http://localhost/api/analyze-image', {
      method: 'POST',
      body: form,
      headers: form.headers
    });

    const res = await handler(req);
    const json = await res.json();

    console.log('STATUS:', res.status);
    console.log('RESPONSE:', JSON.stringify(json, null, 2));

    expect(res.status).toBe(200);
    expect(json).toHaveProperty('result');
    expect(json.result).toBeDefined();

    // 💥 If test fails, log the result before crashing
    if (!json.result?.candidates) {
      throw new Error('No candidates found. Full response: ' + JSON.stringify(json));
    }

    expect(json.result.candidates).toBeTruthy();
    expect(json.result.candidates[0].content.parts[0].text).toContain('Nutrition');
  });
});