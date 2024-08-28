import React from "react";
import {
    Address,
    GoogleMapsButton, ProductsCount,
    RowDiv, RowDiv2, SupermarketDistance,
    SupermarketImage,
    SupermarketsContainer,
    TotalCost
} from "./supermarkets-card.styled";
import {Item} from "./shopping-cart.styled";
import googleMapsIcons from "../resources/google-maps.png";
import victoryIcon from "../resources/victoryIcon.png";
import yenotBitanIcon from "../resources/yenotBitanIcon.png";
import _, {round} from "lodash"

export const SupermarketsCard = ({supermarkets}) => {
    const openGoogleMaps = (address) => {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
        window.open(url, '_blank');
    }
    const storesImages = {"Victory": victoryIcon, "Yenot_bitan": yenotBitanIcon}

    const getSupermarketAddress = (address, city) => {
        if ((_.isEmpty(address) || _.isNil(address)) && (_.isEmpty(city) || _.isNil(city))) {
            return "";
        } else if (_.isEmpty(address) || _.isNil(address)) {
            return city;
        } else if (_.isEmpty(city) || _.isNil(city)) {
            return address;
        } else {
            return `${address}, ${city}`;
        }
    }
    return (
        <SupermarketsContainer>
            {supermarkets.map((supermarket, index) => (
                <Item key={index}>
                    <RowDiv>
                        <TotalCost>₪{supermarket.total_cost}</TotalCost>
                        <SupermarketImage src={storesImages[supermarket.store_name]} alt={supermarket.store_name}/>
                    </RowDiv>
                    <RowDiv2>
                        {supermarket.distance > 0 && <SupermarketDistance>{round(supermarket.distance,2)} ק"מ</SupermarketDistance>}
                        <ProductsCount>מספר המוצרים בסל: {supermarket.products_available}</ProductsCount>
                    </RowDiv2>
                    <RowDiv2>
                        <GoogleMapsButton onClick={() => openGoogleMaps(supermarket.store_address)}>
                            <img src={googleMapsIcons} alt={"googleMaps"}/>
                        </GoogleMapsButton>
                        <Address>{getSupermarketAddress(supermarket.store_address, supermarket.store_city)}</Address>
                    </RowDiv2>
                </Item>
            ))}
        </SupermarketsContainer>
    );
};