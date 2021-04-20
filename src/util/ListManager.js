import { useState, useEffect } from 'react';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

const updateStorageCurrentList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
}

const updateStorageCurrentCart = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
}

export const useCurrentList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [favorited, setFavorited] = useState([]);

    const addItem = (text) => {
        const newList = [{ id: uuid(), name: text }, ...list];
        setList(newList);
        updateStorageCurrentList(newList);
    }

    const addToCart = (item) => {
        const newCart = [item, ...cart];
        setCart(newCart);
        updateStorageCurrentCart(newCart);
    }

    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id);
        setList(newList)
        updateStorageCurrentList(newList);
    }

    const addToFavorite = (id) => {
        const favoritedItems = []
    }

    useEffect(() => {
        Promise.all([
                AsyncStorage.getItem('@@GroceryList/currentList'),
                AsyncStorage.getItem('@@GroceryList/currentCart'),
            ])
            .then(([list, cartItems]) => [JSON.parse(list), JSON.parse(cartItems)])
            .then(([list, cartItems]) => {
                if (list) {
                    setList(list);
                }
                if (cartItems) {
                    setCart(cartItems)
                }
                setLoading(false);
            })
    }, [])

    return {
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
        favorited,
        addToFavorite,
    }
}