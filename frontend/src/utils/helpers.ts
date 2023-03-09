interface AuthHeader {
  headers: {
    Authorization: string;
  };
}

export const getItem = (key: string): string | null => {
  const value = localStorage.getItem(key);
  return value;
};

export const setItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const getAuthHeader = (): AuthHeader => {
  const token = getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
