
import {
  darkTheme as oldDarkTheme,
  lightTheme as oldLightTheme,
} from "../theme"

/** @deprecated */
const oldLightThemeColors = oldLightTheme.colors
const oldDarkThemeColors = oldDarkTheme.colors
/**
 * @deprecated
 *
 * define each of the old colors as a `semanticToken`:
 * `name: { _light: lightColor, _dark: darkColor }`
 */
const oldColors = Object.keys(oldLightThemeColors).reduce((colors, color) => {
  const lightColor = oldLightThemeColors[color]
  const darkColor = oldDarkThemeColors[color]

  if (typeof lightColor !== "string" || typeof darkColor !== "string") {
    return colors
  }

  return {
    ...colors,
    [color]: { _light: lightColor, _dark: darkColor },
  }
}, {})

const semanticTokens = {
  colors: {
    // define old colors from the old theme as semanticTokens to transition
    // from emotion components to chakra
    // TODO: remove these colors as we migrate away from them
    // For Globe: Have to slowly change custom components from ethereum.org to globe theme
    // including oldcolors
    ...oldColors,

    // Design System colors

    // Main Set
    primary: {
      base: { _light: "lotusBlue.500", _dark: "lotusBlue.500" },
      highContrast: { _light: "lotusBlue.800", _dark: "lotusBlue.100" },
      lowContrast: { _light: "blue.100", _dark: "lotusBlue.800" },
      hover: { _light: "lotusBlue.400", _dark: "lotusBlue.400" },
      visited: { _light: "lotusBlue.700", _dark: "lotusBlue.550" },
    //   white: { _light: "white", _dark: "white" },
      text: { _light: "mirage.900", _dark: "white" },

      // Globe project colors placeholder
      globebase:{ _light: "gray.900", _dark: "orange.500" },
      globehover:{ _light: "gray.500", _dark: "orange.400" },

      // ! Deprecating primary.light
      light: { _light: "lotusBlue.100", _dark: "lotusBlue.100" },
      // ! Deprecating primary.dark
      dark: { _light: "lotusBlue.700", _dark: "lotusBlue.800" },
      // ! Deprecating primary.pressed
      pressed: { _light: "lotusBlue.400", _dark: "lotusBlue .800" },
    },
    body: {
      base: { _light: "gray.800", _dark: "gray.100" },
    //   base: { _light: "#F5F5F5", _dark: "#363B58" },
      medium: { _light: "gray.500", _dark: "gray.400" },
    //   light: { _light: "gray.200", _dark: "gray.600" },
      light: { _light: "#F5F5F5", _dark: "#363B58" },
      // ! Deprecating body.inverted
      inverted: { _light: "gray.100", _dark: "gray.800" },
    },
    background: {
      base: { _light: "white", _dark: "mirage.800" },
      highlight: { _light: "mirage.100", _dark: "mirage.900" },
    },
    divider: {
        base: { _light: "#F0F5F9", _dark: "#363B58" },
    },
    disabled: { _light: "mirage.400", _dark: "mirage.500" },
    // ! Deprecating neutral
    neutral: { _light: "white", _dark: "mirage.900" },

    // Complementary Set
    attention: {
      base: "yellow.500",
      light: "yellow.200",
      outline: { _light: "attention.base", _dark: "attention.light" },
    },
    // ? Keep "error" or rename to "fail" ?
    error: {
      base: "red.500",
      light: "red.100",
      outline: { _light: "error.base", _dark: "error.light" },
      // ! Deprecating error.neutral
      neutral: { _light: "red.100", _dark: "red.900" },
    },
    success: {
      base: "green.500",
      light: "green.100",
      outline: { _light: "success.base", _dark: "success.light" },
      // ! Deprecating success.neutral
      neutral: { _light: "green.100", _dark: "green.900" },
    },

    // Misc
    tooltipShadow: {
      _light: "blackAlpha.400",
      _dark: "whiteAlpha.400",
    },
    switchBackground: { _light: "gray.300", _dark: "whiteAlpha.400" },
    hubHeroContentBg: {
      _light: "rgba(255, 255, 255, 0.80)",
      _dark: "rgba(34, 34, 34, 0.80)",
    },
  },
  gradients: {
    bgMainGradient: {
      _light:
        "linear-gradient(102.7deg, rgba(185, 185, 241, 0.2) 0%, rgba(84, 132, 234, 0.2) 51.56%, rgba(58, 142, 137, 0.2) 100%)",
      _dark:
        "linear-gradient(102.7deg, rgba(185, 185, 241, 0.2) 0%, rgba(84, 132, 234, 0.2) 51.56%, rgba(58, 142, 137, 0.2) 100%)",
    },
  },
  shadows: {
    menu: {
      accordion:
        "0px 2px 2px 0px rgba(0, 0, 0, 0.12) inset, 0px -3px 2px 0px rgba(0, 0, 0, 0.14) inset",
    },
  },
}

// console.log(semanticTokens)

export default semanticTokens