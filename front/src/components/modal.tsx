interface Props {
  children: React.ReactNode;
  isOpen: boolean;
}

export const Modal = ({ children }: Props) => {
  return (
    <div className="fixed w-full h-full flex justify-center items-center z-50">
      <div className="fixed w-full h-full bg-white opacity-50" />
      <div className="z-100 bg-white p-4 border rounded-lg">
        {children}
      </div>
    </div>
  )
}