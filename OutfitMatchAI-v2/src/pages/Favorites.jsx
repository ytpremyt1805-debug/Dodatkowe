import useWardrobe from "../hooks/useWardrobe";
import ClothingCard from "../components/wardrobe/ClothingCard";

export default function Favorites() {

    const { wardrobe } = useWardrobe();

    const favorites = wardrobe.filter(item => item.favorite);

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    ❤️ Ulubione

                </h1>

                <p className="text-gray-500 mt-2">

                    Twoje ulubione elementy garderoby.

                </p>

                <p className="text-sm text-indigo-600 mt-2">

                    Masz <b>{favorites.length}</b> ulubionych ubrań.

                </p>

            </div>

            {favorites.length === 0 ? (

                <div className="bg-white rounded-xl shadow p-10 text-center">

                    <div className="text-6xl mb-4">

                        ❤️

                    </div>

                    <h2 className="text-2xl font-bold">

                        Brak ulubionych ubrań

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Kliknij serduszko na dowolnym ubraniu,
                        aby dodać je do ulubionych.

                    </p>

                </div>

            ) : (

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {favorites.map(item => (

                        <ClothingCard

                            key={item.id}

                            item={item}

                        />

                    ))}

                </div>

            )}

        </div>

    );

}