import { useNavigate } from "react-router";

export default function UserRegistrationPage() {
  const navigate = useNavigate();

  async function createUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      navigate("/login");
    } else {
      alert(data.error);
    }
  }

  return (
    <>
      <form onSubmit={createUser}>
        <input name="email" placeholder="email" type="email" required />
        <input name="username" placeholder="username" required />
        <input
          name="password"
          placeholder="password"
          type="password"
          required
        />
        <button type="submit">register</button>
      </form>
    </>
  );
}
