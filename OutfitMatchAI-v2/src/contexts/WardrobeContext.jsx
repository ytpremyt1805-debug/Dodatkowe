import { createContext, useEffect, useState } from "react";

export const WardrobeContext = createContext();

export default function WardrobeProvider({ children }) {

    const [wardrobe, setWardrobe] = useState(() => {

        const saved = localStorage.getItem("wardrobe");

        return saved ? JSON.parse(saved) : [];

    });

    useEffect(() => {

        localStorage.setItem(

            "wardrobe",

            JSON.stringify(wardrobe)

        );

    }, [wardrobe]);

    const addClothing = (item) => {

        setWardrobe(prev => [...prev, item]);

    };

    const deleteClothing = (id) => {

        setWardrobe(prev =>

            prev.filter(item => item.id !== id)

        );

    };

    const clearWardrobe = () => {

        setWardrobe([]);

    };

    return (

        <WardrobeContext.Provider

            value={{

                wardrobe,

                addClothing,

                deleteClothing,

                clearWardrobe

            }}

        >

            {children}

        </WardrobeContext.Provider>

    );

}