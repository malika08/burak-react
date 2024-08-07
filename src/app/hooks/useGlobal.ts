import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

interface GlobalInterface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error("useGlobal withit Provider");
  return context;
};
