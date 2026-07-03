import { NavLink } from "react-router-dom";

import aiStylist from "../../assets/ai-stylist.png";

import {
  LayoutDashboard,
  Shirt,
  MessageCircle,
  Heart,
  Settings,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Garderoba",
    path: "/wardrobe",
    icon: Shirt,
  },
  {
    name: "Stylistka AI",
    path: "/chat",
    icon: MessageCircle,
  },
  {
    name: "Ulubione",
    path: "/favorites",
    icon: Heart,
  },
  {
    name: "Ustawienia",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">

      <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 rounded-3xl p-6 shadow-2xl">

  <img
    src={aiStylist}
    alt="AI Stylist"
    className="w-full rounded-3xl shadow-2xl"
/>

    <h1 className="text-2xl font-bold text-center mt-2">

        OutfitMatch AI

    </h1>

    <p className="text-center text-indigo-100 text-sm mt-1">

        Personal AI Stylist

    </p>

    <div className="flex justify-center items-center gap-2 mt-5">

        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"/>

        <span className="text-sm">

            Online

        </span>

    </div>

</div>

</div>

      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300

    ${
        isActive
            ? "bg-indigo-600 shadow-lg scale-[1.02]"
            : "hover:bg-slate-800 hover:translate-x-1"
    }`
}
            >

              <Icon size={20} />

              {item.name}

            </NavLink>

          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700 text-xs text-slate-500">

        <div className="text-center">

    <p className="font-semibold">

        OutfitMatch AI

    </p>

    <p className="mt-1">

        Powered by Gemini 2.5 Flash

    </p>

</div>

      </div>

    </aside>
  );
}
