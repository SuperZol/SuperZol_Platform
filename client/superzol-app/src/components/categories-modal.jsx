import React from 'react';
import {
    CategoriesGrid,
    CategoryButton,
    CategoryIcon,
    ExitModalButton,
    ModalContent,
    ModalOverlay
} from "./categories-modal.styled";
import dairyIcon from '../resources/categories/dairy.png';
import fruitsAndVegetables from '../resources/categories/fruits-and-vegetables.png';
import breads from '../resources/categories/breads.png';
import beautyCare from '../resources/categories/beauty-care.png';
import paw from '../resources/categories/paw.png';
import cleaningProducts from '../resources/categories/cleaning-products.png';
import drinks from '../resources/categories/drinks.png';
import fishChicken from '../resources/categories/fish-chicken.png';
import pot from '../resources/categories/pot.png';
import snack from '../resources/categories/snack.png';
import frozenFood from '../resources/categories/frozen-food.png';
import pacifier from '../resources/categories/pacifier.png';
import vitamin from '../resources/categories/vitamin.png';
import organicFood from '../resources/categories/organic-food.png';
import {ExitButton} from "./shopping-cart.styled";
import closeIcon from "../resources/close.png";
import {RemoveButton} from "./cart-product.styled";

export const CategoriesModal = ({isOpen, onClose, filterCategory}) => {
    if (!isOpen) return null;

    const categories = [
        {id: 1, icon: fruitsAndVegetables, label: 'פירות וירקות'},
        {id: 2, icon: dairyIcon, label: 'מוצרי חלב וביצים'},
        {id: 3, icon: fishChicken, label: 'בשר עוף ודגים'},
        {id: 4, icon: breads, label: 'לחמים ומוצרי מאפה'},
        {id: 5, icon: drinks, label: 'משקאות יין אלכוהול וטבק'},
        {id: 6, icon: frozenFood, label: 'מזון מקורר קפוא ונקניקים'},
        {id: 7, icon: pot, label: 'בישול אפייה ושימורים'},
        {id: 8, icon: snack, label: 'חטיפים מתוקים ודגני בוקר'},
        {id: 9, icon: beautyCare, label: 'פארם וטיפוח'},
        {id: 10, icon: pacifier, label: 'עולם התינוקות'},
        {id: 11, icon: cleaningProducts, label: 'ניקיון וחד פעמי'},
        {id: 12, icon: paw, label: 'בעלי חיים'},
        {id: 13, icon: vitamin, label: 'ויטמינים ותוספי תזונה'},
        {id: 14, icon: organicFood, label: 'אורגני ובריאות'}
    ];

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ExitModalButton onClick={onClose}>×</ExitModalButton>
                <CategoriesGrid>
                    {categories.map(category => (
                        <CategoryButton key={category.id} onClick={() => filterCategory(category.label)}>
                            <CategoryIcon src={category.icon}
                                          alt={category.label}/>
                            <span>{category.label}</span>
                        </CategoryButton>
                    ))}
                </CategoriesGrid>
            </ModalContent>
        </ModalOverlay>
    );
};

