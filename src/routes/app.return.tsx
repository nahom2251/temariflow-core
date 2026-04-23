import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BORROWS } from "@/lib/mock-data";
import { Undo2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/return")({
  head: () => ({ meta: [{ title: "Return — TemariFlow" }] }),
  component: ReturnBook,
});

function ReturnBook() {
  return (
    <div>
      <PageHeader title="Return book" description="Process book returns and check condition." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1">
          <h3 className="mb-4 font-display font-semibold">Quick return</h3>
          <div className="space-y-3">
            <div>
              <Label>Borrow ID or Book ID</Label>
              <Input placeholder="BR4001" className="mt-1" />
            </div>
            <Button className="w-full" onClick={() => toast.success("Book returned successfully")}>
              <Undo2 className="mr-2 h-4 w-4" /> Process return
            </Button>
          </div>
        </Card>

        <Card className="p-0 lg:col-span-2">
          <div className="border-b p-4">
            <h3 className="font-display font-semibold">Awaiting return</h3>
          </div>
          <div className="divide-y">
            {BORROWS.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium">{b.book}</p>
                  <p className="text-xs text-muted-foreground">{b.student} · Due {b.due}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast.success(`Returned: ${b.book}`)}>
                  Return
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
