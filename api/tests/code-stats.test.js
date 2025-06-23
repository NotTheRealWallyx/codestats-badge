import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock getCodeStatsSVG before importing handler
vi.mock('../../src/codeStatsService.js', () => ({
  getCodeStatsSVG: vi.fn(),
}));

import { getCodeStatsSVG } from '../../src/codeStatsService.js';
import handler from '../code-stats.js';

function createRes() {
  const res = {};
  res.statusCode = 200;
  res.headers = {};
  res.status = vi.fn(function (code) {
    res.statusCode = code;
    return res;
  });
  res.setHeader = vi.fn((key, value) => {
    res.headers[key] = value;
  });
  res.send = vi.fn((body) => {
    res.body = body;
    return res;
  });
  return res;
}

describe('api/code-stats.js handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 if user is missing', async () => {
    const req = { query: {} };
    const res = createRes();
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Missing ?user=username');
  });

  it('returns SVG if user is provided', async () => {
    getCodeStatsSVG.mockResolvedValue('<svg>test</svg>');
    const req = { query: { user: 'testuser', limit: '2' } };
    const res = createRes();
    await handler(req, res);
    expect(getCodeStatsSVG).toHaveBeenCalledWith('testuser', '2');
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'image/svg+xml');
    expect(res.setHeader).toHaveBeenCalledWith('Content-Disposition', 'inline; filename="badge.svg"');
    expect(res.setHeader).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 's-maxage=3600');
    expect(res.send).toHaveBeenCalledWith('<svg>test</svg>');
    expect(res.status).not.toHaveBeenCalledWith(400);
  });

  it('returns 500 on error', async () => {
    getCodeStatsSVG.mockRejectedValue(new Error('fail'));
    const req = { query: { user: 'testuser' } };
    const res = createRes();
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error fetching user data from Code::Stats');
  });
});
