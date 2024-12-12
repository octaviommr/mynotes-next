import { ChangeEventHandler, useEffect, useRef } from "react"
import { Textarea, Field, Label, Description } from "@headlessui/react"
import clsx from "clsx"

interface TextareaFieldProps {
  name: string
  label: string
  rows?: number
  defaultValue?: string
  error?: string
  disabled?: boolean
}

const TextareaField = ({
  name,
  label,
  rows,
  defaultValue,
  error,
  disabled,
}: Readonly<TextareaFieldProps>) => {
  // set up refs to use the textarea as uncontrolled, thus avoiding rerenders when value changes
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const valueRef = useRef<string>()

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
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

  return (
    <Field className="group" disabled={disabled}>
      <Label
        className={clsx("text-sm/6 font-medium data-[disabled]:opacity-50", {
          "text-red-500": !!error,
        })}
      >
        {label}
      </Label>
      <Textarea
        ref={textareaRef}
        onChange={onChange}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className={clsx(
          "mt-1 block w-full resize-none rounded-lg border border-solid bg-[var(--background)] px-3 py-1.5 text-sm/6 data-[disabled]:border-opacity-50 data-[disabled]:bg-[#f2f2f2] dark:data-[disabled]:bg-[#1a1a1a]",
          {
            "border-black/[.08] dark:border-white/[.145]": !error,
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

export default TextareaField
