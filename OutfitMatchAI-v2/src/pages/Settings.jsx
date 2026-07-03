import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

export default function Settings() {

    const { user, updateUser } = useUser();

    const [form, setForm] = useState(user);

    useEffect(() => {
        setForm(user);
    }, [user]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const saveSettings = () => {

        updateUser(form);

        alert("✅ Ustawienia zostały zapisane.");

    };

    return (

        <div className="max-w-4xl mx-auto">

            <h1 className="text-4xl font-bold">

                Ustawienia

            </h1>

            <p className="text-gray-500 mt-2">

                Dane zostaną wykorzystane do tworzenia wizualizacji outfitów przez AI.

            </p>

            <div className="bg-white rounded-xl shadow p-8 mt-8 space-y-6">

                <div>

                    <label className="font-semibold">

                        Płeć

                    </label>

                    <select

                        name="gender"

                        value={form.gender}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3 mt-2"

                    >

                        <option value="">Wybierz</option>
                        <option>Kobieta</option>
                        <option>Mężczyzna</option>

                    </select>

                </div>

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <label className="font-semibold">

                            Wzrost (cm)

                        </label>

                        <input

                            type="number"

                            name="height"

                            value={form.height}

                            onChange={handleChange}

                            className="w-full border rounded-lg p-3 mt-2"

                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Waga (kg)

                        </label>

                        <input

                            type="number"

                            name="weight"

                            value={form.weight}

                            onChange={handleChange}

                            className="w-full border rounded-lg p-3 mt-2"

                        />

                    </div>

                </div>

                <div>

                    <label className="font-semibold">

                        Typ sylwetki

                    </label>

                    <select

                        name="bodyType"

                        value={form.bodyType}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3 mt-2"

                    >

                        <option value="">Wybierz</option>
                        <option>Slim</option>
                        <option>Regular</option>
                        <option>Athletic</option>
                        <option>Plus Size</option>

                    </select>

                </div>

                <div className="grid grid-cols-3 gap-6">

                    <div>

                        <label className="font-semibold">

                            Rozmiar góry

                        </label>

                        <input

                            name="topSize"

                            value={form.topSize}

                            onChange={handleChange}

                            className="w-full border rounded-lg p-3 mt-2"

                            placeholder="M"

                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Rozmiar spodni

                        </label>

                        <input

                            name="bottomSize"

                            value={form.bottomSize}

                            onChange={handleChange}

                            className="w-full border rounded-lg p-3 mt-2"

                            placeholder="38"

                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Rozmiar buta

                        </label>

                        <input

                            name="shoeSize"

                            value={form.shoeSize}

                            onChange={handleChange}

                            className="w-full border rounded-lg p-3 mt-2"

                            placeholder="39"

                        />

                    </div>

                </div>

                <div className="grid grid-cols-3 gap-6">

                    <div>

                        <label className="font-semibold">

                            Kolor skóry

                        </label>

                        <select

                            name="skinTone"

                            value={form.skinTone}

                            onChange={handleChange}

                            className="w-full border rounded-lg p-3 mt-2"

                        >

                            <option value="">Wybierz</option>
                            <option>Jasna</option>
                            <option>Średnia</option>
                            <option>Ciemna</option>

                        </select>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Kolor włosów

                        </label>

                        <select

                            name="hairColor"

                            value={form.hairColor}

                            onChange={handleChange}

                            className="w-full border rounded-lg p-3 mt-2"

                        >

                            <option value="">Wybierz</option>
                            <option>Blond</option>
                            <option>Brązowe</option>
                            <option>Czarne</option>
                            <option>Rude</option>
                            <option>Siwe</option>

                        </select>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Długość włosów

                        </label>

                        <select

                            name="hairLength"

                            value={form.hairLength}

                            onChange={handleChange}

                            className="w-full border rounded-lg p-3 mt-2"

                        >

                            <option value="">Wybierz</option>
                            <option>Krótkie</option>
                            <option>Średnie</option>
                            <option>Długie</option>

                        </select>

                    </div>

                </div>

                <button

                    onClick={saveSettings}

                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg"

                >

                    💾 Zapisz ustawienia

                </button>

            </div>

        </div>

    );

}