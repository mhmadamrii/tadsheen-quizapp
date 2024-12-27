import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link href="/dashboard" className="text-2xl font-bold">
            QuizMaster
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
              </li>
              <li>
                <Button variant="outline">Logout</Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow px-5">{children}</main>
      <footer className="border-t">
        <div className="container mx-auto py-4 text-center text-sm text-gray-500">
          © 2023 QuizMaster. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
