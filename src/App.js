import React, { useState,useEffect } from 'react';
import Axios from "axios";
import MyCard from './MyCard';
import { Container} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

const App=()=> {
  //Fetching the user

  const [details, setDetails] = useState([]);
  const fetchDetails = async () => {
    const { data } = await Axios.get("http://15.207.229.231:8000/machstatz/get_all_users");
    console.log("RESPONSE: ", data);
    //setDetails(data);
    setDetails(data);
  }

  useEffect(() => {
    fetchDetails();
  }, []);


  const [email, setEmail]=useState('');
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [newemail, setNewemail]=useState('');



  //Adding the user using POST

  const  handleSubmit=(e)=>{
    e.preventDefault()
    const data={
      email: email,
      first_name: firstname,
      last_name: lastname,
      pwd: password,
      username: username
    }
    console.log(data);
     fetch('http://15.207.229.231:8000/machstatz/add_new_user',{
       method:'POST',
       headers: {"Content-Type":"application/json" },
       body: JSON.stringify(data)
     }).then(response=>response.json())
      .then(result => {
      console.log('Response from API:', result.message);
      if(result.status==="Success"){
        setDetails([...details,data])
      }
      alert(result.message)
      })     
    .catch(error=>{alert("error")})
  }

  //Deleting the user DELETE method
  const handleDelete=(e)=>{
    e.preventDefault()
    const data1={
      "email": newemail
    }
    console.log(data1);
     fetch('http://15.207.229.231:8000/machstatz/delete_existing_user',{
      method:'DELETE',
      body: JSON.stringify(data1)
    }).then(result => {
      console.log('Response from API:', result);
      alert("There is some issue with the given Delete API- I tried using postman also its not working- Check console")
      })
    .catch(error=>{
      console.log(error);
      alert("error")
  })
}
  
  //Deleting a card item using delete icon
  
  useEffect(()=>{
    const localdetails = localStorage.getItem("details")
    console.log({localStorage})
    if(localdetails){
      setDetails(JSON.parse(localdetails))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("details",JSON.stringify(details));
  },[details]);

  const deleteButton = item =>{
    setDetails(details.filter(singleItem =>singleItem!==item))
  }


  return (
    <>
    <div className="head">
      <h2>Displaying the fetched results from the given API</h2>
    </div>
    <hr/>
    <Container className="p-4 container1 cardalignment"  style={{display: 'flex', flexDirection: 'row'}} >
           <MyCard details={details} deleteButton={deleteButton} /> 
    </Container> 
    <hr/>
    <div className="container">
      <h2 style={{textAlign:'center', fontWeight:"bold"}}>Submiting input results using API POST method</h2>
      <hr></hr>
      <form onSubmit={handleSubmit}>
      <label>First Name</label>
      <input type="text" value={firstname} onChange={(e)=> setFirstname(e.target.value)} required placeholder="Enter your first name"/>

      <label>Last Name</label>
      <input type="text" value={lastname} onChange={(e)=> setLastname(e.target.value)} required placeholder="Enter your last name"/>

      <label>Profiles</label>
      <select id="country" name="country">
        <option value="australia">Fresher</option>
        <option value="canada">Experienced</option>
        <option value="usa">Retired</option>
      </select> 
      <label >Email</label>
      <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} required placeholder="Enter your email id"/>
      <label >Username</label>
      <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} required placeholder="Enter Username"/>
      <label >Password</label>
      <input type="text" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter Password"/>

      <input type="submit" value="Add"/>
      </form>
    </div>
    <hr></hr>
    
    <div className="container">
    <h2 style={{textAlign:'center',fontWeight:"bold"}}>Deleting the results using API DELETE method</h2>
      <hr></hr>
    <form onSubmit={handleDelete}>
    <label>Email</label>
      <input type="text" value={newemail} onChange={(e)=> setNewemail(e.target.value)} required placeholder="Enter your email id"/>
    <input type="submit" value="Delete"/>
    </form>



    </div>



   </>
  );
}

export default App;
