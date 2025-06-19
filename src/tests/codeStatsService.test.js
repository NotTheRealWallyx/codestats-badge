import { describe, it, expect } from 'vitest';
import { getCodeStatsSVG } from '../codeStatsService.js';

describe('getCodeStatsSVG', () => {
  it('should throw if username is missing', async () => {
    await expect(getCodeStatsSVG()).rejects.toThrow();
  });
});
