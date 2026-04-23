import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/app/add-book")({
  head: () => ({ meta: [{ title: "Add Book — TemariFlow" }] }),
  component: AddBook,
});

function AddBook() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Add new book" description="Register a new title in the library catalog." />
      <Card className="max-w-2xl p-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Book added to catalog");
            navigate({ to: "/app/books" });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Title</Label>
              <Input required placeholder="The Great Ethiopian Renaissance" className="mt-1" />
            </div>
            <div>
              <Label>Author</Label>
              <Input required placeholder="Author name" className="mt-1" />
            </div>
            <div>
              <Label>ISBN</Label>
              <Input placeholder="978-..." className="mt-1" />
            </div>
            <div>
              <Label>Category</Label>
              <Select defaultValue="Literature">
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Literature","Mathematics","Science","History","Geography","Reference"].map((c)=>(
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Copies</Label>
              <Input type="number" required min={1} defaultValue={1} className="mt-1" />
            </div>
            <div>
              <Label>Shelf location</Label>
              <Input placeholder="A-12" className="mt-1" />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea placeholder="Optional summary..." className="mt-1" rows={3} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate({ to: "/app/books" })}>Cancel</Button>
            <Button type="submit">Add to library</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
