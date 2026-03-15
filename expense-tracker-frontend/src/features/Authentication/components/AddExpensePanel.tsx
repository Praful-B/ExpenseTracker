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
import * as React from "react";

export default function AddExpensePanel() {
  const [category, setCategory] = React.useState("");

  async function addExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get("amount"));
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
      alert("Successfully added expense!");
      window.location.reload();
    } else {
      alert(data.error);
    }
  }

  return (
      <>
        <h1 className="font-extrabold font-mono text-xl">Add Expense</h1>
        <form onSubmit={addExpense}>
          <div className="flex flex-col border-8">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(val) => setCategory(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="stationary">Stationary</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="util">Util</SelectItem>
                  <SelectItem value="default">Default</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input name="notes" placeholder="Notes" />
            <Input name="amount" type="number" placeholder="Amount" />
            <Button type="submit">Add Expense</Button>
          </div>
        </form>
      </>
  );
}