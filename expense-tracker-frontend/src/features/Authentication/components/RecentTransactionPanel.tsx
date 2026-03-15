import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useEffect, useState} from "react";
import { MoreHorizontalIcon} from "lucide-react";


export default function RecentTransactionsPanel() {
    const [expense, setExpense] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
       const fetchExpense = async () => {
           const res  = await fetch(`${import.meta.env.VITE_API_URL}/expense/getAllExpense` ,{
               method: "GET",
                   headers: {
                   "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               }
           });
           const data = await res.json();
           setExpense(data.expenses);
       };
       fetchExpense();
    }, []);
    const total: number = expense.reduce((sum, entry) => sum + entry.amount, 0);

    async function deleteExpense(expense) {
        // /expense/deleteExpense/:id
        const res = await fetch(`http://localhost:3000/expense/deleteExpense/${expense._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        if (res.ok) {
            setExpense(prev => prev.filter(e => e._id !== expense._id));
        }
    }
    return (
      <div>
        <Table>
            <TableCaption>Transactions...</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Options</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    expense.map((entry) => (
                        <TableRow key={entry._id}>
                            <TableCell>{new Date(entry.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</TableCell>
                            <TableCell>{entry.amount}</TableCell>
                            <TableCell>{entry.category}</TableCell>
                            <TableCell>{entry.notes}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                                <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem variant="destructive" onClick={() => deleteExpense(entry) }>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>{total}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
      </div>
  );
}
