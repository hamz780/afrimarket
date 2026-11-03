import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";

import "./OrderFilters.css";

export default function OrderFilters({

  search,

  setSearch,

  status,

  setStatus,

  payment,

  setPayment,

}) {

  function clearFilters() {

    setSearch("");

    setStatus("All");

    setPayment("All");

  }

  return (

    <div className="order-filters">

      <div className="order-filter-search">

        <Input

          placeholder="Search customer, email or Order ID..."

          value={search}

          onChange={(e) =>

            setSearch(e.target.value)

          }

        />

      </div>

      <Select

        value={status}

        onChange={(e) =>

          setStatus(e.target.value)

        }

      >

        <option>All</option>

        <option>Pending</option>

        <option>Processing</option>

        <option>Shipped</option>

        <option>Delivered</option>

        <option>Cancelled</option>

      </Select>

      <Select

        value={payment}

        onChange={(e) =>

          setPayment(e.target.value)

        }

      >

        <option>All</option>

        <option>Paid</option>

        <option>Pending</option>

        <option>Refunded</option>

      </Select>

      <Button

        variant="secondary"

        onClick={clearFilters}

      >

        Reset

      </Button>

    </div>

  );

}