import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL = "gemini-2.5-flash";

export async function analyzeClothing(file, apiKey) {

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({

        model: MODEL

    });

    const base64 = await fileToBase64(file);

    const prompt = `

Jesteś ekspertem od analizy ubrań.

Przeanalizuj JEDNO ubranie ze zdjęcia.

Nie opisuj tła.

Nie dodawaj komentarzy.

Nie używaj Markdown.

Zwróć WYŁĄCZNIE poprawny JSON.

Pole "category" może przyjmować WYŁĄCZNIE jedną z wartości:

koszula
spodnie
buty
marynarka
kurtka
bluza
t-shirt
sweter
sukienka
spódnica
garnitur
akcesoria

Pole "type" ma być pełnym opisem ubrania.

Przykład:

category: "spodnie"
type: "Spodenki cargo"

category: "buty"
type: "Brązowe półbuty"

category: "koszula"
type: "Koszula męska slim fit"
    
{
"category":"",
"type":"",
"color":"",
"style":"",
"material":"",
"season":"",
"occasion":"",
"elegance":0
}

`;

    const result = await model.generateContent([

        prompt,

        {

            inlineData:{

                mimeType:file.type,

                data:base64

            }

        }

    ]);

    return JSON.parse(

        result.response.text()

    );

}

function fileToBase64(file){

    return new Promise((resolve)=>{

        const reader=new FileReader();

        reader.onload=()=>{

            resolve(

                reader.result.split(",")[1]

            );

        };

        reader.readAsDataURL(file);

    });

}