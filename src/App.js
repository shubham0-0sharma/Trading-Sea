import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StockOverviewPage } from "./pages/StockOverviewPage";
import { StockDetailPage } from "./pages/StockDetailPage";
import {WatchListContextProvider} from "./context/watchlistContext"

function App() {
    return (
        <main>
            <WatchListContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<StockOverviewPage />} />
                        <Route
                            path="/details/:symbol"
                            element={<StockDetailPage />}
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </WatchListContextProvider>
        </main>
    );
}

export default App;
