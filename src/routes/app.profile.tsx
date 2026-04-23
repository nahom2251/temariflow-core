import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile — TemariFlow" }] }),
  component: Profile,
});

function Profile() {
  return (
    <div>
      <PageHeader title="My profile" description="Your personal information and settings." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary text-3xl font-bold text-primary-foreground">
              SE
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold">Samuel Eshetu</h2>
            <p className="text-sm text-muted-foreground">Grade 10 - Section B</p>
            <p className="mt-1 text-xs text-muted-foreground">STU1024 · Bole International Academy</p>
            <Button variant="outline" size="sm" className="mt-4">Change avatar</Button>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-4 font-display text-lg font-semibold">Personal information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["First name", "Samuel"],
              ["Last name", "Eshetu"],
              ["Date of birth", "2009-03-12"],
              ["Email", "samuel@school.edu"],
              ["Phone", "+251911445566"],
              ["Guardian", "Eshetu Bekele"],
              ["Address", "Bole, Addis Ababa"],
              ["Emergency contact", "+251911223344"],
            ].map(([label, val]) => (
              <div key={label}>
                <Label className="text-xs">{label}</Label>
                <Input defaultValue={val} className="mt-1" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
