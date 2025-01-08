import { ChangeEventHandler, useEffect, useRef } from "react"
import { Input, Field, Label, Description } from "@headlessui/react"
import clsx from "clsx"

interface TextFieldProps {
  name: string
  label: string
  defaultValue?: string
  error?: string
  disabled?: boolean
}

const TextField = ({
  name,
  label,
  defaultValue,
  error,
  disabled,
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
      <Label
        className={clsx("text-sm/6 font-medium data-[disabled]:opacity-50", {
          "text-red-500": !!error,
        })}
      >
        {label}
      </Label>
      <Input
        ref={inputRef}
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
        className={clsx(
          "mt-1 block w-full rounded-lg border border-solid border-[var(--border)] bg-[var(--main-background)] px-3 py-1.5 text-sm/6 data-[disabled]:border-opacity-50 data-[disabled]:bg-[var(--secondary-background)]",
          {
            "border-red-500 dark:border-red-500": !!error,
          },
        )}
      />
      <Description
        className="text-sm/6 text-red-500"
        aria-live="polite"
        aria-atomic="true"
      >
        {error}
      </Description>
    </Field>
  )
}

export default TextField
