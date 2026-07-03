import { openDB } from "idb";

const DB_NAME = "OutfitMatchAI";
const DB_VERSION = 1;

export const dbPromise = openDB(DB_NAME, DB_VERSION, {

    upgrade(db) {

        if (!db.objectStoreNames.contains("wardrobe")) {

            db.createObjectStore("wardrobe", {

                keyPath: "id"

            });

        }

    }

});

export async function getWardrobe() {

    return (await dbPromise).getAll("wardrobe");

}

export async function saveClothing(item) {

    return (await dbPromise).put("wardrobe", item);

}

export async function deleteClothing(id) {

    return (await dbPromise).delete("wardrobe", id);

}

export async function clearWardrobe() {

    return (await dbPromise).clear("wardrobe");

}

export async function updateClothing(item) {

    return (await dbPromise).put("wardrobe", item);

}