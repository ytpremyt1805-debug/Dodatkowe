import { useContext } from "react";

import { WardrobeContext } from "../contexts/WardrobeContext";

export default function useWardrobe() {

    return useContext(WardrobeContext);

}