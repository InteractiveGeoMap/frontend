import { lazy, Suspense, useRef } from "react"
import { Box, Flex, Hide, Show, useDisclosure, Text, Button, Divider } from "@chakra-ui/react"

import { EthHomeIcon } from "@/components/icons"
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { BaseLink } from "@/components/Link"

import { isDesktop } from "@/lib/utils/isDesktop"

import { NAV_PY } from "@/lib/constants"

import DesktopNavMenu from "./Desktop"
import Menu from "./Menu"
import { useNav } from "./useNav"

import { useIsClient } from "@/hooks/useIsClient"
import DropdownMenu from "./DropdownMenu";

const MobileNavMenu = lazy(() => import("./Mobile"))

// TODO display page title on mobile
const Nav = () => {
  const { toggleColorMode, linkSections, mobileNavProps } = useNav()
  const navWrapperRef = useRef(null)
  const isClient = useIsClient()
  const isDesktopFlag = isDesktop()

  return (
    <>
    <Box position="sticky" top={0} zIndex="sticky" width="full">
      <Flex
        ref={navWrapperRef}
        as="nav"
        aria-label={"nav-primary"}
        bg="background.base"
        // borderBottom="1px"
        borderColor="rgba(0, 0, 0, 0.1)"
        height="4.0rem"
        justifyContent="center"
        py={NAV_PY}
        px={{ base: 4, xl: 8 }}
      >
        <Flex
          alignItems={{ base: "center", md: "normal" }}
          justifyContent={{ base: "space-between", md: "normal" }}
          width="full"
          // maxW="container.2xl"
        >
          <BaseLink
            href="/"
            aria-label={"home"}
            display="inline-flex"
            alignItems="center"
            textDecor="none"
          >
            <EthHomeIcon opacity={0.85} _hover={{ opacity: 1 }} />
          </BaseLink>
          <Text paddingX={"0.75rem"} fontSize={"2xl"}>Geo</Text>
          {/* Desktop */}
          <Flex
            w="full"
            justifyContent={{ base: "flex-end", md: "space-between" }}
            ms={{ base: 3, xl: 8 }}
          >
           
            {/* avoid rendering desktop Menu version on mobile */}

            {isClient && isDesktopFlag ? (
              <Menu hideBelow="md" sections={linkSections} />
            ) : (
              <Box />
            )}

            <Flex alignItems="center" /*  justifyContent="space-between" */>
              {/* Desktop */}
              {/* avoid rendering desktop menu version on mobile */}
              <Show above="md">
                <DesktopNavMenu toggleColorMode={toggleColorMode} />
              </Show>
              <Divider m="0.5rem" orientation='vertical' />
              <DropdownMenu/>
              {/* <Button rounded="full" p={1} variant={"body"} mx="1rem" ><IoEllipsisHorizontalSharp/></Button> */}
              {/* <Hide above="md"> */}
                {/* Mobile */}
                {/* use Suspense to display the Search & the Menu at the same time */}
                {/* <Suspense>
                  <MobileNavMenu
                    {...mobileNavProps}
                    linkSections={linkSections}
                    drawerContainerRef={navWrapperRef}
                  />
                </Suspense> */}
              {/* </Hide> */}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
    <Divider/>
    </>
  )
}

export default Nav
