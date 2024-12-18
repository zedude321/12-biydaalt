export const Table = ({columns, data, filter, rows, handleEdit}) => {
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <table className="h-min w-full">
      <thead>
        <tr className="*:text-start *:p-4 *:whitespace-nowrap">
          {columns.map((e, i) => (
            <th key={i}>{e}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data &&
          filter().map((e, i) => (
            <tr
              className="*:text-start *:p-4 *:py-6 odd:bg-gray-100 *:whitespace-nowrap"
              key={i}
            >
              {rows.map((num, index) => (
                <td className="max-w-36 truncate" key={index}>
                  {num == "created_at"
                    ? new Date(e.created_at).toLocaleDateString(
                        "en-US",
                        dateOptions
                      )
                    : e[num]}
                </td>
              ))}
              <td
                className="cursor-pointer"
                onClick={() => {
                  handleEdit(i);
                }}
              >
                Edit
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
