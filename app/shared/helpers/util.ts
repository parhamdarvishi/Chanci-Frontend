export const formatDate = (dateString : string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
const STORAGE_KEY = "userData";

export function saveUserData(data: object) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getUserData(): any | null {
  if (typeof window === 'undefined') {
    return undefined;
  }
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : undefined;
  } catch (e) {
    console.error("Error parsing userData:", e);
    return undefined;
  }
}

export function clearUserData() {
  localStorage.removeItem(STORAGE_KEY);
}