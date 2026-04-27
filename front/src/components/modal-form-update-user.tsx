import { useEffect, useState } from "react";
import { findUserById, updateUser, type UpdateUser } from "../services/users";
import { X } from "lucide-react";
import { Modal } from "./modal";

interface Props {
  id: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onUpdate: () => void;
}

export const ModalFormUpdateUser = ({ id, isOpen, setOpen, onUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<UpdateUser>({
    name: "",
    email: ""
  });

  useEffect(() => {
    if (!isOpen || !id) {
      clearForm();
      setOpen(false);
      return;
    }
    getUser(id);
  }, [id, isOpen]);

  async function getUser(id: string) {
    try {
      const { data } = await findUserById(id);
      setUser({
        name: data.name,
        email: data.email
      });
    } catch (error: any) {
      alert(error.message);
      setOpen(false);
    }
  }

  async function submit() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (!user.name || !user.email) {
        alert("Please fill in all fields");
        return;
      }
      const { message } = await updateUser(id, user);
      alert(message);
      setOpen(false);
      onUpdate();
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
    });
  }

  if (!isOpen) return <></>;

  return (
    <Modal isOpen={isOpen}>
      <form className="flex flex-col gap-2" onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}>
        <div className="flex items-center justify-between">
          <header className="text-lg font-semibold">Update user</header>
          <button type="button" onClick={() => setOpen(false)} className="cursor-pointer">
            <X className="w-5 h-5 text-red-600" />
          </button>
        </div>
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
        <button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600">
          {isLoading ? "Loading..." : "Add"}
        </button>
      </form>
    </Modal>
  )
}