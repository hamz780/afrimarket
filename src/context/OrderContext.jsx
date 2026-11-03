import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import initialOrders from "../data/orders";

const OrderContext = createContext();

export function OrderProvider({ children }) {

  const [orders, setOrders] = useState(() => {

    const savedOrders = localStorage.getItem(
      "afrimarket_orders"
    );

    if (savedOrders) {

      return JSON.parse(savedOrders);

    }

    return initialOrders;

  });

  useEffect(() => {

    localStorage.setItem(

      "afrimarket_orders",

      JSON.stringify(orders)

    );

  }, [orders]);

  function addOrder(order) {

    const newOrder = {

      id: Date.now(),

      payment: "Pending",

      status: "Pending",

      date: new Date()

        .toISOString()

        .split("T")[0],

      ...order,

    };

    setOrders((current) => [

      newOrder,

      ...current,

    ]);

  }

  function updateOrder(id, updatedOrder) {

    setOrders((current) =>

      current.map((order) =>

        order.id === id

          ? {

              ...order,

              ...updatedOrder,

            }

          : order

      )

    );

  }

  function deleteOrder(id) {

    setOrders((current) =>

      current.filter(

        (order) => order.id !== id

      )

    );

  }

  const totalOrders = useMemo(

    () => orders.length,

    [orders]

  );

  const pendingOrders = useMemo(

    () =>

      orders.filter(

        (order) =>

          order.status === "Pending"

      ).length,

    [orders]

  );

  const processingOrders = useMemo(

    () =>

      orders.filter(

        (order) =>

          order.status === "Processing"

      ).length,

    [orders]

  );

  const deliveredOrders = useMemo(

    () =>

      orders.filter(

        (order) =>

          order.status === "Delivered"

      ).length,

    [orders]

  );

  const totalRevenue = useMemo(

    () =>

      orders.reduce(

        (sum, order) =>

          sum + Number(order.total),

        0

      ),

    [orders]

  );

  return (

    <OrderContext.Provider

      value={{

        orders,

        addOrder,

        updateOrder,

        deleteOrder,

        totalOrders,

        pendingOrders,

        processingOrders,

        deliveredOrders,

        totalRevenue,

      }}

    >

      {children}

    </OrderContext.Provider>

  );

}

export function useOrders() {

  return useContext(OrderContext);

}