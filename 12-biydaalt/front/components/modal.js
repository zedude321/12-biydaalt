export const Modal = ({
  title,
  children,
  open,
  setOpen,
  id,
  handleUpdate,
  handleAdd,
  handleDelete,
}) => {
  return (
    open && (
      <div className="w-screen h-screen absolute top-0 left-0 bg-black flex justify-center items-center bg-opacity-50">
        <div className="w-3/5 h-fit bg-white flex flex-col p-12 gap-6">
          <div className="flex justify-between mb-8">
            <h1 className="font-bold text-xl">{title}</h1>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
          {children}
          {id ? (
            <div className="flex justify-between">
              <button
                className="p-2 px-6 rounded-lg bg-green-400"
                onClick={handleUpdate}
              >
                UPDATE
              </button>
              <button
                className="p-2 px-6 rounded-lg bg-red-400"
                onClick={handleDelete}
              >
                DELETE
              </button>
            </div>
          ) : (
            <button
              className="p-2 px-6 rounded-lg bg-blue-400"
              onClick={handleAdd}
            >
              ADD
            </button>
          )}
        </div>
      </div>
    )
  );
};
