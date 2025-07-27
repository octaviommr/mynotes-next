import {
  Checkbox,
  Field,
  type CheckboxProps,
  type FieldProps,
} from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/16/solid"
import clsx from "clsx"
import Label from "./Label"

type CheckboxFieldProps = Omit<
  CheckboxProps,
  "className" | "checked" | "aria-disabled"
> &
  Pick<FieldProps, "className"> &
  Readonly<{
    label: string
  }>

export default function CheckboxField({
  className,
  disabled,
  label,
  ...props
}: CheckboxFieldProps) {
  return (
    <Field
      className={clsx("flex items-center gap-2", className)}
      disabled={disabled}
    >
      <Label label={label} />
      <Checkbox
        className="group size-6 rounded-md p-1 ring-1 ring-inset ring-black/[.08] hover:cursor-default dark:ring-white/[.145]"
        {...props}
      >
        <CheckIcon className="hidden size-4 group-data-[checked]:block" />
      </Checkbox>
    </Field>
  )
}
