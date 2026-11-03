import {

  FaFilter,

  FaTimes,

} from "react-icons/fa";


import SearchBar from "../ui/SearchBar/SearchBar";

import Select from "../ui/Select/Select";

import Button from "../ui/Button/Button";


import { useCustomers } from "../../context/CustomerContext";


import "./CustomerFilters.css";


export default function CustomerFilters() {


  const {

    search,

    setSearch,

    statusFilter,

    setStatusFilter,

    typeFilter,

    setTypeFilter,

  } = useCustomers();



  function clearFilters(){

    setSearch("");

    setStatusFilter("All");

    setTypeFilter("All");

  }



  return (

    <div className="customer-filters">


      <div className="customer-search">

        <SearchBar

          value={search}

          onChange={setSearch}

          onClear={() => setSearch("")}

          placeholder="Search customers..."

        />

      </div>



      <div className="customer-filter-actions">


        <Select

          value={statusFilter}

          onChange={(e) =>

            setStatusFilter(e.target.value)

          }

        >

          <option value="All">

            All Status

          </option>

          <option value="Active">

            Active

          </option>

          <option value="Inactive">

            Inactive

          </option>

        </Select>



        <Select

          value={typeFilter}

          onChange={(e) =>

            setTypeFilter(e.target.value)

          }

        >

          <option value="All">

            All Customers

          </option>

          <option value="Premium">

            Premium

          </option>

          <option value="Standard">

            Standard

          </option>

        </Select>



        <Button

          variant="secondary"

          onClick={clearFilters}

        >

          <FaTimes />

          Clear

        </Button>


      </div>


    </div>

  );

}