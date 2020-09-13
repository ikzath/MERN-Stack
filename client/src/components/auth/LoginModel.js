import React, { Component } from 'react';
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
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

class LoginModel extends Component {
state= {
  modal: false,
  email: '',
  password: '',
  msg: null
}

static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,

};

componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error) {
        //Check for register error
      if(error.id === 'LOGIN_FAIL')  {
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
    
    const { email, password } = this.state;

    const user = {
        email, 
        password
    }

    //login user
    this.props.login(user);
}

render() {
  return(
   <div>
   <NavLink onClick={this.toggle} href='#'>
   Login</NavLink>  

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
               <label for='item'>Email</label>
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
                   <Button color='dark' style={{ marginTop: '2rem' }} block>Login </Button>
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

export default connect(mapToProps, { clearErrors, login })(LoginModel);