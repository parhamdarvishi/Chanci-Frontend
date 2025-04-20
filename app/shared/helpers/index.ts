export * from "@shared/helpers/log";
// Helper function to format date strings
export const formatDateString = (value: any): string => {
  // Check if the value is a date string in ISO format
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  return String(value);
};
export const getFirstTrueKeyLabel = (data: any) => {
  for (const key in data) {
    if (data[key]) {
      // Insert space before each capital letter (except the first)
      const label = key.replace(/([a-z])([A-Z])/g, '$1 $2');
      return label;
    }
  }
  return null; // or return 'None' if no key is true
}
export const keyToLetter = (key: any) => {
  const label = key.replace(/([a-z])([A-Z])/g, '$1 $2');
  return label;
}