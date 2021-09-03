import React from "react";
import { Card, CardBody, CardText } from "reactstrap";
import './App.css';
import { BsFillTrashFill } from "react-icons/bs";

const MyCard = ({ details, deleteButton }) => {


  return (
    <>
    
    {details.map((detail,index)=>(
    <Card key={index} style={{margin: '1rem'}} className="card">
      <CardBody style={{width: '350px',height: '150px', textAlign:"center"}} className= "color">
        <CardText>
          <h2><span className="letterCircle">{detail.username[0]}</span><br/>
          <span>{detail.username}</span></h2>
        </CardText>
          <span onClick={()=>{deleteButton(detail)}}><BsFillTrashFill style={{width: '30px',height:'30px'}}/></span>
      
      </CardBody>
     
    </Card>
   
     ))}
  </>
  
  )
};

export default MyCard;
