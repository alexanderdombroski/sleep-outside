export const lowerCaseKeys = <T extends Record<string, any> | any[]>(
  obj: T,
): T => {
  if (obj instanceof Date) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(lowerCaseKeys) as T;
  }

  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key[0]?.toLowerCase() + key.slice(1),
        lowerCaseKeys(value),
      ]),
    ) as T;
  }

  return obj;
};
