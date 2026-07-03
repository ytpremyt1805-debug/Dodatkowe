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

koszule
bluzki
swetry
marynarki
okrycia
spodnie
jeansy
spódnice
sukienki
buty
akcesoria

Pole "type" ma być pełnym opisem ubrania.

Przykład:

category: "spodnie"
type: "Spodenki cargo"

category: "buty"
type: "Brązowe półbuty"

category: "koszula"
type: "Koszula slim fit"
    
Klasyfikacja:

- Koszule eleganckie i casual → koszule
- Bluzka damska → bluzki
- Kardigan i sweter → swetry
- Marynarka i żakiet → marynarki
- Płaszcz, kurtka, trencz, parka, kamizelka → okrycia
- Chinosy, spodnie materiałowe, garniturowe → spodnie
- Jeansy → jeansy
- Spódnice → spódnice
- Sukienki → sukienki
- Wszystkie rodzaje obuwia → buty
- Pasek, krawat, muszka, czapka, szalik, rękawiczki, torebka, plecak, biżuteria, okulary → akcesoria

Pole "category" MUSI zawierać dokładnie jedną z podanych wartości.
Nie wolno tworzyć własnych kategorii ani używać innych nazw.

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

    const data = JSON.parse(
    result.response.text()
);

data.category = normalizeCategory(data.type);

return data;

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
function normalizeCategory(type) {

    const t = type.toLowerCase();

    if (t.includes("koszula"))
        return "koszule";

    if (
        t.includes("t-shirt") ||
        t.includes("tshirt") ||
        t.includes("koszulka") ||
        t.includes("bluzka") ||
        t.includes("top")
    )
        return "bluzki";

    if (
        t.includes("sweter") ||
        t.includes("kardigan")||
        t.includes("golf")
    )
        return "swetry";

    if (
        t.includes("marynarka") ||
        t.includes("żakiet")
        
    )
        return "marynarki";

    if (
        t.includes("kurtka") ||
        t.includes("płaszcz") ||
        t.includes("trencz")||
        t.includes("parka")

    )
        return "okrycia";

    if (t.includes("jeans"))
        return "jeansy";

    if (
        t.includes("spodnie") ||
        t.includes("chinos") ||
        t.includes("bojówki")
    )
        return "spodnie";

    if (t.includes("spódnica"))
        return "spódnice";

    if (t.includes("sukienka"))
        return "sukienki";

    if (
            t.includes("but") ||
    t.includes("sneaker") ||
    t.includes("tramp") ||
    t.includes("adidas") ||
    t.includes("nike") ||
    t.includes("balet") ||
    t.includes("sanda") ||
    t.includes("szpil") ||
    t.includes("czół") ||
    t.includes("mule") ||
    t.includes("klapk") ||
    t.includes("mokas") ||
    t.includes("loafer") ||
    t.includes("kozak") ||
    t.includes("botek")
    )
        return "buty";

    if (
        t.includes("torebka") ||
        t.includes("torba") ||
        t.includes("plecak") ||
        t.includes("zegarek") ||
        t.includes("okulary") ||
        t.includes("pasek") ||
        t.includes("czapka") ||
        t.includes("kapelusz")||
        t.includes("kolczy")||
        t.includes("naszyj")||
        t.includes("branso")||
        t.includes("pierś")||
        t.includes("biżuter")
    )
        return "akcesoria";

    return "inne";

}