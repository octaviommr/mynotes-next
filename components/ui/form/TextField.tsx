import type { InputProps, FieldProps } from "@headlessui/react"
import InputField from "./InputField"

type TextFieldProps = Omit<
  InputProps,
  | "className"
  | "name"
  | "type"
  | "value"
  | "onChange"
  | "invalid"
  | "aria-invalid"
  | "aria-required"
  | "aria-errormessage"
> &
  Pick<FieldProps, "className"> &
  Readonly<{
    name: string
    label: string
    error?: string
  }>

export default function TextField(props: TextFieldProps) {
  return <InputField {...props} />
}
