import { useEffect, useState } from 'react';

function useElapsedTime(createdAt) {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    function calculateTimeDifference(createdAt) {
      const startDate = new Date(createdAt);
      const currentDate = new Date();
      const timeDifference = currentDate - startDate;

      const seconds = Math.floor(timeDifference / 1000) + 1;
      const minutes = Math.floor(timeDifference / (1000 * 60));
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
      const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44));
      const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));

      if (years > 0) {
        return `${years} y`;
      } else if (months > 0) {
        return `${months} mo`;
      } else if (weeks > 0) {
        return `${weeks} w`;
      } else if (days > 0) {
        return `${days} d`;
      } else if (hours > 0) {
        return `${hours} h`;
      } else if (minutes > 0) {
        return `${minutes} m`;
      } else {
        return `${seconds} s`;
      }
    }

    // Call calculateTimeDifference function initially and set the elapsed time
    if (createdAt) {
      const elapsedTime = calculateTimeDifference(createdAt);
      setElapsedTime(elapsedTime);
    }

    // Update elapsed time every minute to ensure accurate time display
    const interval = setInterval(() => {
      const elapsedTime = calculateTimeDifference(createdAt);
      setElapsedTime(elapsedTime);
    }, 60000); // Update every minute (60000 milliseconds)

    return () => clearInterval(interval); // Clean up interval on unmount or change of createdAt
  }, [createdAt]);

  return elapsedTime;
}

export default useElapsedTime;
