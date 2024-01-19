export const useKeyGen = () => {
  let curID = 1;
  const ids = new WeakMap();
  return {
    getKey: (obj) => {
      if (!ids.has(obj)) ids.set(obj, String(curID++));
      return ids.get(obj);
    },
  };
};
