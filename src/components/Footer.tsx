import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"
import { IoChevronUpSharp } from "react-icons/io5"
import {
  Box,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"

import type { FooterLink, FooterLinkSection } from "@/lib/types"

import { BaseLink } from "@/components/Link"

import { scrollIntoView } from "@/lib/utils/scrollIntoView"

import { Button } from "./Buttons"

const socialLinks = [
  {
    icon: FaGithub,
    to: "https://github.com/ethereum/ethereum-org-website",
    ariaLabel: "GitHub",
  },
  {
    icon: FaTwitter,
    to: "https://twitter.com/ethdotorg",
    ariaLabel: "Twitter",
  },
  {
    icon: FaDiscord,
    to: "https://discord.gg/ethereum-org",
    ariaLabel: "Discord",
  },
]

type FooterProps = {
  lastDeployLocaleTimestamp?: string
}

/**
 * Footer is currently not used in globe eth project
 * Custom Built Footer taken from ethereum.org github strip of i18n for possible future usage.
 *
 * @see {@link https://github.com/ethereum/ethereum-org-websites}
 *
 */
const Footer = ({ lastDeployLocaleTimestamp }: FooterProps) => {
  // const Footer = () => {

  // const linkSections: FooterLinkSection[] = [
  //   {
  //     title: "learn",
  //     links: [
  //       {
  //         to: "/learn/",
  //         text: "learn-hub",
  //       },
  //       {
  //         to: "/what-is-ethereum/",
  //         text: "what-is-ethereum",
  //       }, //...
  //     ],
  //   },
  //   {
  //     title: "use",
  //     links: [
  //       {
  //         to: "/guides/",
  //         text: "guides",
  //       },
  //       {
  //         to: "/wallets/find-wallet/",
  //         text: "nav-find-wallet-label",
  //       }, //...
  //     ],
  //   },
  //   {
  //     title: "build",
  //     links: [
  //       {
  //         to: "/developers/",
  //         text: "nav-builders-home-label",
  //         isPartiallyActive: false,
  //       },
  //       {
  //         to: "/developers/tutorials/",
  //         text: "tutorials",
  //       }, //...
  //     ],
  //   },
  //   {
  //     title: "participate",
  //     links: [
  //       {
  //         to: "/community/",
  //         text: "community-hub",
  //       },
  //       {
  //         to: "/community/online/",
  //         text: "ethereum-online",
  //       }, //...
  //     ],
  //   },
  //   {
  //     title: "research",
  //     links: [
  //       {
  //         to: "/whitepaper/",
  //         text: "ethereum-whitepaper",
  //       },
  //       {
  //         to: "/roadmap/",
  //         text: "ethereum-roadmap",
  //       }, //...
  //     ],
  //   },
  // ]

  // const dipperLinks: FooterLink[] = [
  //   {
  //     to: "/about/",
  //     text: "about-us",
  //   },
  //   {
  //     to: "/assets/",
  //     text: "ethereum-brand-assets",
  //   }, //...
  // ]

  const hoverStyles = {
    textDecor: "none",
    color: "primary.base",
    _after: {
      color: "primary.base",
    },
    "& svg": {
      fill: "primary.base",
    },
  }

  const linkProps = {
    isPartiallyActive: false,
    textDecor: "none",
    color: "body.medium",
    fontWeight: "normal",
    _hover: hoverStyles,
    sx: {
      "& svg": {
        fill: "body.medium",
      },
    },
  }

  return (
    <Box as="footer" py="4" px="8">
      <Flex
        justify={{ base: "center", md: "space-between" }}
        alignItems="center"
        flexWrap="wrap"
        gap={8}
        pt={4}
        pb={4}
        borderTop={"1px solid"}
        borderColor={"body.light"}
      >
        <Text fontSize={"sm"} fontStyle={"italic"} color={"body.medium"}>
          {lastDeployLocaleTimestamp}
        </Text>

        <Button
          leftIcon={<IoChevronUpSharp />}
          variant="outline"
          isSecondary
          onClick={() => scrollIntoView("__next")}
        >
          Go to top
        </Button>
      </Flex>

      <SimpleGrid
        gap={4}
        justifyContent="space-between"
        templateColumns={{
          base: "auto",
          sm: "repeat(2, auto)",
          md: "repeat(3, auto)",
          xl: "repeat(6, auto)",
        }}
      >
        {/* {linkSections.map((section: FooterLinkSection, idx) => (
          <Box key={idx}>
            <Heading as="h3" fontSize="sm" lineHeight="base" my="1.14em">
              {section.title}
            </Heading>
            <List fontSize="sm" lineHeight="base" fontWeight="normal" m="0">
              {section.links.map((link, linkIdx) => (
                <ListItem key={linkIdx} mb={4}>
                  <BaseLink href={link.to} {...linkProps}>
                    {link.text}
                  </BaseLink>
                </ListItem>
              ))}
            </List>
          </Box>
        ))} */}
      </SimpleGrid>
      <Flex
        p={6}
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        fontSize="sm"
        bg="background.highlight"
      >
        <Box display="flex" gap={4}>
          {socialLinks.map(({ to, ariaLabel, icon }) => (
            <BaseLink
              key={to}
              href={to}
              hideArrow
              color="body.base"
              aria-label={ariaLabel}
              _focus={{ color: "primary.base" }}
            >
              <Icon
                as={icon}
                _hover={{
                  transition:
                    "color 0.2s ease-in-out, transform 0.2s ease-in-out",
                }}
                fontSize="4xl"
              />
            </BaseLink>
          ))}
        </Box>
        {/* <List
          display="flex"
          flexDir={{ base: "column", sm: "row" }}
          flexWrap="wrap"
          justifyContent={{ base: "center", sm: "space-between", md: "center" }}
          fontWeight="normal"
          fontSize="sm"
          p={5}
          m={0}
        >
          {dipperLinks.map(({ to, text }) => (
            <ListItem key={text} textAlign="center" px="2">
              <BaseLink href={to} w={["100%", null]} {...linkProps}>
                {text}
              </BaseLink>
            </ListItem>
          ))}
        </List> */}
      </Flex>
    </Box>
  )
}

export default Footer
