import { AuthGuard } from "../../components/shared/AuthGuard";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#09141A]">
        {children}
      </div>
    </AuthGuard>
  );
}