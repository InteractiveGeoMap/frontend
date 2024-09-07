import { useState } from "react"

export const useRadioGroupToggle = (initialValue = ''): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(initialValue)
  return [value, setValue]
}
