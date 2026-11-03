import { useState } from "react";

import {

  FaTrash,

  FaEye,

} from "react-icons/fa";


import Table from "../ui/Table/Table";

import Avatar from "../ui/Avatar/Avatar";

import Badge from "../ui/Badge/Badge";

import Pagination from "../ui/Pagination/Pagination";

import Button from "../ui/Button/Button";

import ConfirmDialog from "../ui/ConfirmDialog/ConfirmDialog";

import { useToast } from "../ui/Toast/ToastContext";


import { useCustomers } from "../../context/CustomerContext";


import "./CustomerTable.css";


export default function CustomerTable({

  onView,

}) {


  const {

    filteredCustomers,

    deleteCustomer,

  } = useCustomers();


  const {

    showToast,

  } = useToast();



  const [page,setPage] = useState(1);

  const [selectedCustomer,setSelectedCustomer] = useState(null);


  const perPage = 8;


  const totalPages = Math.ceil(

    filteredCustomers.length / perPage

  );


  const visibleCustomers = filteredCustomers.slice(

    (page - 1) * perPage,

    page * perPage

  );



  function handleDelete(){


    if(selectedCustomer){

      deleteCustomer(selectedCustomer.id);


      showToast(

        "Customer deleted successfully",

        "success"

      );


      setSelectedCustomer(null);

    }

  }



  return (

    <>


      <div className="customer-table-wrapper">


        <Table>


          <thead>

            <tr>

              <th>

                Customer

              </th>

              <th>

                Orders

              </th>

              <th>

                Spent

              </th>

              <th>

                Type

              </th>

              <th>

                Status

              </th>

              <th>

                Actions

              </th>

            </tr>

          </thead>



          <tbody>


          {

            visibleCustomers.map((customer)=>(


              <tr key={customer.id}>


                <td>

                  <div className="customer-user">


                    <Avatar

                      src={customer.avatar}

                      name={customer.fullName}

                    />


                    <div>

                      <strong>

                        {customer.fullName}

                      </strong>


                      <small>

                        {customer.email}

                      </small>


                    </div>


                  </div>

                </td>



                <td>

                  {customer.totalOrders}

                </td>



                <td>

                  ${customer.totalSpent.toFixed(2)}

                </td>



                <td>


                  <Badge

                    variant={

                      customer.customerType === "Premium"

                      ? "warning"

                      : "primary"

                    }

                  >

                    {customer.customerType}

                  </Badge>


                </td>



                <td>


                  <Badge

                    variant={

                      customer.status === "Active"

                      ? "success"

                      : "danger"

                    }

                  >

                    {customer.status}

                  </Badge>


                </td>



                <td>


                  <div className="customer-actions">


                    <Button

                      size="sm"

                      onClick={() =>

                        onView(customer.id)

                      }

                    >

                      <FaEye />

                    </Button>



                    <Button

                      variant="danger"

                      size="sm"

                      onClick={() =>

                        setSelectedCustomer(customer)

                      }

                    >

                      <FaTrash />

                    </Button>


                  </div>


                </td>


              </tr>


            ))

          }


          </tbody>


        </Table>


      </div>



      <Pagination


        currentPage={page}


        totalPages={totalPages}


        onPageChange={setPage}


      />




      <ConfirmDialog


        isOpen={!!selectedCustomer}


        onClose={() =>

          setSelectedCustomer(null)

        }


        onConfirm={handleDelete}


        title="Delete Customer"


        message={`Delete ${selectedCustomer?.fullName}? This action cannot be undone.`}


        confirmText="Delete"


        danger


      />


    </>

  );

}