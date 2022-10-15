const { innerWidth: width, innerHeight: height } = window;

const useWindowSize = () => {
  return { width, height };
};

export default useWindowSize;
