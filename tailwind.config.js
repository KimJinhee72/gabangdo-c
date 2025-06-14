/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: ['max-[1090px]:hidden', 'max-[900px]:inline', 'max-[900px]:hidden','max-[510px]:block', 'max-[510px]:hidden', 'text-2xl', 'text-xl', '!ml-0.75'],
  theme: {
    extend: {
      colors: {
       
        "primary": "#3B71CA",  //=> 변경가능
      },
      spacing: {
        "login-container": "400px",
      },
      borderRadius: {
        login: "8px",
      },
      boxShadow: {
        login: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },      
    },
  },
  darkMode: "class", 
  plugins: [],
};
