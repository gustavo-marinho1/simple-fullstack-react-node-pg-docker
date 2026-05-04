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
        <table>
          <thead>
            <tr>
              <th className="text-start p-1 pr-4">Name</th>
              <th className="text-start p-1 pr-4">Email</th>
              <th className="text-start p-1"></th>
            </tr>
          </thead>
          <tbody className="border border-neutral-200 rounded-xl">
            {listUsers.map((user, index) => (
              <tr key={index} className="gap-4 border-b border-neutral-200">
                <td className="text-start p-2 pr-4">{user.name}</td>
                <td className="text-start p-2 pr-4">{user.email}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(user.id)} className="cursor-pointer">
                    <Pen className="w-5 h-5 text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="cursor-pointer">
                    <Trash className="w-5 h-5 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}