import { useEffect, useState } from 'react';

function useElapsedTime(createdAt) {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    function calculateTimeDifference(createdAt) {
      const startDate = new Date(createdAt);
      const currentDate = new Date();
      const timeDifference = currentDate - startDate;

      const seconds = Math.abs(Math.floor(timeDifference / 1000));
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

    if (createdAt) {
      const elapsedTime = calculateTimeDifference(createdAt);
      setElapsedTime(elapsedTime);
    }

 
    // const interval = setInterval(() => {
      const elapsedTime = calculateTimeDifference(createdAt);
      setElapsedTime(elapsedTime);
    // }, 60000); 

    // return () => clearInterval(interval); 
  }, [createdAt]);

  return elapsedTime;
}

export default useElapsedTime;
