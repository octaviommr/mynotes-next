import { useEffect, useRef } from "react"
import {
  Input as HeadlessInput,
  type InputProps as HeadlessInputProps,
} from "@headlessui/react"

type InputProps = Omit<
  HeadlessInputProps,
  | "className"
  | "onChange"
  | "aria-invalid"
  | "aria-required"
  | "aria-errormessage"
> &
  Readonly<{ errorMessageId: string }>

export default function Input({
  required,
  errorMessageId,
  ...props
}: InputProps) {
  // set up refs to use the input as uncontrolled, thus avoiding re-renders when value changes
  const inputRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<string>()

  const onChange: HeadlessInputProps["onChange"] = (event) => {
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
    <HeadlessInput
      ref={inputRef}
      className="block w-full rounded-lg border border-solid border-[var(--border)] bg-[var(--main-background)] px-3 py-1.5 text-sm/6 data-[invalid]:border-red-500 data-[disabled]:border-opacity-50 data-[disabled]:bg-[var(--secondary-background)]"
      onChange={onChange}
      aria-required={required}
      aria-errormessage={errorMessageId}
      {...props}
    />
  )
}
