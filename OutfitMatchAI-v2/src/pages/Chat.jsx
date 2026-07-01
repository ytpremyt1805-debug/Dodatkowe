import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import useWardrobe from "../hooks/useWardrobe";

export default function Chat() {

    const { wardrobe } = useWardrobe();

    const [question, setQuestion] = useState("");

    const [loading, setLoading] = useState(false);

    const [answer, setAnswer] = useState("");

    async function askAI() {

        if (!question.trim()) return;

        setLoading(true);

        try {

            const genAI = new GoogleGenerativeAI(
                import.meta.env.VITE_GEMINI_API_KEY
            );

            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash"
            });

            const wardrobeDescription = wardrobe.map(item => ({
                typ: item.description.type,
                kolor: item.description.color,
                styl: item.description.style,
                material: item.description.material,
                sezon: item.description.season,
                okazja: item.description.occasion,
                elegancja: item.description.elegance
            }));

            const prompt = `
Jesteś profesjonalną stylistką AI.

Masz dostęp do garderoby użytkownika.

Garderoba:

${JSON.stringify(wardrobeDescription, null, 2)}

Pytanie użytkownika:

"${question}"

Odpowiadaj wyłącznie na podstawie garderoby.

Jeżeli czegoś brakuje — napisz czego.

Na końcu podaj:

⭐ Ocena outfitu /10

🛍 Brakujące elementy

💡 Krótkie uzasadnienie.
`;

            const result = await model.generateContent(prompt);

            setAnswer(result.response.text());

        } catch (e) {

            console.error(e);

            setAnswer("Wystąpił błąd podczas komunikacji z AI.");

        }

        setLoading(false);

    }

    return (

        <div className="max-w-5xl mx-auto">

            <h1 className="text-4xl font-bold">

                AI Stylistka

            </h1>

            <p className="text-gray-500 mt-2">

                AI korzysta z ubrań zapisanych w Twojej garderobie.

            </p>

            <textarea

                value={question}

                onChange={(e)=>setQuestion(e.target.value)}

                rows={5}

                className="w-full mt-8 border rounded-xl p-4"

                placeholder="Np. Stwórz outfit na wesele..."

            />

            <button

                onClick={askAI}

                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"

            >

                Zapytaj AI

            </button>

            {loading && (

                <div className="mt-6">

                    🤖 AI analizuje garderobę...

                </div>

            )}

            {answer && (

                <div className="mt-8 bg-white rounded-xl shadow p-6 whitespace-pre-wrap">

                    {answer}

                </div>

            )}

        </div>

    );

}