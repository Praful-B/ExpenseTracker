import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddExpensePanel() {
  async function addExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = formData.get("amount");
    const category = formData.get("category");
    const notes = formData.get("notes");
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to add an expense");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/expense/createExpense`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, category, notes }),
      },
    );
    const data = await response.json();
    if (response.ok) {
      alert("successfully added expense: ");
    } else {
      alert(data.error);
    }
  }
  return (
    <>
      <h1 className="font-extrabold font-mono text-xl font-stretch-ultra-expanded ">
        Add Expense
      </h1>
      <form onSubmit={addExpense}>
        <div className="flex-row">
          <Label htmlFor="category">Category</Label>
          <Select name="category">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Stationary">Stationary</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Util">Util</SelectItem>
                <SelectItem value="Default">Default</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input name="description" placeholder="Decription"></Input>
          <Input name="amount" type="number" placeholder="Amount"></Input>
          <Button type="submit" name="submit-button">
            Add Expense
          </Button>
        </div>
      </form>
      ``
    </>
  );
}
