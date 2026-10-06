import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">PMS</h1>

        <p className="mt-3 text-muted-foreground">Project Management SaaS</p>

        <Button className="mt-6">Get Started</Button>
      </div>
    </main>
  );
}
