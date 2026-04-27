import { Pen, Trash } from "lucide-react"
import { type User } from "../services/users"

type Props = {
  listUsers: User[]
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}

export const UsersList = ({ listUsers, handleEdit, handleDelete }: Props) => {
  return (
    <div className="w-fit flex flex-col gap-2">
      {listUsers.length === 0 ? (
        <div>No users</div>
      ) : (
        listUsers.map((user, index) => (
          <div className="flex flex-row gap-4 border border-neutral-200 rounded-lg p-2" key={index}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <div className="flex flex-row gap-2">
              <button onClick={() => handleEdit(user.id)} className="cursor-pointer">
                <Pen className="w-5 h-5 text-blue-600" />
              </button>
              <button onClick={() => handleDelete(user.id)} className="cursor-pointer">
                <Trash className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}