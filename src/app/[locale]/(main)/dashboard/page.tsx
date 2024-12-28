import Link from "next/link";

import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DashboardTable } from "./_components/dashboard-table";

export default function DashboardPage() {
  return (
    <div className="mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Quizzes</h1>
        <Link href="/quiz/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Quiz
          </Button>
        </Link>
      </div>
      <DashboardTable />
    </div>
  );
}
