'use client'

// import dynamic from "next/dynamic"
// import { useRouter } from "next/router"
import { Container } from "@chakra-ui/react"

import type { Root } from "@/lib/types"

import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import { SkipLink } from "@/components/SkipLink"

import { lightTheme as oldTheme } from "../theme"

export const RootLayout = ({
  children,
  // contentIsOutdated,
  // contentNotTranslated,
  // lastDeployLocaleTimestamp,
}: Root) => {

  return (
    // <Container mx="auto" maxW={oldTheme.variables.maxPageWidth}>
    <Container mx="auto" maxW={"1980px"} >
      <SkipLink />

      <Nav />
      {children}

      {/* <Footer lastDeployLocaleTimestamp={lastDeployLocaleTimestamp} /> */}
      {/* <Footer/> */}

    </Container>
  )
}
