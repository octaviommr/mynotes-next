import { Field, type InputProps } from "@headlessui/react"
import Label from "./Label"
import Input from "./Input"
import ErrorMessage from "./ErrorMessage"

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

const TextField = ({
  name,
  disabled,
  required,
  label,
  error,
  ...props
}: TextFieldProps) => {
  const errorMessageId = `${name}-error-message`

  return (
    <Field className="group" disabled={disabled}>
      <Label label={label} required={required} />
      <div className="mt-1">
        <Input
          name={name}
          invalid={!!error}
          required={required}
          errorMessageId={errorMessageId}
          {...props}
        />
      </div>
      {error && <ErrorMessage id={errorMessageId} message={error} />}
    </Field>
  )
}

export default TextField
