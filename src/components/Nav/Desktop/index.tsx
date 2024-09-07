import { useRef } from "react"
// import { useRouter } from "next/router"
// import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdWbSunny } from "react-icons/md"
import {
  Button,
  HStack,
  Icon,
  MenuButton,
  Text,
  useColorModeValue,
  useDisclosure,
  useEventListener,
} from "@chakra-ui/react"

import { IconButton } from "@/components/Buttons"

type DesktopNavMenuProps = {
  toggleColorMode: () => void
}

const DesktopNavMenu = ({ toggleColorMode }: DesktopNavMenuProps) => {
  const languagePickerState = useDisclosure()
  const languagePickerRef = useRef<HTMLButtonElement>(null)

  const ThemeIcon = useColorModeValue(<MdBrightness2 />, <MdWbSunny />)
  const themeIconAriaLabel = useColorModeValue(
    "Switch to Dark Theme",
    "Switch to Light Theme"
  )

  /**
   * Adds a keydown event listener to toggle color mode (ctrl|cmd + \)
   * or open the language picker (\).
   * @param {string} event - The keydown event.
   */
  useEventListener("keydown", (e) => {
    if (e.key !== "\\") return
    e.preventDefault()
    if (e.metaKey || e.ctrlKey) {
      toggleColorMode()
    } else {
      if (languagePickerState.isOpen) return
      languagePickerRef.current?.click()
    }
  })

  return (
    <HStack hideBelow="md" gap="0">
      <IconButton
        transition="transform 0.5s, color 0.2s"
        icon={ThemeIcon}
        aria-label={themeIconAriaLabel}
        variant="ghost"
        isSecondary
        px={{ base: "2", xl: "3" }}
        _hover={{
          transform: "rotate(10deg)",
          color: "primary.hover",
        }}
        onClick={toggleColorMode}
      />
    </HStack>
  )
}

export default DesktopNavMenu
