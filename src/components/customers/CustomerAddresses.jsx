import { useParams, useNavigate } from "react-router-dom";

import {

  FaArrowLeft,

  FaMapMarkerAlt,

  FaTrash,

  FaPlus,

} from "react-icons/fa";


import Card from "../../../components/ui/Card/Card";

import Button from "../../../components/ui/Button/Button";

import Badge from "../../../components/ui/Badge/Badge";

import Modal from "../../../components/ui/Modal/Modal";

import Input from "../../../components/ui/Input/Input";


import { useState } from "react";


import { useCustomers } from "../../../context/CustomerContext";


import "./CustomerAddresses.css";


export default function CustomerAddresses(){


  const { id } = useParams();


  const navigate = useNavigate();



  const {

    customers,

    addAddress,

    removeAddress,

  } = useCustomers();



  const [open,setOpen] = useState(false);


  const [form,setForm] = useState({

    type:"Home",

    address:"",

    city:"",

    country:"",

  });



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



  function submitAddress(){


    addAddress(

      customer.id,

      form

    );


    setForm({

      type:"Home",

      address:"",

      city:"",

      country:"",

    });


    setOpen(false);

  }




  return (

    <div className="customer-addresses-page">



      <div className="customer-addresses-header">


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

            Delivery Addresses

          </p>

        </div>


      </div>



      <Button

        onClick={()=>setOpen(true)}

      >

        <FaPlus />

        Add Address

      </Button>



      <div className="addresses-grid">


      {

        customer.addresses.length === 0 ? (


          <Card>

            <div className="empty-address">

              No addresses saved

            </div>

          </Card>


        ) : (


          customer.addresses.map((address)=>(


            <Card key={address.id}>


              <div className="address-card-header">


                <FaMapMarkerAlt />


                <Badge variant="primary">

                  {address.type}

                </Badge>


              </div>



              <p>

                {address.address}

              </p>


              <p>

                {address.city}

              </p>


              <p>

                {address.country}

              </p>



              <Button

                variant="danger"

                onClick={()=>removeAddress(

                  customer.id,

                  address.id

                )}

              >

                <FaTrash />

                Delete

              </Button>



            </Card>


          ))

        )

      }


      </div>




      <Modal

        isOpen={open}

        onClose={()=>setOpen(false)}

        title="Add Address"

      >


        <div className="address-form">


          <Input

            placeholder="Type (Home)"

            value={form.type}

            onChange={(e)=>

              setForm({

                ...form,

                type:e.target.value

              })

            }

          />


          <Input

            placeholder="Address"

            value={form.address}

            onChange={(e)=>

              setForm({

                ...form,

                address:e.target.value

              })

            }

          />


          <Input

            placeholder="City"

            value={form.city}

            onChange={(e)=>

              setForm({

                ...form,

                city:e.target.value

              })

            }

          />


          <Input

            placeholder="Country"

            value={form.country}

            onChange={(e)=>

              setForm({

                ...form,

                country:e.target.value

              })

            }

          />


          <Button

            onClick={submitAddress}

          >

            Save Address

          </Button>


        </div>


      </Modal>


    </div>

  );

}