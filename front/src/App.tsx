import { useEffect, useState } from 'react';
import './App.css';
import { findUsers, type User, deleteUser } from './services/users';
import { FormRegisterUser } from './components/form-register-user';
import { UsersList } from './components/users-list';
import { ModalFormUpdateUser } from './components/modal-form-update-user';

function App() {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const { data } = await findUsers();
      setListUsers(data);
    } catch (error: any) {
      alert(error.message);
    }
  }

  function handleEdit(id: string) {
    setEditUserId(id);
    setModalOpen(true);
  }

  async function handleDelete(id: string) {
    try {
      await deleteUser(id);
      getUsers();
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <main className="flex flex-col gap-8">
      <header className="text-2xl font-semibold">Simple CRUD with React, Node.js, PostgreSQL and Docker</header>

      <section className='flex flex-col gap-2'>
        <header className="text-lg font-semibold">Register new user</header>
        <FormRegisterUser onUserCreate={getUsers} />
      </section>

      <section className='flex flex-col gap-2'>
        <header className="text-lg font-semibold">Users</header>
        <UsersList listUsers={listUsers} handleEdit={handleEdit} handleDelete={handleDelete} />
      </section>

      <ModalFormUpdateUser id={editUserId} isOpen={modalOpen} setOpen={setModalOpen} onUpdate={getUsers} />

    </main>
  )
}

export default App
