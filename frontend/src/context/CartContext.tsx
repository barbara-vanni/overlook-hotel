import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Room {
    id: string;
    type: string;
    capacity: number;
    status: string;
}

interface CartItem {
    room: Room;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    pricePerNight: number;
    totalPrice: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (roomId: string) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            // Check if room is already in cart
            const existingIndex = prevItems.findIndex(cartItem => cartItem.room.id === item.room.id);
            
            if (existingIndex >= 0) {
                // Update existing item
                const updatedItems = [...prevItems];
                updatedItems[existingIndex] = item;
                return updatedItems;
            } else {
                // Add new item
                return [...prevItems, item];
            }
        });
    };

    const removeFromCart = (roomId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.room.id !== roomId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.totalPrice, 0);
    };

    const getItemCount = () => {
        return cartItems.length;
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getItemCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
