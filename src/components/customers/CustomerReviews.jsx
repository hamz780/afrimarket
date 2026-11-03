import { useParams, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaStar,
  FaComment,
} from "react-icons/fa";


import Card from "../../../components/ui/Card/Card";

import Button from "../../../components/ui/Button/Button";

import Badge from "../../../components/ui/Badge/Badge";


import { useCustomers } from "../../../context/CustomerContext";


import "./CustomerReviews.css";


export default function CustomerReviews(){

  const { id } = useParams();

  const navigate = useNavigate();


  const {

    customers

  } = useCustomers();


  const customer = customers.find(

    (item)=> item.id === id

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


  // Temporary reviews until ReviewContext is connected

  const reviews = [

    {

      id:1,

      product:"Organic Honey",

      rating:5,

      comment:"Excellent quality product.",

      date:"2026-07-20",

      status:"Published"

    },

    {

      id:2,

      product:"African Coffee Beans",

      rating:4,

      comment:"Good taste and fast delivery.",

      date:"2026-06-15",

      status:"Published"

    }

  ];



  return (

    <div className="customer-reviews-page">


      <div className="customer-reviews-header">


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

            Customer Reviews

          </p>

        </div>


      </div>



      <div className="reviews-list">


      {

        reviews.map((review)=>(


          <Card key={review.id}>


            <div className="review-header">


              <div>

                <h3>

                  {review.product}

                </h3>


                <span>

                  {review.date}

                </span>

              </div>



              <Badge variant="success">

                {review.status}

              </Badge>


            </div>



            <div className="review-rating">


              {

                [...Array(review.rating)]

                .map((_,index)=>(

                  <FaStar key={index}/>

                ))

              }


            </div>



            <p className="review-comment">


              <FaComment />

              {review.comment}


            </p>



          </Card>


        ))

      }


      </div>


    </div>

  );

}