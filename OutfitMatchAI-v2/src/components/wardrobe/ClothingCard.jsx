import { Trash2, Heart } from "lucide-react";
import useWardrobe from "../../hooks/useWardrobe";

export default function ClothingCard({ item }) {

    const {

        deleteClothing,

        toggleFavorite

    } = useWardrobe();

    return (

        <div className="relative bg-white rounded-xl shadow border overflow-hidden flex flex-col h-full">

            <img

                src={item.image}

                alt={item.description.type}

                className="w-full h-56 object-cover"

            />

            <button

                onClick={() => toggleFavorite(item.id)}

                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:scale-110 transition"

            >

                <Heart

                    size={20}

                    fill={item.favorite ? "#ef4444" : "none"}

                    className="text-red-500"

                />

            </button>

            <div className="p-4 flex flex-col flex-1">

                <h3 className="font-bold text-lg">

                    {item.description.type}

                </h3>

                <div className="mt-3 space-y-1 text-sm text-gray-700">

                    <p>🎨 <b>Kolor:</b> {item.description.color}</p>

                    <p>👔 <b>Styl:</b> {item.description.style}</p>

                    <p>🧵 <b>Materiał:</b> {item.description.material}</p>

                    <p>🌤 <b>Sezon:</b> {item.description.season}</p>

                    <p>📅 <b>Okazja:</b> {item.description.occasion}</p>

                    <p>⭐ <b>Elegancja:</b> {item.description.elegance}/10</p>

                </div>

                <button

                     onClick={() => deleteClothing(item.id)}
                    className="mt-auto w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 flex justify-center items-center gap-2 transition"

                >

                    <Trash2 size={18} />

                    Usuń

                </button>

            </div>

        </div>

    );

}