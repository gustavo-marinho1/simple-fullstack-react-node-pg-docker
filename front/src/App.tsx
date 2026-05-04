import { useEffect, useState } from 'react';
import './App.css';
import { findUsers, type User } from './services/users';
import { FormRegisterUser } from './components/form-register-user';
import { UsersList } from './components/users-list';
import { ModalFormUpdateUser } from './components/modal-form-update-user';
import { ModalDeleteUser } from './components/modal-delete-user';

function App() {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState("");
  const [modalDelOpen, setModalDelOpen] = useState(false);
  const [delUserId, setDelUserId] = useState("");

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

  function handleDelete(id: string) {
    setDelUserId(id);
    setModalDelOpen(true);
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

      <ModalDeleteUser id={delUserId} isOpen={modalDelOpen} setOpen={setModalDelOpen} onUpdate={getUsers} />

    </main>
  )
}

export default App
