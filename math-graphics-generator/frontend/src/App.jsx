import {useState} from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import "./App.css";
import { Home, Animation, Error, Landing, About } from "./pages";

// import FunctionForm from "./components/FunctionForm";
// import Navbar from './components/Navbar';
// import OptionForm from "./components/OptionForm";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />,
    errorElement: <Error />,
    children:[
      {
        index: true,
        element: <Landing />
      },      
      {
        path:"animation",
        element: <Animation />
      },
      {
        path:"about",
        element: <About />
      }      
    ]
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
    // <Routes>
    //   <div className="App">
    //     <Navbar />
    //     <h1>Math Video Generator</h1>
    //       <Route path="/">
    //         <FunctionForm setVideo={setVideo}/>
    //         {video && <video controls src={video} />}
    //       </Route>
    //       <Route path="/options">
    //         <OptionForm setVideo={setVideo} />
    //         {video && <video controls src={video} />}
    //       </Route>          
    //   </div>
    // </Routes>
  );
}
export default App