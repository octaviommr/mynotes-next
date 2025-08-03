import { Checkbox, Field, type CheckboxProps } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/16/solid"
import clsx from "clsx"
import Label from "./Label"

type CheckboxFieldProps = Omit<
  CheckboxProps,
  | "name"
  | "checked"
  | "aria-required"
  | "aria-invalid"
  | "aria-disabled"
  | "aria-errormessage"
  | "as"
  | "children"
> &
  Readonly<{
    name: string
    label: string
  }>

export default function CheckboxField({
  className,
  disabled,
  label,
  ...props
}: CheckboxFieldProps) {
  return (
    <Field className="flex items-center gap-2" disabled={disabled}>
      <Label label={label} />
      <Checkbox
        className={clsx(
          "group size-6 rounded-md p-1 ring-1 ring-inset ring-black/[.08] hover:cursor-default dark:ring-white/[.145]",
          className,
        )}
        {...props}
      >
        <CheckIcon className="hidden size-4 group-data-[checked]:block" />
      </Checkbox>
    </Field>
  )
}
