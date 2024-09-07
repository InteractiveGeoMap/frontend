import { useRouter } from "next/router"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { Icon,type IconProps } from "@chakra-ui/react"


const NextChevron = (props: IconProps) => {
  return <Icon as={ MdChevronLeft } {...props} />
}

export default NextChevron
