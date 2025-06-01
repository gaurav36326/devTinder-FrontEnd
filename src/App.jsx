import Body from "./components/Body"
import Home from "./components/Home"
import Login from "./components/Login"
import Profile from "./components/Profile"
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom'
import SignUp from "./components/SignUp"
import Connections from "./components/Connections"
import ReviewRequests from "./components/ReviewRequests"

function App() {

  const appRouter = createBrowserRouter([
      {
        path : '/',
        element : <Body/>,
        children :[
          {
             path : '/signup',
              element : <SignUp/>,
          },
          {
             path : '/login',
              element : <Login/>,
          },
          {
             path : '/',
              element : <Home/>,
          },
          {
             path : '/profile',
              element : <Profile/>,
          },
          {
             path : '/connections',
              element : <Connections/>,
          },
          {
             path : '/requests',
              element : <ReviewRequests/>,
          }
      ]
      }
  ])


  return (<RouterProvider router={appRouter}/>)
}

export default App
