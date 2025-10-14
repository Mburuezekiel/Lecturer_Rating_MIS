import { demoAccounts } from "./dummyData";

export type UserRole = "admin" | "dean" | "hod" | "lecturer" | "student";

export interface User {
  email: string;
  name: string;
  role: UserRole;
}

export const login = (email: string, password: string): User | null => {
  const account = Object.values(demoAccounts).find(
    (acc) => acc.email === email && acc.password === password
  );

  if (account) {
    const user: User = {
      email: account.email,
      name: account.name,
      role: account.role as UserRole,
    };
    localStorage.setItem("lrmis_user", JSON.stringify(user));
    return user;
  }

  return null;
};

export const logout = () => {
  localStorage.removeItem("lrmis_user");
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem("lrmis_user");
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
