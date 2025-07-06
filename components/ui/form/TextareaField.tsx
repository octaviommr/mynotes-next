import { useEffect, useRef } from "react"
import { Textarea, Field, type TextareaProps } from "@headlessui/react"
import Label from "./Label"
import ErrorMessage from "./ErrorMessage"

type TextareaFieldProps = Omit<
  TextareaProps,
  | "className"
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

export default function TextareaField({
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

  const onChange: TextareaProps["onChange"] = (event) => {
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
    <Field className="group" disabled={disabled}>
      <Label label={label} required={required} />
      <div className="mt-1">
        <Textarea
          ref={textareaRef}
          name={name}
          className="block w-full resize-none rounded-lg border border-solid border-[var(--border)] bg-[var(--main-background)] px-3 py-1.5 text-sm/6 data-[invalid]:border-red-500 data-[disabled]:border-opacity-50 data-[disabled]:bg-[var(--secondary-background)]"
          onChange={onChange}
          invalid={!!error}
          aria-required={required}
          aria-errormessage={errorMessageId}
          {...props}
        />
      </div>
      {error && <ErrorMessage id={errorMessageId} message={error} />}
    </Field>
  )
}
