export default function Dashboard() {
  function getLocalStorage() {
    const token = localStorage.getItem("token");
    alert(token);
  }

  return (
    <>
      <h1>DashBoard</h1>
      <form action={getLocalStorage}>
        <button type="submit">get token</button>
      </form>
    </>
  );
}
