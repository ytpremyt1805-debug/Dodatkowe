import { useRef, useState } from "react";
import useWardrobe from "../../hooks/useWardrobe";
import { analyzeClothing } from "../../services/geminiService";

export default function UploadClothing() {

    const fileRef = useRef();

    const { addClothing } = useWardrobe();

    const [loading, setLoading] = useState(false);

    const [preview, setPreview] = useState(null);

    const [analysis, setAnalysis] = useState(null);

    const handleFile = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setPreview(URL.createObjectURL(file));

        setLoading(true);

        try {

            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            const result = await analyzeClothing(file, apiKey);
            result.category = result.category?.toLowerCase().trim();

            setAnalysis(result);

        } catch (err) {

            alert("Błąd analizy zdjęcia.");

            console.error(err);

        }

        setLoading(false);

    };

    const saveClothing = () => {

        addClothing({

            id: Date.now(),

            image: preview,

            description: analysis,

            createdAt: new Date()

        });

        setPreview(null);

        setAnalysis(null);

    };

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">

                Dodaj nowe ubranie

            </h2>

            <button

                onClick={() => fileRef.current.click()}

                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"

            >

                📷 Wybierz zdjęcie

            </button>

            <input

                hidden

                ref={fileRef}

                type="file"

                accept="image/*"

                onChange={handleFile}

            />

            {loading && (

                <div className="mt-6">

                    🤖 Analizuję zdjęcie...

                </div>

            )}

            {preview && (

                <img

                    src={preview}

                    className="mt-6 rounded-lg w-64"

                />

            )}

            {analysis && (

                <div className="mt-6 border rounded-lg p-4">

                    <h3 className="font-bold mb-2">

                        Wynik analizy

                    </h3>

                    <p><b>Typ:</b> {analysis.type}</p>

                    <p><b>Kolor:</b> {analysis.color}</p>

                    <p><b>Styl:</b> {analysis.style}</p>

                    <p><b>Materiał:</b> {analysis.material}</p>

                    <p><b>Sezon:</b> {analysis.season}</p>

                    <p><b>Okazja:</b> {analysis.occasion}</p>

                    <p><b>Elegancja:</b> {analysis.elegance}/10</p>

                    <button

                        onClick={saveClothing}

                        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"

                    >

                        ✅ Zapisz do garderoby

                    </button>

                </div>

            )}

        </div>

    );

}