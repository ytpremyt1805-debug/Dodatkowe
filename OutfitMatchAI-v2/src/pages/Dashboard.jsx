import useWardrobe from "../hooks/useWardrobe";

import StatCard from "../components/common/StatCard";

export default function Dashboard() {

    const {

        wardrobe

    } = useWardrobe();

    const shirts = wardrobe.filter(

        item => item.description?.type === "Koszula"

    ).length;

    const shoes = wardrobe.filter(

        item => item.description?.type === "Buty"

    ).length;

    const elegance = wardrobe.length

        ?

        (

            wardrobe.reduce(

                (sum, item) =>

                    sum + Number(item.description?.elegance || 0),

                0

            ) / wardrobe.length

        ).toFixed(1)

        :

        "0.0";

    return (

        <>

            <h1 className="text-4xl font-bold">

                Witaj 👋

            </h1>

            <p className="text-gray-500 mt-2">

                Twoja cyfrowa garderoba AI

            </p>

            <div className="grid grid-cols-4 gap-6 mt-8">

                <StatCard

                    title="Ubrań"

                    value={wardrobe.length}

                    icon="👔"

                    color="text-indigo-600"

                />

                <StatCard

                    title="Koszul"

                    value={shirts}

                    icon="👕

"

                    color="text-blue-600"

                />

                <StatCard

                    title="Butów"

                    value={shoes}

                    icon="👟"

                    color="text-green-600"

                />

                <StatCard

                    title="Elegancja"

                    value={elegance}

                    icon="⭐"

                    color="text-yellow-500"

                />

            </div>

        </>

    );

}