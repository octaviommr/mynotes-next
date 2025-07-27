import { useEffect, useRef } from "react"
import {
  Field,
  Input,
  Button,
  type FieldProps,
  type InputProps,
} from "@headlessui/react"
import clsx from "clsx"
import type { Icon } from "@/types/Icon"
import Label from "./Label"
import ErrorMessage from "./ErrorMessage"

type InputAdornment = Readonly<{
  icon: Icon
  onClick?: () => void
}>

type InputFieldProps = Omit<
  InputProps,
  | "className"
  | "name"
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
    adornment?: InputAdornment
  }>

export default function InputField({
  className,
  name,
  disabled,
  required,
  label,
  error,
  adornment,
  ...props
}: InputFieldProps) {
  // set up refs to use the input as uncontrolled, thus avoiding re-renders when value changes
  const inputRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<string>()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const errorMessageId = `${name}-error-message`

  return (
    <Field className={clsx("group", className)} disabled={disabled}>
      <Label label={label} required={required} />
      <div className="relative mt-1">
        <Input
          ref={inputRef}
          className={clsx(
            "block w-full rounded-lg border border-solid border-[var(--border)] bg-[var(--main-background)] px-3 py-1.5 text-sm/6 data-[invalid]:border-red-500 data-[disabled]:border-opacity-50 data-[disabled]:bg-[var(--secondary-background)]",
            { "pr-10": !!adornment },
          )}
          name={name}
          invalid={!!error}
          aria-required={required}
          aria-errormessage={errorMessageId}
          onChange={onChange}
          {...props}
        />
        {adornment && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {adornment.onClick ? (
              <Button
                className="data-[disabled]:opacity-50"
                onClick={() => adornment.onClick!()}
                disabled={disabled}
              >
                <adornment.icon className="size-6" />
              </Button>
            ) : (
              <adornment.icon className="size-6" />
            )}
          </div>
        )}
      </div>
      {error && <ErrorMessage id={errorMessageId} message={error} />}
    </Field>
  )
}
