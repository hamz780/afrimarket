import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const CustomerContext = createContext();

const today = () =>
  new Date().toISOString().split("T")[0];

const initialCustomers = [
  {
    id: "CUS-1001",
    firstName: "John",
    lastName: "Smith",
    fullName: "John Smith",
    email: "john@example.com",
    phone: "+1 555 1001",
    avatar: "",
    gender: "Male",
    country: "United States",
    city: "New York",
    joined: "2026-01-15",
    status: "Active",
    customerType: "Premium",
    totalOrders: 18,
    totalSpent: 2450.5,
    lastOrder: "2026-07-28",
    wishlist: 8,
    reviews: 6,
    addresses: [
      {
        id: 1,
        type: "Home",
        address: "25 Madison Ave",
        city: "New York",
        country: "United States",
      },
    ],
    notes: [
      {
        id: 1,
        text: "VIP customer",
        date: "2026-07-20",
      },
    ],
  },

  {
    id: "CUS-1002",
    firstName: "Sarah",
    lastName: "Johnson",
    fullName: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+44 555 2002",
    avatar: "",
    gender: "Female",
    country: "United Kingdom",
    city: "London",
    joined: "2026-02-11",
    status: "Active",
    customerType: "Standard",
    totalOrders: 9,
    totalSpent: 830.25,
    lastOrder: "2026-07-21",
    wishlist: 3,
    reviews: 2,
    addresses: [],
    notes: [],
  },

  {
    id: "CUS-1003",
    firstName: "David",
    lastName: "Brown",
    fullName: "David Brown",
    email: "david@example.com",
    phone: "+27 555 3003",
    avatar: "",
    gender: "Male",
    country: "South Africa",
    city: "Cape Town",
    joined: "2026-04-02",
    status: "Inactive",
    customerType: "Standard",
    totalOrders: 3,
    totalSpent: 199.99,
    lastOrder: "2026-05-15",
    wishlist: 1,
    reviews: 1,
    addresses: [],
    notes: [],
  },
];

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState(initialCustomers);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  function getCustomerById(id) {
    return customers.find(
      (customer) => customer.id === id
    );
  }

  function addCustomer(customer) {
    setCustomers((current) => [
      ...current,
      {
        id: `CUS-${Date.now()}`,
        avatar: "",
        joined: today(),
        status: "Active",
        customerType: "Standard",
        totalOrders: 0,
        totalSpent: 0,
        wishlist: 0,
        reviews: 0,
        addresses: [],
        notes: [],
        ...customer,
      },
    ]);
  }

  function updateCustomer(id, updates) {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              ...updates,
            }
          : customer
      )
    );
  }

  function deleteCustomer(id) {
    setCustomers((current) =>
      current.filter(
        (customer) => customer.id !== id
      )
    );
  }

  function addAddress(customerId, address) {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              addresses: [
                ...customer.addresses,
                {
                  id: Date.now(),
                  ...address,
                },
              ],
            }
          : customer
      )
    );
  }

  function updateAddress(
    customerId,
    addressId,
    updates
  ) {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              addresses:
                customer.addresses.map((address) =>
                  address.id === addressId
                    ? {
                        ...address,
                        ...updates,
                      }
                    : address
                ),
            }
          : customer
      )
    );
  }

  function removeAddress(
    customerId,
    addressId
  ) {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              addresses:
                customer.addresses.filter(
                  (address) =>
                    address.id !== addressId
                ),
            }
          : customer
      )
    );
  }

  function addNote(customerId, note) {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              notes: [
                ...customer.notes,
                {
                  id: Date.now(),
                  ...note,
                },
              ],
            }
          : customer
      )
    );
  }

  function updateNote(
    customerId,
    noteId,
    updates
  ) {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              notes: customer.notes.map((note) =>
                note.id === noteId
                  ? {
                      ...note,
                      ...updates,
                    }
                  : note
              ),
            }
          : customer
      )
    );
  }

  function removeNote(customerId, noteId) {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              notes: customer.notes.filter(
                (note) =>
                  note.id !== noteId
              ),
            }
          : customer
      )
    );
  }

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.fullName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.phone
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        customer.customerType ===
          typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    customers,
    search,
    statusFilter,
    typeFilter,
  ]);

  const customerStats = useMemo(() => {
    return {
      totalCustomers: customers.length,

      activeCustomers:
        customers.filter(
          (c) => c.status === "Active"
        ).length,

      inactiveCustomers:
        customers.filter(
          (c) => c.status === "Inactive"
        ).length,

      premiumCustomers:
        customers.filter(
          (c) =>
            c.customerType === "Premium"
        ).length,

      standardCustomers:
        customers.filter(
          (c) =>
            c.customerType === "Standard"
        ).length,

      totalRevenue: customers.reduce(
        (sum, c) => sum + c.totalSpent,
        0
      ),

      totalOrders: customers.reduce(
        (sum, c) => sum + c.totalOrders,
        0
      ),
    };
  }, [customers]);

  const value = {
    customers,
    filteredCustomers,
    customerStats,

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    typeFilter,
    setTypeFilter,

    getCustomerById,

    addCustomer,
    updateCustomer,
    deleteCustomer,

    addAddress,
    updateAddress,
    removeAddress,

    addNote,
    updateNote,
    removeNote,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error(
      "useCustomers must be used inside CustomerProvider"
    );
  }

  return context;
}