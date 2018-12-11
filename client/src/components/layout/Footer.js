import React from 'react';

class Footer extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div>
            <footer className="bg-dark text-white mt-4  p-4 text-center">
             Copyright &copy; {new Date().getFullYear().toString()} DevConnector
            </footer>
            </div>
         );
    }
}
 
export default Footer;