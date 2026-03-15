import { Button } from "@/components/ui/button.tsx";

export default function DashboardHeader() {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="">Expense Tracker</h1>
        <form>
          <Button>Export</Button>
          <Button>Settings</Button>
          <Button>Add</Button>
        </form>
      </div>
    </>
  );
}
