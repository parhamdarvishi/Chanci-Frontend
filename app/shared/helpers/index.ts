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