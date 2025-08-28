"use client";

import { createContext, useContext, useState } from "react";

const ProductUserContext = createContext();

export function ProductUserProvider({ children }) {
    const [productUser, setProductUser] = useState({
        products: [],
    });

    return (
        <ProductUserContext.Provider value={{ productUser, setProductUser }}>
            {children}
        </ProductUserContext.Provider>
    );
}

export function useProductUser() {
    return useContext(ProductUserContext);
}
