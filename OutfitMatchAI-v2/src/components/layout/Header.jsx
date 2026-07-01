export default function Header() {

  return (

    <header className="bg-white border-b h-20 px-8 flex items-center justify-between">

      <div>

        <h2 className="text-2xl font-bold">

          OutfitMatch AI

        </h2>

        <p className="text-sm text-gray-500">

          AI Stylistka • Gemini 2.5 Flash

        </p>

      </div>

      <div className="flex items-center gap-3">

        <div className="w-3 h-3 rounded-full bg-green-500"></div>

        <span className="text-sm">

          Online

        </span>

      </div>

    </header>

  );

}