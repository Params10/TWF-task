import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from "firebase/app"
import 'firebase/database'; 

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const DateRef = useRef()
  const BirthRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  var database = firebase.database();

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      
      console.log(emailRef.current.value);
      console.log(passwordRef.current.value);
      console.log(DateRef.current.value);
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userId).set({
        userdob: DateRef.current.value,
        userbirthpl:BirthRef.current.value
      })
      history.push("/")
      
    } catch(err) {
      console.log(err.toString());
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="Date-of-birth">
              <Form.Label>Date of Birth(DD-MM-YYYY)</Form.Label>
              <Form.Control  ref={DateRef} required />
            </Form.Group>
            <Form.Group id="Date-of-birth">
              <Form.Label>Birth Place</Form.Label>
              <Form.Control  ref={BirthRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
