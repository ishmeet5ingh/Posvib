import { useState, useEffect } from "react";

const useProgress = (loading, setLoading, fileSize) => {
  const [progress, setProgress] = useState(0);
  let duration;
  if(fileSize < 900) duration = 20
  else if(fileSize > 900 && fileSize < 1500) duration = 30
  else if(fileSize > 1500 && fileSize < 3000) duration = 50
  else if(fileSize > 3000 && fileSize < 6000) duration = 90
  else if(fileSize > 6000) duration = 110

  useEffect(() => {
    if (loading === 2) {
      let progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          } else {
            clearInterval(progressInterval);
            return prevProgress;
          }
        });
      }, duration);

      return () => clearInterval(progressInterval);
    }
  }, [loading]);

  return { progress, setProgress, setLoading };
};

export default useProgress;
