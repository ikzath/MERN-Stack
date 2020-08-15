import React, { Component } from 'react';
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

  class AppNavBar extends Component {
    state = {
        isOpen:false
    }
    
    toggle = ()=> this.setState({
        isOpen: !this.state.isOpen
    })

    render() {
        return(
        <div>
            <Navbar color='dark' dark expand='expand' className='mb-5'>
            <Container>
            <NavbarBrand href='/'>Shopping List - Bismillah</NavbarBrand> 
            <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>                
                 <Nav className='ml-auto' navbar>
                    <NavItem>
                     <NavLink href='www.github.com/ikzath'>GithHub Page</NavLink>  
                   </NavItem>  
                 </Nav>                
               </Collapse>                           
              </Container>  
            </Navbar>
        </div>
        ); 
      }
  }

  export default AppNavBar;
