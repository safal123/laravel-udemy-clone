import { PropsWithChildren } from "react";
import Footer from "@/Components/shared/Footer";
import HomePageNavbar from "@/Components/shared/HomePageNavbar";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage<PageProps>().props;
  
  return (
    <div className="min-h-screen flex flex-col">
      <HomePageNavbar auth={auth} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
