import React from 'react';
import {Link} from 'react-router-dom'
import {Form, Button, Container} from 'react-bootstrap';

const formbox = {
    width: "380px",
    height: "480px",
    position: "relative",
    margin: "6% auto",
    background: "white",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
}

const style = {
    textDecoration: "none",
    marginTop: "10px",
    position: "relative",
  };

export default ({user, allCategory, handleSubmit,handleStock, handleName, handlePrice, handleImg, handleDescription, handleCategory, category}) => {

    return(
        <div>
            {user.id && user.isAdmin !== "Customer" ? 
        
        <Container style={formbox}> 

            <Form  onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label >Nombre:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter name"
                    onChange={handleName} 
                    autoFocus
                    />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group >
                    <Form.Label >Stock:</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Enter stock" 
                    onChange={handleStock}
                    />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group >
                    <Form.Label>Price:</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Enter price" 
                    onChange={handlePrice}
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Imagen:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter a URL img" 
                    onChange={handleImg}
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Descripcion:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter a description" 
                    onChange={handleDescription}
                    />
                </Form.Group>
                { allCategory && allCategory.length > 0 ?
                    allCategory.map((c)=>{
                        return (
                <Form.Group className="custom-control-inline" key={c.id}>
                    <span >
                        <Button variant="danger" style={style} onClick={()=>{handleCategory(c)}}>{c.name}</Button>
                    </span>
                </Form.Group>
                        )
                    }) : null
                }
    <br/>
    <br/>
    <hr/>

                <Button style={{marginTop: "30px", marginBottom: "30px"}}variant="dark" type="submit">
                    Create Product
                </Button>


            </Form>
            </Container> : (<div className="container" style={{ marginTop: "50px", width: "60%" }}>ACA NO ENTRAS</div>)}
        </div>
    )
}