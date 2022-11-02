import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StockOverviewPage } from "./pagrs/StockOverviewPage";
import { StockDetailPage } from "./pagrs/StockDetailPage";

function App() {
    return (
        <main>
          <BrowserRouter>
          <Routes>
            <Route path = "/" element={<StockOverviewPage/>}/>
            <Route path = "/details/:symbol" element = {<StockDetailPage/>}></Route>
          </Routes>
          </BrowserRouter>
        </main>
    );
}

export default App;
