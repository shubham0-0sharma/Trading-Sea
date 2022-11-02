import React from "react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import finnHub from "../apis/finnHub";

const StockList = () => {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
    const [stock, setStock] = useState();
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/quote", {
                    params: {
                        symbol: "MSFT",
                    },
                });
                console.log(response);
                if (isMounted) {
                    setStock(response.data);
                }
            } catch (err) {}
        };
        fetchData();
        return () => (isMounted = false);
    }, []);
    return <div>StockList</div>;
};

export default StockList;
