import React from 'react';
import PageHeader from '../components/PageHeader';
import PageNavbar from '../components/PageNavbar';
import Login from '../components/Login';
import PageBody from '../components/PageBody';


const LoginPage = () =>
{    
    
    return(      
    <div>     
        <PageHeader />
        <PageNavbar />        
        <Login />   
        <PageBody />
    </div>
    );
};

export default LoginPage;