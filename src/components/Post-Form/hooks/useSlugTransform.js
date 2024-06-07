import { useCallback } from "react";

const useSlugTransform = () => {
  return useCallback((value) => {
    if (value && typeof value === "string") {
      const transformedString = value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

      const words = transformedString.split("-");

      const firstWord = words[0];
      const lastWord = words[words.length - 1];

      if (words.length > 1) {
        return `${firstWord}..${words.length}-words..${lastWord}`;
      } else {
        return `${firstWord}`;
      }
    }
  }, []);
};

export default useSlugTransform;
