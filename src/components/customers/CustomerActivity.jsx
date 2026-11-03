import { useParams, useNavigate } from "react-router-dom";

import {

  FaArrowLeft,

  FaUserPlus,

  FaShoppingBag,

  FaStar,

  FaMapMarkerAlt,

  FaClock,

} from "react-icons/fa";


import Card from "../../../components/ui/Card/Card";

import Button from "../../../components/ui/Button/Button";


import { useCustomers } from "../../../context/CustomerContext";


import "./CustomerActivity.css";


export default function CustomerActivity(){


  const { id } = useParams();


  const navigate = useNavigate();



  const {

    customers,

  } = useCustomers();



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



  const activities = [

    {

      id:1,

      title:"Account Created",

      description:"Customer account was registered.",

      date:customer.joined,

      icon:<FaUserPlus />

    },


    {

      id:2,

      title:"Order History",

      description:`${customer.totalOrders} orders completed.`,

      date:customer.lastOrder,

      icon:<FaShoppingBag />

    },


    {

      id:3,

      title:"Reviews Submitted",

      description:`${customer.reviews} reviews submitted.`,

      date:"2026-07-20",

      icon:<FaStar />

    },


    {

      id:4,

      title:"Address Updated",

      description:`${customer.addresses.length} saved addresses.`,

      date:"2026-07-10",

      icon:<FaMapMarkerAlt />

    }

  ];



  return (

    <div className="customer-activity-page">


      <div className="customer-activity-header">


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

            Customer Activity Timeline

          </p>

        </div>


      </div>



      <Card>


        <div className="activity-timeline">


        {

          activities.map((activity)=>(


            <div

              className="activity-item"

              key={activity.id}

            >


              <div className="activity-icon">

                {activity.icon}

              </div>



              <div className="activity-content">


                <h3>

                  {activity.title}

                </h3>



                <p>

                  {activity.description}

                </p>



                <span>

                  <FaClock />

                  {activity.date}

                </span>


              </div>


            </div>


          ))

        }


        </div>


      </Card>


    </div>

  );

}