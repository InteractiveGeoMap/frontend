import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { RxExternalLink } from "react-icons/rx"
import {
  forwardRef,
  Icon,
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
  type StyleProps,
  VisuallyHidden,
} from "@chakra-ui/react"

import { getRelativePath } from "@/lib/utils/relativePath"
import * as url from "@/lib/utils/url"

import { DISCORD_PATH, SITE_URL } from "@/lib/constants"


type BaseProps = {
  /** @deprecated Use `href` prop instead */
  to?: string
  href?: string
  hideArrow?: boolean
  isPartiallyActive?: boolean
  activeStyle?: StyleProps
}

export type LinkProps = BaseProps &
  ChakraLinkProps &
  Omit<NextLinkProps, "as" | "legacyBehavior" | "passHref" | "href">

/**
 * Link wrapper which handles:
 *
 * - Hashed links
 * e.g. <Link href="/page-2/#specific-section">
 *
 * - External links
 * e.g. <Link href="https://example.com/">
 *
 * - PDFs & static files (which open in a new tab)
 * e.g. <Link href="/eth-whitepaper.pdf">
 */
export const BaseLink = forwardRef(function Link(
  {
    to,
    href: hrefProp,
    children,
    hideArrow,
    isPartiallyActive = true,
    activeStyle = { color: "primary.base" },
    ...props
  }: LinkProps,
  ref
) {
  const asPath = usePathname()

  let href = (to ?? hrefProp) as string

  const isActive = url.isHrefActive(href, asPath, isPartiallyActive)
  const isDiscordInvite = url.isDiscordInvite(href)
  const isPdf = url.isPdf(href)
  const isExternal = url.isExternal(href)
  const isInternalPdf = isPdf && !isExternal
  const isHash = url.isHash(href)

  // Get proper download link for internally hosted PDF's & static files (ex: whitepaper)
  // Opens in separate window.
  if (isInternalPdf) {
    href = getRelativePath(asPath, href)
  }

  if (isDiscordInvite) {
    href = new URL(DISCORD_PATH, SITE_URL).href
  }

  const commonProps = {
    ref,
    ...props,
    ...(isActive && activeStyle),
    href,
  }

  if (isExternal) {
    return (
      <ChakraLink
        isExternal
        {...commonProps}
      >
        {children}
        <VisuallyHidden>(opens in a new tab)</VisuallyHidden>
        {!hideArrow && (
          <Icon
            as={RxExternalLink}
            boxSize="6"
            p="1"
            verticalAlign="middle"
            me="-1"
          />
        )}
      </ChakraLink>
    )
  }

  if (isInternalPdf) {
    return (
      <ChakraLink
        isExternal
        // disable locale prefixing for internal PDFs
        // TODO: add i18n support using a rehype plugin (similar as we do for
        // images)
        locale={false}
        {...commonProps}
        as={NextLink}
      >
        {children}
      </ChakraLink>
    )
  }

  if (isHash) {
    return (
      <ChakraLink
        {...commonProps}
      >
        {children}
      </ChakraLink>
    )
  }

  return (
    <ChakraLink
      {...commonProps}
      as={NextLink}
    >
      {children}
    </ChakraLink>
  )
})

const InlineLink = forwardRef((props: LinkProps, ref) => {
  return <BaseLink data-inline-link ref={ref} {...props} />
})

export default InlineLink
