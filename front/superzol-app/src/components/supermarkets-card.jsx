import React from "react";
import {
    Address,
    GoogleMapsButton,
    RowDiv,
    SupermarketImage,
    SupermarketsContainer,
    TotalCost
} from "./supermarkets-card.styled";
import {Item} from "./shopping-cart.styled";
import googleMapsIcons from "../resources/google-maps.png";
import victoryIcon from "../resources/victoryIcon.png";
import yenotBitanIcon from "../resources/yenotBitanIcon.png";

export const SupermarketsCard = ({supermarkets}) => {

    const storesImages = {"Victory": victoryIcon, "Yenot_bitan": yenotBitanIcon}
    return (
        <SupermarketsContainer>
            {supermarkets.map((supermarket, index) => (
                <Item className="item" key={index}>
                    <RowDiv>
                        <TotalCost>{supermarket.total_cost}₪</TotalCost>
                        <SupermarketImage src={storesImages[supermarket.store_name]} alt={supermarket.store_name}/>
                    </RowDiv>
                    <RowDiv>
                        <GoogleMapsButton>
                            <img src={googleMapsIcons} alt={"googleMaps"}/>
                        </GoogleMapsButton>
                        <Address>{supermarket.store_address},{supermarket.store_city}</Address>
                    </RowDiv>
                </Item>
            ))}
        </SupermarketsContainer>
    );
};