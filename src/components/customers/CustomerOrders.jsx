import { useParams, useNavigate } from "react-router-dom";

import {

  FaArrowLeft,

  FaShoppingBag,

  FaEye,

} from "react-icons/fa";


import Card from "../../../components/ui/Card/Card";

import Button from "../../../components/ui/Button/Button";

import Badge from "../../../components/ui/Badge/Badge";

import Table from "../../../components/ui/Table/Table";


import { useCustomers } from "../../../context/CustomerContext";

import { useOrders } from "../../../context/OrderContext";


import "./CustomerOrders.css";


export default function CustomerOrders(){


  const { id } = useParams();


  const navigate = useNavigate();



  const {

    customers,

  } = useCustomers();



  const {

    orders,

  } = useOrders();



  const customer = customers.find(

    (item)=>item.id === id

  );



  if(!customer){

    return (

      <div className="customer-not-found">

        <h2>

          Customer Not Found

        </h2>

      </div>

    );

  }



  const customerOrders = orders.filter(

    (order)=>

      order.customerId === customer.id

  );



  return (

    <div className="customer-orders-page">


      <div className="customer-orders-header">


        <Button

          variant="secondary"

          onClick={()=>navigate(-1)}

        >

          <FaArrowLeft />

          Back

        </Button>


        <div>

          <h1>

            {customer.fullName}

          </h1>


          <p>

            Order History

          </p>

        </div>


      </div>



      <Card>


        <div className="customer-orders-summary">


          <FaShoppingBag />


          <div>

            <strong>

              {customerOrders.length}

            </strong>


            <span>

              Total Orders

            </span>

          </div>


        </div>


      </Card>




      <Card>


        {

          customerOrders.length === 0 ? (


            <div className="empty-orders">


              <h3>

                No Orders Found

              </h3>


              <p>

                This customer has not placed any orders yet.

              </p>


            </div>


          ) : (



            <Table>


              <thead>

                <tr>

                  <th>

                    Order ID

                  </th>


                  <th>

                    Date

                  </th>


                  <th>

                    Items

                  </th>


                  <th>

                    Total

                  </th>


                  <th>

                    Status

                  </th>


                  <th>

                    Action

                  </th>

                </tr>

              </thead>



              <tbody>


              {

                customerOrders.map((order)=>(


                  <tr key={order.id}>


                    <td>

                      {order.id}

                    </td>



                    <td>

                      {order.date}

                    </td>



                    <td>

                      {

                        order.items?.length || 0

                      }

                    </td>



                    <td>

                      $

                      {

                        order.total?.toFixed(2)

                      }

                    </td>



                    <td>


                      <Badge

                        variant={

                          order.status === "Delivered"

                          ? "success"

                          :

                          order.status === "Cancelled"

                          ? "danger"

                          :

                          "warning"

                        }

                      >

                        {order.status}

                      </Badge>


                    </td>



                    <td>


                      <Button

                        size="sm"

                        onClick={()=>navigate(

                          `/seller/orders/${order.id}`

                        )}

                      >

                        <FaEye />

                        View

                      </Button>


                    </td>


                  </tr>


                ))

              }


              </tbody>


            </Table>


          )

        }


      </Card>


    </div>

  );

}