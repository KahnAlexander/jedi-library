import './App.css';
import Navbar from './components/Navbar';
// import MediaTab from './components/MediaTab';
import Home from './pages';
import Resume from './pages/resume';
import Library from './pages/library';
import Code from './pages/code';
import Contact from './pages/contact';
import Signin from './pages/signin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const navbarLinks = [
    { title: 'Resume', path: '/resume' },
    { title: 'Library', path: '/library' },
    { title: 'Code', path: '/code' },
    { title: 'Contact', path: '/contact' }
  ];

  return (
    <Router>
      <Navbar links={navbarLinks} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/resume" exact component={Resume} />
        <Route path="/library" exact component={Library} />
        <Route path="/code" exact component={Code} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/signin" exact component={Signin} />
      </Switch>
      {/* <MediaTab /> */}
    </Router>
  );
}

export default App;
