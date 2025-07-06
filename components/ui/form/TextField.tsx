import type { InputProps } from "@headlessui/react"
import InputField from "./InputField"

type TextFieldProps = Omit<
  InputProps,
  | "className"
  | "type"
  | "onChange"
  | "invalid"
  | "aria-invalid"
  | "aria-required"
  | "aria-errormessage"
> &
  Readonly<{
    label: string
    error?: string
  }>

export default function TextField(props: TextFieldProps) {
  return <InputField {...props} />
}
