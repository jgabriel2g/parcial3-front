import {BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from './Components/Nav';
import Products from './Views/Products/index';
import CreateProducts from './Views/Products/Create';
import EditProducts from './Views/Products/Edit';
import Sales from './Views/Sales/index';
import CreateSales from './Views/Sales/Create';
import EditSales from './Views/Sales/Edit';
import Login from  './Views/Login';
import ProtectedRoutes from './Components/ProtectedRoutes';


function App() {

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<Products/>}/>
          <Route path="/createProducts" element={<CreateProducts/>}/>
          <Route path="/editProducts/:id" element={<EditProducts/>}/>
          <Route path="/Sales" element={<Sales/>}/>
          <Route path="/createSales" element={<CreateSales/>}/>
          <Route path="/editSales/:id" element={<EditSales/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
