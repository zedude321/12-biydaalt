export const Modal = ({title, children, open, setOpen }) => {
  return open && (
    <div className="w-screen h-screen absolute top-0 left-0 bg-black flex justify-center items-center bg-opacity-50">
      <div className="w-3/5 h-fit bg-white flex flex-col p-12 gap-6">
        <div className="flex justify-between mb-8">
          <h1 className="font-bold text-xl">{title}</h1>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
        {children}
      </div>
    </div>
  )
}