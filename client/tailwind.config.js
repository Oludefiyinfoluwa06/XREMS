module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#191641",
        lightBlue: '#6662A6',
        tabIconBg: '#EFF4FB',
        gray: "#808080",
        lightGray: "#efefef",
        errorText: '#721c24',
        errorBg: '#f8d7da',
        transparentBlack: 'rgba(0,0,0,0.65)',
        transparentWhite: 'rgba(255,255,255,0.1)',
      },
      fontFamily: {
        rthin: ["Raleway-Thin", "sans-serif"],
        rextralight: ["Raleway-ExtraLight", "sans-serif"],
        rlight: ["Raleway-Light", "sans-serif"],
        rregular: ["Raleway-Regular", "sans-serif"],
        rmedium: ["Raleway-Medium", "sans-serif"],
        rsemibold: ["Raleway-SemiBold", "sans-serif"],
        rbold: ["Raleway-Bold", "sans-serif"],
        rextrabold: ["Raleway-ExtraBold", "sans-serif"],
        rblack: ["Raleway-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}

