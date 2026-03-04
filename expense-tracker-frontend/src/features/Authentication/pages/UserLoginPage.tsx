import { useNavigate } from "react-router";

export default function UserLoginPage() {
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.error);
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <input name="email" placeholder="Email" type="email" required />
        <input
          name="password"
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
