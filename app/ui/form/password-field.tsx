import { ChangeEventHandler, useEffect, useRef, useState } from "react"
import { Input, Field, Label, Button, type InputProps } from "@headlessui/react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"

type PasswordFieldProps = Omit<
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

const PasswordField = ({
  disabled,
  required,
  label,
  error,
  ...props
}: Readonly<PasswordFieldProps>) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

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
      <div className="relative mt-1">
        <Input
          ref={inputRef}
          className="block w-full rounded-lg border border-solid border-[var(--border)] bg-[var(--main-background)] px-3 py-1.5 text-sm/6 data-[invalid]:border-red-500 data-[disabled]:border-opacity-50 data-[disabled]:bg-[var(--secondary-background)]"
          type={passwordVisible ? "text" : "password"}
          onChange={onChange}
          invalid={!!error}
          aria-required={required}
          aria-errormessage={`${props.name}-error-message`}
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

export default PasswordField
