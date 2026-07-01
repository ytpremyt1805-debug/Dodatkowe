import { NavLink } from "react-router-dom";
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

        <h1 className="text-2xl font-bold">

          OutfitMatch AI

        </h1>

        <p className="text-slate-400 text-sm mt-2">

          AI Personal Stylist

        </p>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition

                ${
                  isActive
                    ? "bg-indigo-600"
                    : "hover:bg-slate-800"
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

        Akademia Górnośląska

      </div>

    </aside>
  );
}