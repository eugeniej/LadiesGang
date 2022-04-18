export const hasMetamask = () => {
  return typeof window !== undefined && typeof window.ethereum !== "undefined";
};
