const colors = require("tailwindcss/colors");

const heightConfiguration = {
    app: 0,
    "wave-one": 10,
    "wave-two": 20,
    "big-fish": 25,
    "wave-three": 30,
    "wave-four": 30,
    "wave-five": 30,
    "bottom-shadow": 40,
    top: 1000,
    header: 1200,
};

const waveColors = {
    "wave-one-color": "#0089D185",
    "wave-two-color": "#152dff85",
    "wave-three-color": "#006f7785",
    "wave-four-color": "#4545ab85",
    "wave-five-color": "#6666cc60",
};

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {

        extend: {
            screens:{
                "my-sm": "959.95px",
            },
            fontFamily: {
                aaargh: ["Aaargh"],
            },
            animation: {
                float: "float 1s ease-in-out infinite",
                'float-slow': "float 5s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%": {
                        transform: "translatey(0px)",
                    },
                    "50%": {
                        transform: "translatey(-20px)",
                    },
                    "100%": {
                        transform: "translatey(0px)",
                    },
                },
            },
            zIndex: {
                ...heightConfiguration,
            },
        },
        colors: {
            ...waveColors,
            "top-gradient-start": "#bc94f8",
            "via-gradient": "#bc9cca",
            "background-main": "#484CB4",
            transparent: "transparent",
            black: colors.black,
            white: colors.white,
            gray: colors.trueGray,
            indigo: colors.indigo,
            red: colors.rose,
            yellow: colors.amber,
            golden: "#ffff99",
            primary: "#ffffff",
            secondary: "#01D63C",
            "bg-footer": "#d4a8ad",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
