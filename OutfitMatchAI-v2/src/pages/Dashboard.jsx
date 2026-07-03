import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import useWardrobe from "../hooks/useWardrobe";
import useUser from "../hooks/useUser";

import StatCard from "../components/common/StatCard";
import { categories } from "../utils/categories";

export default function Dashboard() {

    const { wardrobe } = useWardrobe();
    const { user } = useUser();

    const [analysis, setAnalysis] = useState(() => {

    return localStorage.getItem("wardrobeAnalysis") || "";

});

const [analysisDate, setAnalysisDate] = useState(() => {

    return localStorage.getItem("wardrobeAnalysisDate") || "";

});

const [loadingAnalysis, setLoadingAnalysis] = useState(false);

    const categoryCount = wardrobe.reduce((acc, item) => {

        const category = item.description?.category;

        if (category) {

            acc[category] = (acc[category] || 0) + 1;

        }

        return acc;

    }, {});

    const elegance = wardrobe.length

        ? (

            wardrobe.reduce(

                (sum, item) =>

                    sum + Number(item.description?.elegance || 0),

                0

            ) / wardrobe.length

        ).toFixed(1)

        : "0.0";

   

    async function analyzeWardrobe() {

        setLoadingAnalysis(true);

        try {

            const genAI = new GoogleGenerativeAI(

                import.meta.env.VITE_GEMINI_API_KEY

            );

            const model = genAI.getGenerativeModel({

                model: "gemini-2.5-flash"

            });

            const prompt = `

Jesteś profesjonalnym stylistą AI.

Przeanalizuj garderobę użytkownika.

Profil użytkownika:

${JSON.stringify(user, null, 2)}

Garderoba:

${JSON.stringify(wardrobe, null, 2)}

Na podstawie garderoby przygotuj raport.

Raport ma zawierać:

⭐ Ogólną ocenę garderoby w skali 1-10

✅ Mocne strony garderoby

⚠️ Brakujące elementy

💡 Co warto dokupić

🎨 Krótką ocenę kolorystyki

👔 Krótką ocenę stylu

Nie wymyślaj ubrań których użytkownik posiada.

Odpowiadaj po polsku.

`;

            const result = await model.generateContent(prompt);

            const text = result.response.text();

setAnalysis(text);

localStorage.setItem(

    "wardrobeAnalysis",

    text

);
<div className="mt-10 flex justify-between items-center">

    <div>

        {analysisDate && (

            <p className="text-gray-500 text-sm">

                Ostatnia analiza:

                <b> {analysisDate}</b>

            </p>

        )}

    </div>

    <button

        onClick={analyzeWardrobe}

        disabled={loadingAnalysis}

        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl"

    >

        {

            loadingAnalysis

            ?

            "🤖 Analizuję..."

            :

            analysis

                ?

                "🔄 Analizuj ponownie"

                :

                "🤖 Analizuj garderobę"

        }

    </button>

</div>
const date = new Date().toLocaleString("pl-PL");

setAnalysisDate(date);

localStorage.setItem(

    "wardrobeAnalysisDate",

    date

);
        }

        catch (e) {

            console.error(e);

            setAnalysis(

                "Nie udało się przeanalizować garderoby."

            );

        }

        setLoadingAnalysis(false);

    }

    return (

        <>

            <h1 className="text-4xl font-bold">

                Witaj 👋

            </h1>

            <p className="text-gray-500 mt-2">

                Twoja cyfrowa garderoba AI

            </p>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4 mt-8">

                <StatCard

                    title="Elementów garderoby"

                    value={wardrobe.length}

                    icon="👔"

                    color="text-indigo-600"

                />

                {categories.map(category => (

                    <StatCard

                        key={category.key}

                        title={category.label}

                        value={categoryCount[category.key] || 0}

                        icon={category.icon}

                        color="text-blue-600"

                    />

                ))}

                <StatCard

                    title="Średnia elegancja"

                    value={elegance}

                    icon="⭐"

                    color="text-yellow-500"

                />

            </div>
<div className="mt-10 flex justify-end">

    <button

        onClick={analyzeWardrobe}

        disabled={loadingAnalysis}

        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl transition"

    >

        {loadingAnalysis

            ? "🤖 Analizuję garderobę..."

            : "🤖 Analizuj garderobę"}

    </button>

</div>
{analysis && (

<div className="mt-6 bg-white rounded-2xl shadow border p-8">

    <h2 className="text-2xl font-bold mb-6">

        🤖 Analiza garderoby AI

    </h2>

    <div className="whitespace-pre-wrap leading-8">

        {analysis}

    </div>

</div>


)}

        </>

    );

}