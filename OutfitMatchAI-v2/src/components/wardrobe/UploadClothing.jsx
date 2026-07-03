import { useRef, useState } from "react";
import useWardrobe from "../../hooks/useWardrobe";
import { analyzeClothing } from "../../services/geminiService";

export default function UploadClothing() {

    const fileRef = useRef();

    const { addClothing } = useWardrobe();

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState("");

    const handleFiles = async (e) => {

        const files = Array.from(e.target.files);

        if (!files.length) return;

        setLoading(true);

        try {

            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            for (let i = 0; i < files.length; i++) {

                const file = files[i];

                setProgress(`Analizuję ${i + 1} z ${files.length} zdjęć...`);

                const result = await analyzeClothing(file, apiKey);

                result.category = result.category?.toLowerCase().trim();

                addClothing({

                    id: crypto.randomUUID(),

                    image: await fileToBase64(file),

                    description: result,
                    
                    favorite: false,


                    createdAt: new Date()

                });

            }

            alert(`✅ Dodano ${files.length} elementów do garderoby.`);

        } catch (err) {

            console.error(err);

            alert("Wystąpił błąd podczas analizy zdjęć.");

        }

        setLoading(false);
        setProgress("");

        e.target.value = "";

    };


function fileToBase64(file) {

    return new Promise((resolve) => {

        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);

        reader.readAsDataURL(file);

    });

}

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">

                Dodaj nowe ubrania

            </h2>

            <button

                onClick={() => fileRef.current.click()}

                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"

            >

                📷 Wybierz zdjęcia

            </button>

            <input

                hidden
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFiles}

            />

            {loading && (

                <div className="mt-6">

                    <div className="font-semibold">

                        🤖 {progress}

                    </div>

                    <div className="mt-3 w-full bg-gray-200 rounded-full h-3">

                        <div className="bg-indigo-600 h-3 rounded-full animate-pulse w-full"></div>

                    </div>

                </div>

            )}

        </div>

    );

}