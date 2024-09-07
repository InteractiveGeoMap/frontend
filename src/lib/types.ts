import type { ReactNode } from "react"

// Credit: https://stackoverflow.com/a/52331580
export type Unpacked<T> = T extends (infer U)[] ? U : T

export type ChildOnlyProp = { children?: ReactNode }

export type Root = {
  children: ReactNode
  contentIsOutdated: boolean
  contentNotTranslated: boolean
  lastDeployLocaleTimestamp: string
}


export type Lang =
  | "en"
  | "am"
  | "ar"
  | "az"
  | "be"
  | "bg"
  | "bn"
  | "bs"
  | "ca"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "es"
  | "fa"
  | "fi"
  | "fil"
  | "fr"
  | "gl"
  | "gu"
  | "he"
  | "hi"
  | "hr"
  | "hu"
  | "hy-am"
  | "id"
  | "ig"
  | "it"
  | "ja"
  | "ka"
  | "kk"
  | "km"
  | "kn"
  | "ko"
  | "lt"
  | "ml"
  | "mr"
  | "ms"
  | "nb"
  | "ne-np"
  | "nl"
  | "pcm"
  | "ph"
  | "pl"
  | "pt"
  | "pt-br"
  | "ro"
  | "ru"
  | "se"
  | "sk"
  | "sl"
  | "sr"
  | "sw"
  | "ta"
  | "te"
  | "th"
  | "tk"
  | "tr"
  | "uk"
  | "ur"
  | "uz"
  | "vi"
  | "zh"
  | "zh-tw"

export type LoadingState<T> =
  | { loading: true }
  | { loading: false; data: T }
  | { loading: false; error: unknown }

/**
 * File contributors
 */
export type FileContributorsState = LoadingState<Author[]>

export type LastUpdatedState = LoadingState<string>


// GitHub contributors

export type Commit = {
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
  }
  author: {
    avatar_url: string
    login: string
    html_url: string
  }
}

export type Author = {
  name: string
  email: string
  avatarUrl: string
  user: {
    login: string
    url: string
  }
}

export type FileContributor = {
  login: string
  avatar_url: string
  html_url: string
  date?: string
}

type FilePath = string
export type CommitHistory = Record<FilePath, FileContributor[]>


export interface DropdownOption {
  label: string
  value: string
  filterKey: string
  category: string
}

// Footer
export type FooterLink = {
  to: string
  text: string
  isPartiallyActive?: boolean
}

export type FooterLinkSection = {
  title: string
  links: FooterLink[]
}

// GitHub API
export type GHIssue = {
  title: string
  html_url: string
  created_at: string
  user: {
    login: string
    html_url: string
    avatar_url: string
  }
  labels: GHLabel[]
}

export type GHLabel = {
  id: number
  name: string
  color: string
}
