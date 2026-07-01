export default function StatCard({

    title,

    value,

    icon,

    color

}) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="text-4xl">

                {icon}

            </div>

            <div
                className={`text-4xl font-bold mt-4 ${color}`}
            >

                {value}

            </div>

            <div className="text-gray-500 mt-2">

                {title}

            </div>

        </div>

    );

}