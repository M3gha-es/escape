import { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import * as data from './constants/data.json';
import { MSGs } from "./constants/messages";
import { loginCheck } from "./services/authServices";
import { useNavigate } from "react-router-dom";
import { URLs } from "./constants/consts";

const Home = () => {
  const [show, setShow] = useState(false);
  const [url, seturl] = useState("");
  const [title, setTitle] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const checkIfLoggedIn = async () =>{
      const res = await loginCheck();
      //console.log("Login check completed");
      //console.log(res);
      if(res.success){
        setAuthenticated(true);
        setName(JSON.parse(res.data).firstName);
      }else{
        setAuthenticated(false);
      }
    }
    checkIfLoggedIn();
  },[]);
    
  const authorizedList = data.artList.filter((art)=>{
    if(isAuthenticated) return true;
    else{
      return art.access === 'all';
    }
  }
  );
  
 
  const handleClose = () => {
    seturl("");
    setTitle("");
    setShow(false)
  };
  const handleShow = (itemUrl:string, itemTitle:string) => {
    seturl(itemUrl);
    setTitle(itemTitle);
    setShow(true);
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate("/"+(e.target as HTMLInputElement).value);
  };

    return (
      <>
      {isAuthenticated&&<h4>{MSGs.HOME_AUTHORIRIZED_USERS} {name}!</h4>}
      <Row xs={1} md={3} className="g-4">
      {authorizedList.map((art, idx) => (
        
        <Col key={idx} >
          <Card onClick={()=>handleShow(art.url, art.title)} style={{width:"25rem"}}>
          <img className="icons" src={URLs.PIN} />
            <Card.Img style={{margin:"1%", width:"90%"}} variant="top" src={URLs.ASSETS_REL+art.url} />
            <Card.Body>
              <Card.Title>{art.title}</Card.Title>
              <Card.Text>
                {art.desciption}
              </Card.Text>
            </Card.Body>
          </Card>
          <Modal 
      dialogClassName="modal-200w" 
      aria-labelledby="example-custom-modal-styling-title" 
      show={show} 
      onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">{title}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body><img src={URLs.ASSETS_REL+url} className="img-fluid" width="100%"></img></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
        </Col>
      ))}
      {!isAuthenticated&&<Col>
        <div>
          <h4>{MSGs.HOME_UNAUTHORIRIZED_USERS} &nbsp;
          <button type="button" value="signin" className="btn btn-primary btn-lg" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleClick(e)}>Sign in</button>
          </h4>
        </div>
        <div className="messages">{MSGs.SIGNUP_PROMPT} <button type="button" value="register" className="btn btn-primary btn-sm" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleClick(e)}>Sign Up</button></div>
      </Col>}
    </Row>
    </>
  );

  }
  
  export default Home;