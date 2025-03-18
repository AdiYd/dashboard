import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <FileQuestion className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been removed or
          the URL might be incorrect.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/">Back to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/help">Get Help</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}