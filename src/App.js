import './App.css';
import Navbar from './components/Navbar';
import Home from './pages';
import Resume from './pages/resume';
import Library from './pages/library';
import Code from './pages/code';
import Contact from './pages/contact';
import Login from './pages/login';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard';
import ForgotPassword from './pages/forgotPassword';
import KnowledgeItem from './pages/knowledgeItem';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DatabaseProvider } from './contexts/DatabaseContext'
import PrivateRoute from './components/PrivateRoute'
import SocialDial from './components/SocialDial'

function App() {
  const navbarLinks = [
    { title: 'Resume', path: '/resume' },
    { title: 'Library', path: '/library' },
    { title: 'Code', path: '/code' },
    // { title: 'Contact', path: '/contact' }
  ];

  return (
    <AuthProvider>
      <DatabaseProvider>
        <Router>
          <Navbar links={navbarLinks} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/resume" exact component={Resume} />
            <Route path="/library" exact component={Library} />
            <Route path="/code" exact component={Code} />
            {/* <Route path="/contact" exact component={Contact} /> */}
            {/* <Route path="/signup" exact component={SignUp} /> */}
            <Route path="/login" exact component={Login} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute exact path="/knowledgeItem/:knowledgeItemId/" component={KnowledgeItem} />
          </Switch>
          <SocialDial></SocialDial>
        </Router>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
