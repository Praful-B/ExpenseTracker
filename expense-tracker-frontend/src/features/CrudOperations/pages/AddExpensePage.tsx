export default function AddExpensePage() {
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
      <form onSubmit={addExpense}>
        <input type="number" name="amount" placeholder="amount" />
        <label htmlFor="category">Choose a category:</label>
        <select name="category" id="category">
          <option value="food">none</option>
          <option value="social">social</option>
          <option value="stationary">stationary</option>
          <option value="travel">travel</option>
          <option value="util">util</option>
          <option value="default">none</option>
        </select>
        <input
          type="text"
          name="notes"
          placeholder="additional - notes"
        ></input>
        <button type="submit"> + Add expense</button>
      </form>
    </>
  );
}
