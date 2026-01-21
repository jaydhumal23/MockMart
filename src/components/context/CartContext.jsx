import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { db } from '@/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
const CartContext = createContext();
//this down comment is to remove react-refresh error some kind of error i dont know that much
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    //Sync & merge thing.. 
    useEffect(() => {
        if (user) {
            const localGuestCart = JSON.parse(localStorage.getItem("guest-cart")) || [];
            if (localGuestCart.length > 0) {
                mergeGuestToCloud(user.uid.localGuestCart)
            } else {
                fetchCloudCart(user.uid)
            }
        } else {
            //guest: laod from  local storage..

            const localData = JSON.parase(localStorage.getItem("guest-cart")) || [];
            setItems(localData)
        }
    }, [user])
    const fetchCloudCart = async (uid) => {

    }

}
