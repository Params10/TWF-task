import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from "firebase/app"
import 'firebase/database'



class Dashboard extends React.Component{
  
  constructor(props)
  {
    super(props);
    this.state = {
        currentuserbplace :'',
        currentuserdob :''
  }
  this.handleEvent = this.handleEvent.bind(this);  
}  
handleEvent(){  
  console.log(this.props);  
}  






  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  var database = firebase.database();
  
  var userId = firebase.auth().currentUser.uid;
var data = firebase.database().ref('users/' + userId).once('value').then((snapshot) => {
  console.log(typeof(this.state.currentuserbplace));
    this.setState = ({ currentuserbplace:snapshot.val().userbirthpl;
    console.log(typeof(snapshot.val().userdob));
    this.setState = ({ currentuserdob :snapshot.val().userdob});
    console.log(this.state.currentuserdob);
  // ...
  });
 
console.log(userId);
 console.log("hello" + this.state.currentuserdob );
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  }
render(){
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Date of birth:</strong> {this.state.currentuserdob}
        </Card.Body>

        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Birth Place :</strong> {this.state.currentuserbplace}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}




export default Dashboard;