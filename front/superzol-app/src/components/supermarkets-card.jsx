import React from "react";
import {Button} from "@mui/material";

export const SupermarketsCard = ({supermarkets}) => {
    return (
        <div>
            <h3>:הסופרים הזולים</h3>
            {supermarkets.map((list, index) => (
                <div className="item" key={index}>
                    <p>address: {list.store_address}</p>
                    <p>city: {list.store_city}</p>
                    <p>cost: {list.total_cost}</p>
                    <Button>גוגל</Button>
                </div>
            ))}
        </div>
    );
};