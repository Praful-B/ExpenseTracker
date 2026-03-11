import {Button} from "@/components/ui/button.tsx";

export default function DashboardHeader() {
  return (
    <>
      <div className="flex-row">
        <form>
          <h1 className="">Expense Tracker</h1>
          <Button>Settings</Button>
          <Button>logout</Button>
        </form>
      </div>
    </>
  );
}
