import { Checkbox, Field, type CheckboxProps } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/16/solid"
import Label from "./Label"

type CheckboxFieldProps = Omit<CheckboxProps, "className" | "value"> &
  Readonly<{
    label: string
  }>

export default function CheckboxField({
  disabled,
  label,
  ...props
}: CheckboxFieldProps) {
  return (
    <Field className="flex items-center gap-2" disabled={disabled}>
      <Label label={label} />
      <Checkbox
        className="group size-6 rounded-md p-1 ring-1 ring-inset ring-black/[.08] hover:cursor-default dark:ring-white/[.145]"
        value="true"
        {...props}
      >
        <CheckIcon className="hidden size-4 group-data-[checked]:block" />
      </Checkbox>
    </Field>
  )
}
