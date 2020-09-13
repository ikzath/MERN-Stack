import React, { Component, Fragment } from 'react';
import RegisterModel from "./auth/RegisterModel";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container,
    NavbarBrand
  } from 'reactstrap';

  import { connect } from 'react-redux';
  import PropTypes from "prop-types";
  import Logout from "./auth/Logout";
  import LoginModel from "./auth/LoginModel";


  class AppNavBar extends Component {
    state = {
      isOpen:false
    }
    
    static propTypes = {
      auth: PropTypes.object.isRequired
    }

    toggle = ()=> this.setState({
        isOpen: !this.state.isOpen
    });

    render() {

      const { isAuthenticated, user } = this.props.auth;

      const authLinks = (
        <Fragment>
          <NavItem>
           <span className= 'navbar-text mr-3'>
           <strong>{ user ? `Welcome ${user.name}`: '' }</strong>
           </span>
          </NavItem>
          <NavItem>
           <Logout />
          </NavItem>
        </Fragment>
      );

      const guestLinks = (
        <Fragment>
          <NavItem>
          <NavLink href='www.github.com/ikzath'>GithHub Page</NavLink> 
          <RegisterModel /> 
          </NavItem>  
          <NavItem>
          <LoginModel/>
          </NavItem>
        </Fragment>
      );


        return(
        <div>
            <Navbar color='dark' dark expand='expand' className='mb-5'>
            <Container>
            <NavbarBrand href='/'>Shopping List - Bismillah</NavbarBrand> 
            <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>                
                 <Nav className='ml-auto' navbar>   
                 { isAuthenticated ? authLinks: guestLinks}            
                 </Nav>                
               </Collapse>                           
              </Container>  
            </Navbar>
        </div>
        ); 
      }
  }

  const mapStateToProps = state => ({
     auth: state.auth
  });

  export default connect(mapStateToProps, null) (AppNavBar); 
