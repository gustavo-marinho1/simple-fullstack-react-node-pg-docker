import { useEffect, useState } from "react";
import { deleteUser, findUserById } from "../services/users";
import { Modal } from "./modal";

interface Props {
  id: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onUpdate: () => void;
}

export const ModalDeleteUser = ({ id, isOpen, setOpen, onUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!isOpen || !id) {
      setName("");
      setOpen(false);
      return;
    }
    getUser(id);
  }, [id, isOpen]);

  async function getUser(id: string) {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await findUserById(id);
      setName(data.name);
    } catch (error: any) {
      alert(error.message);
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteConfirm() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await deleteUser(id);
      onUpdate();
      setOpen(false);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) return <></>;

  return (
    <Modal isOpen={isOpen}>
      <header className="text-lg font-semibold">Are you sure you want to delete user {name}?</header>

      <div className="w-full flex justify-end gap-2 mt-4">
        <button type="button" onClick={() => setOpen(false)} className="cursor-pointer">
          Cancel
        </button>

        <button type="button" disabled={isLoading} onClick={handleDeleteConfirm} className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600">
          {isLoading ? "Loading..." : "Delete"}
        </button>
      </div>
    </Modal>
  )
}