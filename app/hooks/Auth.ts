import { useState, useEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return { user, setUser };
};
