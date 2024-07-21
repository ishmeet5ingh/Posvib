function useCurrentTime(isoDateString) {
  // Parse the ISO date string into a Date object
  const date = new Date(isoDateString);

  // Convert to IST
  const options = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  // Format the date to show the date and time
  const formatter = new Intl.DateTimeFormat('en-GB', options);
  return formatter.format(date);
}

export default useCurrentTime;
