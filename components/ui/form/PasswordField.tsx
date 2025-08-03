import { useState } from "react"
import type { InputProps } from "@headlessui/react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import InputField from "./InputField"

type PasswordFieldProps = Omit<
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

export default function PasswordField(props: PasswordFieldProps) {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <InputField
      type={passwordVisible ? "text" : "password"}
      adornment={{
        icon: passwordVisible ? EyeSlashIcon : EyeIcon,
        onClick: () => setPasswordVisible((previousValue) => !previousValue),
      }}
      {...props}
    />
  )
}
