const useHandleTextareaInput = () => {
    return (e) => {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    };
  };
  
  export default useHandleTextareaInput;
  