import type { InputProps } from "@headlessui/react"
import InputField from "./InputField"

type TextFieldProps = Omit<
  InputProps,
  | "name"
  | "type"
  | "value"
  | "onChange"
  | "invalid"
  | "aria-required"
  | "aria-invalid"
  | "aria-disabled"
  | "aria-errormessage"
  | "as"
  | "children"
> &
  Readonly<{
    name: string
    label: string
    error?: string
  }>

export default function TextField(props: TextFieldProps) {
  return <InputField {...props} />
}
