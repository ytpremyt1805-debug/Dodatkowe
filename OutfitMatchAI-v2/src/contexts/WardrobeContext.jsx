import { createContext, useEffect, useState } from "react";

import {
    getWardrobe,
    saveClothing,
    deleteClothing as dbDeleteClothing,
    clearWardrobe as dbClearWardrobe,
    updateClothing
} from "../services/indexedDB";

export const WardrobeContext = createContext();

export default function WardrobeProvider({ children }) {

    const [wardrobe, setWardrobe] = useState([]);

    useEffect(() => {

        loadWardrobe();

    }, []);

    async function loadWardrobe() {

        const items = await getWardrobe();

        setWardrobe(items);

    }

    async function addClothing(item) {

        await saveClothing(item);

        setWardrobe(prev => [...prev, item]);

    }

    async function deleteClothing(id) {

        await dbDeleteClothing(id);

        setWardrobe(prev =>

            prev.filter(item => item.id !== id)

        );

    }

    async function clearWardrobe() {

        await dbClearWardrobe();

        setWardrobe([]);

    }

    async function toggleFavorite(id) {

        const item = wardrobe.find(

            x => x.id === id

        );

        if (!item) return;

        const updated = {

            ...item,

            favorite: !item.favorite

        };

        await updateClothing(updated);

        setWardrobe(prev =>

            prev.map(x =>

                x.id === id

                    ? updated

                    : x

            )

        );

    }

    return (

        <WardrobeContext.Provider

            value={{

                wardrobe,

                addClothing,

                deleteClothing,

                clearWardrobe,

                toggleFavorite

            }}

        >

            {children}

        </WardrobeContext.Provider>

    );

}