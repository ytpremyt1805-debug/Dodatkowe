export default function AIStylistAvatar() {
    return (
        <svg
            viewBox="0 0 220 220"
            className="w-32 h-32 mx-auto drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>

                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">

                    <stop offset="0%" stopColor="#6366F1"/>

                    <stop offset="100%" stopColor="#8B5CF6"/>

                </linearGradient>

            </defs>

            <circle
                cx="110"
                cy="110"
                r="105"
                fill="url(#bg)"
            />

            <ellipse
                cx="110"
                cy="95"
                rx="44"
                ry="50"
                fill="#FFD9C2"
            />

            <path
                d="M65 95
                   C65 35 155 35 155 95
                   C155 60 145 40 110 35
                   C80 40 65 60 65 95"
                fill="#2D1B1B"
            />

            <circle
                cx="95"
                cy="95"
                r="3"
                fill="#222"
            />

            <circle
                cx="125"
                cy="95"
                r="3"
                fill="#222"
            />

            <path
                d="M100 118
                   Q110 125 120 118"
                stroke="#C86F6F"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <path
                d="M70 165
                   Q110 145 150 165
                   L165 220
                   L55 220Z"
                fill="#ffffff"
            />

            <path
                d="M78 165
                   L110 195
                   L142 165"
                fill="#7C3AED"
            />

            <circle
                cx="172"
                cy="48"
                r="14"
                fill="#10B981"
            />

            <path
                d="M172 42
                   V54
                   M166 48
                   H178"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
            />

        </svg>
    );
}