import { ChangeEventHandler, useEffect, useRef } from "react"
import { Input, Field, Label, type InputProps } from "@headlessui/react"

type TextFieldProps = Omit<
  InputProps,
  | "className"
  | "type"
  | "onChange"
  | "invalid"
  | "aria-invalid"
  | "aria-required"
  | "aria-errormessage"
> & {
  label: string
  error?: string
}

const TextField = ({
  disabled,
  required,
  label,
  error,
  ...props
}: Readonly<TextFieldProps>) => {
  // set up refs to use the input as uncontrolled, thus avoiding re-renders when value changes
  const inputRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<string>()

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    valueRef.current = event.target.value
  }

  /*
    Set input value using the stored value.

    We don't use the input's "value" prop to set the value directly because components are supposed to be pure functions,
    meaning the JSX should always be the same for the same inputs (props, state and context).
  */
  useEffect(() => {
    if (valueRef.current !== undefined) {
      inputRef.current!.value = valueRef.current
    }
  })

  return (
    <Field className="group" disabled={disabled}>
      <Label className="text-sm/6 font-medium data-[disabled]:opacity-50">
        {`${label}${required ? " (required)" : ""}`}
      </Label>
      <Input
        ref={inputRef}
        className="mt-1 block w-full rounded-lg border border-solid border-[var(--border)] bg-[var(--main-background)] px-3 py-1.5 text-sm/6 data-[invalid]:border-red-500 data-[disabled]:border-opacity-50 data-[disabled]:bg-[var(--secondary-background)]"
        onChange={onChange}
        invalid={!!error}
        aria-required={required}
        aria-errormessage={`${props.name}-error-message`}
        {...props}
      />
      {error && (
        <p
          id={`${props.name}-error-message`}
          className="text-sm/6 text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </Field>
  )
}

export default TextField
