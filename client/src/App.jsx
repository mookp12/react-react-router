import "./App.css";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage"
import EditProductPage from "./pages/EditProductPage"
import ViewProductPage from "./pages/ViewProductPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/product/create" element={<CreateProductPage/>}/>
          <Route path="/product/edit/:id" element={<EditProductPage/>}/>
          <Route path="/product/view/:id" element={<ViewProductPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
