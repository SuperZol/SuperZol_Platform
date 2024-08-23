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
    const openGoogleMaps = (address) => {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
        window.open(url, '_blank');
    }
    const storesImages = {"Victory": victoryIcon, "Yenot_bitan": yenotBitanIcon}
    return (
        <SupermarketsContainer>
            {supermarkets.map((supermarket, index) => (
                <Item key={index}>
                    <RowDiv>
                        <TotalCost>{supermarket.total_cost}₪</TotalCost>
                        <SupermarketImage src={storesImages[supermarket.store_name]} alt={supermarket.store_name}/>
                    </RowDiv>
                    <RowDiv>
                        <GoogleMapsButton onClick={() => openGoogleMaps(supermarket.store_address)}>
                            <img src={googleMapsIcons} alt={"googleMaps"}/>
                        </GoogleMapsButton>
                        <Address>{supermarket.store_address},{supermarket.store_city}</Address>
                    </RowDiv>
                </Item>
            ))}
        </SupermarketsContainer>
    );
};