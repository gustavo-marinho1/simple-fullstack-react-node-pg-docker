import { useState } from "react";
import { createUser, type CreateUser } from "../services/users";

interface Props {
  onUserCreate: () => void;
}

export const FormRegisterUser = ({ onUserCreate }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<CreateUser>({
    name: "",
    email: "",
    password: ""
  });

  async function submit() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (!user.name || !user.email || !user.password) {
        alert("Please fill in all fields");
        return;
      }
      const { message } = await createUser(user);
      alert(message);
      clearForm();
      onUserCreate();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function clearForm() {
    setUser({
      name: "",
      email: "",
      password: ""
    });
  }

  return (
    <form className="w-fit flex flex-col gap-2" onSubmit={(e) => {
      e.preventDefault();
      submit();
    }}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="border rounded-md py-1 px-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="border rounded-md py-1 px-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="border rounded-md py-1 px-2"
      />
      <button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600">
        {isLoading ? "Loading..." : "Add"}
      </button>
    </form>
  )
}