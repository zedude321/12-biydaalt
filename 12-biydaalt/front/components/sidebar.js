import { useRouter } from "next/router";

export const Sidebar = () => {
  const router = useRouter();
  const path = router.pathname;

  const handleRouter = (r) => {
    router.push(r);
  };

  return (
    <div className="bg-primary h-screen text-white flex flex-col w-fit">
      <h1 className="text-2xl font-semibold p-12">E_commerse</h1>
      <div className="h-[1px] w-full bg-[#BDBDBD]" />
      <div className="*:cursor-pointer *:font-bold *:text-lg *:p-6  *:transition-all">
        <div
          onClick={() => handleRouter("/users")}
          className={
            path == "/users"
              ? "bg-primary-dark"
              : "hover:bg-primary-dark active:brightness-75 "
          }
        >
          Users
        </div>
        <div
          onClick={() => handleRouter("/products")}
          className={
            path == "/products"
              ? "bg-primary-dark"
              : "hover:bg-primary-dark active:brightness-75 "
          }
        >
          Products
        </div>
        <div
          onClick={() => handleRouter("/orders")}
          className={
            path == "/orders"
              ? "bg-primary-dark"
              : "hover:bg-primary-dark active:brightness-75 "
          }
        >
          Orders
        </div>
        <div
          onClick={() => handleRouter("/reviews")}
          className={
            path == "/reviews"
              ? "bg-primary-dark"
              : "hover:bg-primary-dark active:brightness-75 "
          }
        >
          Reviews
        </div>
        <div
          onClick={() => handleRouter("/order-items")}
          className={
            path == "/order-items"
              ? "bg-primary-dark"
              : "hover:bg-primary-dark active:brightness-75 "
          }
        >
          Order Items
        </div>
      </div>
    </div>
  );
};
