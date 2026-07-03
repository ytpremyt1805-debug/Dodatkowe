export default function StatCard({

    title,

    value,

    icon,

    color

}) {

    return (

        <div className="bg-white rounded-xl shadow-sm border p-3 min-h-[110px] hover:shadow-md transition">

            <div className="text-lg">

                {icon}

            </div>

            <div
                className={`text-2xl font-bold mt-2 ${color}`}
            >

                {value}

            </div>

            <div className="text-sm text-gray-500 mt-1">

                {title}

            </div>

        </div>

    );

}