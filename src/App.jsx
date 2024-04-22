import React, { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaGithub, FaInstagram, FaTelegram } from "react-icons/fa"

import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import NavbarComponent from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/actionCreators/authActionCreators";
import { Button, Form, InputGroup } from "react-bootstrap";
import { auth } from "./API/firebase";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const users = auth.currentUser

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getUser());
    }
  }, [dispatch]);
  return (
    <div className="App">
      <ToastContainer position="bottom-right" />

      <Switch>
        <Route exact path={"/"}>
          <NavbarComponent />
          <div style={{ textAlign: 'center', color: 'cyan', width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '50px' }}>
            <h2>Join over 700 million registered users who trust Dropbox</h2>
            <p>Easy to use, reliable, private, and secure. It’s no wonder Dropbox is the choice for storing and sharing your most important files.</p>
            <div style={{ width: '500px', display: 'flex', justifyContent: "space-around", alignItems: 'center' }}>
              <InputGroup style={{ width: '300px', marginTop: '18px' }} className="mb-3">
                <Form.Control
                  placeholder="Email*"
                  aria-label="Email*"
                  aria-describedby="basic-addon1"
                  value={users ? users.email : ''}
                />
                <InputGroup.Text id="basic-addon1">@gmail.com</InputGroup.Text>
              </InputGroup>
              <Link to={'/signup'}>
                <Button variant="primary">Register for free</Button>
              </Link>
            </div>
          </div>
          <video style={{ width: '100%', height: '60vh' }} autoPlay loop muted>
            <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080.mp4" />
          </video>
          <footer style={{ width: '100%', height: '150px', background: '#000', marginTop: '100px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <a target={'_blank'} href="https://instagram.com/_bek_27_04_">
              <FaInstagram  size={'25px'} style={{ color: 'cyan' }} />
            </a>
            <a target={'_blank'} href="https://t.me/uspa_polo_717">
              <FaTelegram size={'25px'} style={{ color: 'cyan' }} />
            </a>
            <a target={'_blank'} href="https://github.com/bekzatilyasov2004">
              <FaGithub size={'25px'} style={{ color: 'cyan' }} />
            </a>
          </footer>
        </Route>
        <Route exact path="/login" component={() => <Login />}></Route>
        <Route exact path="/signup" component={() => <Register />}></Route>
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
