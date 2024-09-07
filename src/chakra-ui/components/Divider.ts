import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const baseStyle = defineStyle({
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'divider.base',
})

export const Divider = defineStyleConfig({
  baseStyle,
})
