import { SVGProps } from "react";

export function TreeOfLifeSVG(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 600"
            fill="none"
            {...props}
        >
            <defs>
                <radialGradient
                    id="tree_glow"
                    cx="300"
                    cy="300"
                    r="250"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#B8952F" stopOpacity="0.15" />
                    <stop offset="1" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Ambient background glow */}
            <circle cx="300" cy="300" r="250" fill="url(#tree_glow)" />

            {/* Base Roots */}
            <path
                d="M300 550 C250 500 200 480 280 400 M300 550 C350 500 400 480 320 400 M260 520 C220 480 250 450 285 415 M340 520 C380 480 350 450 315 415"
                stroke="#B8952F"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
            />

            {/* Trunk */}
            <path
                d="M280 400 C270 300 270 250 290 200 M320 400 C330 300 330 250 310 200"
                stroke="#B8952F"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                opacity="0.65"
            />
            <path
                d="M280 400 Q300 350 320 400"
                stroke="#B8952F"
                strokeWidth="4"
                fill="none"
                opacity="0.4"
            />

            {/* Branches */}
            <g stroke="#B8952F" strokeLinecap="round" fill="none" opacity="0.6">
                {/* Left branches */}
                <path d="M290 200 C240 150 150 180 100 120" strokeWidth="4" />
                <path d="M280 250 C220 200 180 220 120 160" strokeWidth="3" />
                <path d="M290 320 C240 280 200 300 140 220" strokeWidth="2.5" />
                <path d="M230 158 C180 120 140 140 100 80" strokeWidth="2" />

                {/* Right branches */}
                <path d="M310 200 C360 150 450 180 500 120" strokeWidth="4" />
                <path d="M320 250 C380 200 420 220 480 160" strokeWidth="3" />
                <path d="M310 320 C360 280 400 300 460 220" strokeWidth="2.5" />
                <path d="M370 158 C420 120 460 140 500 80" strokeWidth="2" />

                {/* Center/Top branches */}
                <path d="M300 200 C280 120 320 80 300 40" strokeWidth="3.5" />
                <path d="M300 140 C250 80 280 60 250 20" strokeWidth="2" />
                <path d="M300 140 C350 80 320 60 350 20" strokeWidth="2" />
            </g>

            {/* Nodes / Stars on branches */}
            <g fill="#0F1B3D" opacity="0.35">
                <circle cx="100" cy="120" r="4" />
                <circle cx="120" cy="160" r="3" />
                <circle cx="140" cy="220" r="3.5" />
                <circle cx="100" cy="80" r="2.5" />

                <circle cx="500" cy="120" r="4" />
                <circle cx="480" cy="160" r="3" />
                <circle cx="460" cy="220" r="3.5" />
                <circle cx="500" cy="80" r="2.5" />

                <circle cx="300" cy="40" r="4.5" />
                <circle cx="250" cy="20" r="3" />
                <circle cx="350" cy="20" r="3" />

                {/* Inner nodes */}
                <circle cx="230" cy="158" r="3" />
                <circle cx="370" cy="158" r="3" />
                <circle cx="300" cy="140" r="3.5" />
            </g>
        </svg>
    );
}
