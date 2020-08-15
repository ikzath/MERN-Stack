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

class ItemModel extends Component {
state= {
  modal: false,
  name: ''
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
    <Button
    color='dark'
    style= {{ marginBottom:'2rem'}}
    onClick= { this.toggle}
    >
    Add Item</Button>   

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

const mapToProps = state => ({ item: state.item });

export default connect(mapToProps, { addItem })(ItemModel);