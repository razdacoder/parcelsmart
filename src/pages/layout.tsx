import ModalProvider from "@/components/modal-provider.tsx";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ModalProvider />
    </>
  );
}

export default Layout;
