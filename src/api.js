// In dev, CRA's "proxy" field forwards relative /api/* requests to localhost:3001,
// so this stays empty. In production (e.g. GitHub Pages) there's no proxy, so
// REACT_APP_API_URL must point at the deployed backend (e.g. a Vercel project URL).
export const API_BASE_URL = process.env.REACT_APP_API_URL || '';
