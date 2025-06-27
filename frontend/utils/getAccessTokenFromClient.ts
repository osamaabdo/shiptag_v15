export function getAccessTokenFromClient(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem('access_token');
}