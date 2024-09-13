import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './auth/register';
import SignIn from './auth/signin';
import {Routes, Route} from 'react-router-dom';
import Home from './home';
import { Col, Row } from 'react-bootstrap';
import { URLs } from './constants/consts';

function App() {

  return (
    <div className="container-lg space-grotesk-body">
      <div className="page-header">
      <Row xs={1} md={3} className="g-4">
        <Col  xs={6} md={8} className='page-title'> 
         <span className='page-title-start'>Escape&nbsp; </span>
         <span className='page-title-end'>Mode!</span>
         
        </Col>
        <Col  xs={4} md={1} className='logo'>
          <img className="logoI" src= {URLs.LOGO} />
          <div className="logoT">M</div>
        </Col>
      </Row>
         
      </div>
      <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
        </Routes>
      </>
      
    </div>
  )
}

export default App;
