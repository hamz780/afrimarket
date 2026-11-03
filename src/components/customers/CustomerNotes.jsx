import { useParams, useNavigate } from "react-router-dom";

import { useState } from "react";

import {

  FaArrowLeft,

  FaTrash,

  FaPlus,

  FaStickyNote,

} from "react-icons/fa";


import Card from "../../../components/ui/Card/Card";

import Button from "../../../components/ui/Button/Button";

import Textarea from "../../../components/ui/Textarea/Textarea";


import { useCustomers } from "../../../context/CustomerContext";


import "./CustomerNotes.css";


export default function CustomerNotes(){


  const { id } = useParams();


  const navigate = useNavigate();



  const {

    customers,

    addNote,

    removeNote,

  } = useCustomers();



  const [note,setNote] = useState("");



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



  function handleAddNote(){


    if(!note.trim()) return;



    addNote(

      customer.id,

      {

        text:note,

        date:new Date()

        .toISOString()

        .split("T")[0]

      }

    );


    setNote("");

  }




  return (

    <div className="customer-notes-page">


      <div className="customer-notes-header">


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

            Internal Customer Notes

          </p>

        </div>


      </div>




      <Card>


        <div className="add-note-box">


          <Textarea

            placeholder="Write customer note..."

            value={note}

            onChange={(e)=>

              setNote(e.target.value)

            }

          />



          <Button

            onClick={handleAddNote}

          >

            <FaPlus />

            Add Note

          </Button>


        </div>


      </Card>





      <div className="notes-list">


      {

        customer.notes.length === 0 ? (


          <Card>


            <div className="empty-notes">

              No notes available

            </div>


          </Card>


        ) : (


          customer.notes.map((item)=>(


            <Card key={item.id}>


              <div className="note-item">


                <div>


                  <FaStickyNote />


                  <p>

                    {item.text}

                  </p>


                  <small>

                    {item.date}

                  </small>

                </div>



                <Button

                  variant="danger"

                  onClick={()=>removeNote(

                    customer.id,

                    item.id

                  )}

                >

                  <FaTrash />

                </Button>


              </div>


            </Card>


          ))

        )

      }


      </div>


    </div>

  );

}