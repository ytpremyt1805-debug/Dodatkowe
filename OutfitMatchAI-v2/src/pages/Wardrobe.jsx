import useWardrobe from "../hooks/useWardrobe";
import UploadClothing from "../components/wardrobe/UploadClothing";
import ClothingCard from "../components/wardrobe/ClothingCard";
import { useMemo, useState } from "react";
import { categories } from "../utils/categories";

export default function Wardrobe() {

    const { wardrobe } = useWardrobe();

    const [filter, setFilter] = useState("wszystkie");
    const [search, setSearch] = useState("");

    const filters = [
        { key: "wszystkie", label: "Wszystkie", icon: "👔" },
        ...categories
    ];

    const filteredWardrobe = useMemo(() => {

        return wardrobe.filter(item => {

            const categoryOk =
                filter === "wszystkie" ||
                item.description.category === filter;

            const text = `
                ${item.description.type}
                ${item.description.color}
                ${item.description.style}
                ${item.description.material}
                ${item.description.season}
                ${item.description.occasion}
            `.toLowerCase();

            const searchOk =
                text.includes(search.toLowerCase());

            return categoryOk && searchOk;

        });

    }, [wardrobe, filter, search]);

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Moja garderoba

                </h1>

                <p className="text-gray-500 mt-2">

                    Dodawaj ubrania i buduj swoją cyfrową szafę.

                </p>

                <p className="text-sm text-indigo-600 mt-2">

                    Masz obecnie <b>{filteredWardrobe.length}</b> ubrań.

                </p>

            </div>

            <input
                type="text"
                placeholder="🔍 Szukaj ubrań..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex flex-wrap gap-3">

                {filters.map(category => (

                    <button

                        key={category.key}

                        onClick={() => setFilter(category.key)}

                        className={`px-4 py-2 rounded-full transition ${
                            filter === category.key
                                ? "bg-indigo-600 text-white"
                                : "bg-white border hover:bg-gray-100"
                        }`}

                    >

                        {category.icon} {category.label}

                    </button>

                ))}

            </div>

            <UploadClothing />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {filteredWardrobe.map(item => (

                    <ClothingCard

                        key={item.id}

                        item={item}

                    />

                ))}

            </div>

        </div>

    );

}