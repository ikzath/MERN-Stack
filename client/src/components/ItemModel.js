import React, { Component } from 'react';

import {
 Button,
 Modal,
 ModalHeader,
 ModalBody,
 Form,
 FormGroup,

} from 'reactstrap';
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModel extends Component {
state= {
  modal: false,
  name: ''
}

static propTypes = {
  isAuthenticated: PropTypes.bool
}

toggle = ()=> {
   this.setState({
   modal: !this.state.modal 
   });
}

onChange = (e)=> {
    this.setState({ 
       [e.target.name] : e.target.value
    });
}

onSubmit = (e)=> {

    e.preventDefault();

    const newItem = {
        name: this.state.name        
    };

    //AddItem event öistener
    this.props.addItem(newItem);

    //close Modal
    this.toggle();
}

render() {
  return(
   <div>
    {this.props.isAuthenticated ? (
    <Button
    color='dark'
    style= {{ marginBottom:'2rem'}}
    onClick= { this.toggle}
    >
    Add Item</Button> ) : (<h4 className= 'mb-3 ml-4'>Login to add items</h4> )}  

   <Modal
   isOpen= {this.state.modal}
   toggle= {this.toggle}
   >
      <ModalHeader toggle={this.toggle}>Add Item to Shopping List</ModalHeader> 
       <ModalBody>
           <Form onSubmit={this.onSubmit}>
               <FormGroup>
                   <label for='item'>Item </label>
                   <input 
                   type='text'
                   name='name'
                   id='id'
                   placeholder='add new item'
                   onChange={this.onChange}                   
                   />
                   <Button color='dark' style={{ marginTop: '2rem' }} block>Add Item </Button>
               </FormGroup>
           </Form>
       </ModalBody>
   </Modal>
</div> 

  );  
 }
}

const mapToProps = state => ({ 
    item: state.item ,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapToProps, { addItem })(ItemModel);