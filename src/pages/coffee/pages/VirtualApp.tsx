import { useState } from 'react';
import HomePage from './HomePage';
import ContactPage from './ContactPage';


const VirtualApp = ({setIsCoffeeVisible}: any) => {
  const [route, setRoute] = useState('home');

  const navigate = (routeName:string) => {
    setRoute(routeName);
  };
  
  let Component;
  switch (route) {
    case 'contact':
      Component = ContactPage;
      break;
    default:
      Component = HomePage;
  }

  return (
    <div className="coffee-app desktop-app"> 
        <nav className='navbar'>
          <button id='home' onClick={() => navigate('home')}>LOGO</button>
          <button id='contact' onClick={() => navigate('contact')}>CONTACT</button>
        </nav>
      <div className='primary-content'>
        <Component setIsCoffeeVisible={setIsCoffeeVisible}/>
      </div>    
    </div>
    
 
  );
};

export default VirtualApp;

