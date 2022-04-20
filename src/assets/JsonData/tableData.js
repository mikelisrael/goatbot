export const topSneakers = {
  head: ["user", "total orders", "total offers"],
  body: [
    {
      username: "John Doe",
      order: "490",
      price: "$15,870",
    },
    {
      username: "Frank Iva",
      order: "250",
      price: "$12,251",
    },
    {
      username: "Tony Mijaeal",
      order: "250",
      price: "$12,251",
    },
    {
      username: "Ganki Skorn",
      order: "250",
      price: "$12,251",
    },
    {
      username: "Tony Mijaeal",
      order: "250",
      price: "$12,251",
    },
    {
      username: "Ganki Skorn",
      order: "250",
      price: "$12,251",
    },
  ],
};

export const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
};

export const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};