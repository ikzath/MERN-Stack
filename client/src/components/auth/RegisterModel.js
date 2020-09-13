import React, { Component } from 'react';
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";


import {
 Button,
 Modal,
 ModalHeader,
 ModalBody,
 Form,
 FormGroup,
 NavLink,
 Alert

} from 'reactstrap';
import { connect } from "react-redux";

class RegisterModel extends Component {
state= {
  modal: false,
  name: '',
  email: '',
  password: '',
  msg: null
}

static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,

};

componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error) {
        //Check for register error
      if(error.id === 'REGISTER_FAIL')  {
          this.setState({ msg: error.msg.msg });
      }
      else { 
          this.state({ msg: null });
      }
    }
    
    //IF authentucated, close modal
    if(this.state.modal) {
      if(isAuthenticated) {
          this.toggle();
      }
    }    
}

toggle = ()=> {
   this.props.clearErrors();
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

    const { name, email, password } = this.state;

    //user object
    const newUser = {
        name,
        email,
        password
    }

    // attempz to register
    this.props.register(newUser);

}

render() {
  return(
   <div>
   <NavLink onClick={this.toggle} href='#'>
   Register</NavLink>  

   <Modal
   isOpen= {this.state.modal}
   toggle= {this.toggle}
   >
      <ModalHeader toggle={this.toggle}>Register</ModalHeader> 
       <ModalBody>
           {this.state.msg ? ( 
           <Alert color='danger'>{this.state.msg}</Alert>):null}
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

                    <input 
                   type='email'
                   name='email'
                   id='email'
                   placeholder='email'
                   onChange={this.onChange}                   
                   />

                    <input 
                   type='password'
                   name='password'
                   id='password'
                   placeholder='password'
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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
 });

export default connect(mapToProps, { clearErrors, register })(RegisterModel);