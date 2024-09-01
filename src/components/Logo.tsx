import { useColorModeValue } from "@chakra-ui/react"

import { Image } from "@/components/Image"

import darkImage from "@/public/images/ef-logo.png"
import lightImage from "@/public/images/ef-logo-white.png"

const Logo = () => {
  const image = useColorModeValue(darkImage, lightImage)

  return (
    <Image src={image} h={100} w="auto" alt={"ethereum-foundation-logo"} />
  )
}

export default Logo
