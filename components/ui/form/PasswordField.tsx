import { useState } from "react"
import { Field, Button, type InputProps } from "@headlessui/react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import Label from "./Label"
import Input from "./Input"
import ErrorMessage from "./ErrorMessage"

type PasswordFieldProps = Omit<
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

const PasswordField = ({
  name,
  disabled,
  required,
  label,
  error,
  ...props
}: PasswordFieldProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const errorMessageId = `${name}-error-message`

  return (
    <Field className="group" disabled={disabled}>
      <Label label={label} required={required} />
      <div className="relative mt-1">
        <Input
          name={name}
          type={passwordVisible ? "text" : "password"}
          invalid={!!error}
          required={required}
          errorMessageId={errorMessageId}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <Button
            className="data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
            onClick={() =>
              setPasswordVisible((previousValue) => !previousValue)
            }
            disabled={disabled}
          >
            {passwordVisible ? (
              <EyeSlashIcon className="size-6" />
            ) : (
              <EyeIcon className="size-6" />
            )}
          </Button>
        </div>
      </div>
      {error && <ErrorMessage id={errorMessageId} message={error} />}
    </Field>
  )
}

export default PasswordField
