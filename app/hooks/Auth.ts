import { useState, useEffect } from "react";

export const getUsername = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return { user, setUser };
};

export const getUserID = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser != null) {
    const user = JSON.parse(storedUser);
    return user.id;
  }
  return null;

}