import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import finnHub from "../apis/finnHub";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { WatchListContext } from "../context/watchlistContext";
const StockList = () => {
    const navigate = useNavigate();
    const [stock, setStock] = useState([]);
    const { watchList } = useContext(WatchListContext);
    const changeColor = (change) => {
        return change > 0 ? "success" : "danger";
    };
    const renderIcon = (change) => {
        return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
    };
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    watchList.map((stock) => {
                        return finnHub.get("/quote", {
                            params: { symbol: stock },
                        });
                    })
                );
                const responseData = responses.map((response) => ({
                    data: response.data,
                    symbol: response.config.params.symbol,
                }));

                if (isMounted) {
                    setStock(responseData);
                }
            } catch (err) {}
        };
        fetchData();
        return () => (isMounted = true);
    }, [watchList]);

    const handleStockSelect = (symbol) => {
        navigate(`details/${symbol}`);
    };
    return (
        <div>
            <table className="table hover mt-5">
                <thead style={{ color: "rgb(79,89,102)" }}>
                    <tr>
                        <th scope="col">NAME</th>
                        <th scope="col">LAST</th>
                        <th scope="col">CHG</th>
                        <th scope="col">CHG%</th>
                        <th scope="col">HIGH</th>
                        <th scope="col">LOW</th>
                        <th scope="col">OPEN</th>
                        <th scope="col">CLOSE</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map((stockData) => {
                        return (
                            <tr
                                className="table-row"
                                style={{ cursor: "pointer" }}
                                key={stockData.symbol}
                                onClick={() =>
                                    handleStockSelect(stockData.symbol)
                                }
                            >
                                <th scope="row">{stockData.symbol}</th>
                                <td>{stockData.data.c} </td>
                                <td
                                    className={`text-${changeColor(
                                        stockData.data.d
                                    )}`}
                                >
                                    {stockData.data.d}
                                    {renderIcon(stockData.data.d)}
                                </td>
                                <td
                                    className={`text-${changeColor(
                                        stockData.data.d
                                    )}`}
                                >
                                    {stockData.data.dp}
                                    {renderIcon(stockData.data.dp)}
                                </td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td>{stockData.data.pc}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StockList;
