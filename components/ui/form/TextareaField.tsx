import { useEffect, useRef } from "react"
import {
  Textarea,
  Field,
  type TextareaProps,
  type FieldProps,
} from "@headlessui/react"
import clsx from "clsx"
import Label from "./Label"
import ErrorMessage from "./ErrorMessage"

type TextareaFieldProps = Omit<
  TextareaProps,
  | "className"
  | "name"
  | "value"
  | "onChange"
  | "invalid"
  | "aria-required"
  | "aria-invalid"
  | "aria-disabled"
  | "aria-errormessage"
> &
  Pick<FieldProps, "className"> &
  Readonly<{
    name: string
    label: string
    error?: string
  }>

export default function TextareaField({
  className,
  name,
  disabled,
  required,
  label,
  error,
  ...props
}: TextareaFieldProps) {
  // set up refs to use the textarea as uncontrolled, thus avoiding rerenders when value changes
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const valueRef = useRef<string>()

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    valueRef.current = event.target.value
  }

  /*
    Set textarea value using the stored value.

    We don't use the textarea's "value" prop to set the value directly because components are supposed to be pure
    functions, meaning the JSX should always be the same for the same inputs (props, state and context).
  */
  useEffect(() => {
    if (valueRef.current !== undefined) {
      textareaRef.current!.value = valueRef.current
    }
  })

  const errorMessageId = `${name}-error-message`

  return (
    <Field className={clsx("group", className)} disabled={disabled}>
      <Label label={label} required={required} />
      <Textarea
        ref={textareaRef}
        name={name}
        className="mt-1 block w-full resize-none rounded-lg border border-solid border-[var(--border)] bg-[var(--main-background)] px-3 py-1.5 text-sm/6 data-[invalid]:border-red-500 data-[disabled]:border-opacity-50 data-[disabled]:bg-[var(--secondary-background)]"
        onChange={onChange}
        invalid={!!error}
        aria-required={required}
        aria-errormessage={errorMessageId}
        {...props}
      />
      {error && <ErrorMessage id={errorMessageId} message={error} />}
    </Field>
  )
}
