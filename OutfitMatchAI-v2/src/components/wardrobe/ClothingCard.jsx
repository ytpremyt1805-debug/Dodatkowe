import { Trash2 } from "lucide-react";
import useWardrobe from "../../hooks/useWardrobe";

export default function ClothingCard({ item }) {

    const { deleteClothing } = useWardrobe();

    return (

        <div className="bg-white rounded-xl shadow border overflow-hidden">

            <img

                src={item.image}

                alt={item.description.type}

                className="w-full h-56 object-cover"

            />

            <div className="p-4">

                <h3 className="font-bold text-lg">
                    
                    {item.description.type}

                </h3>

                <div className="mt-3 space-y-1 text-sm">

                    <p>🎨 <b>Kolor:</b> {item.description.color}</p>

                    <p>👔 <b>Styl:</b> {item.description.style}</p>

                    <p>🧵 <b>Materiał:</b> {item.description.material}</p>

                    <p>🌤 <b>Sezon:</b> {item.description.season}</p>

                    <p>📅 <b>Okazja:</b> {item.description.occasion}</p>

                    <p>⭐ <b>Elegancja:</b> {item.description.elegance}/10</p>

                </div>

                <button

                    onClick={() => deleteClothing(item.id)}

                    className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 flex justify-center gap-2"

                >

                    <Trash2 size={18}/>

                    Usuń

                </button>

            </div>

        </div>

    );

}