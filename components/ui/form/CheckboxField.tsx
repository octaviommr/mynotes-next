import { Checkbox, Field, Label, type CheckboxProps } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/16/solid"

type CheckboxFieldProps = Omit<CheckboxProps, "className" | "value"> & {
  label: string
}

const CheckboxField = ({
  disabled,
  label,
  ...props
}: Readonly<CheckboxFieldProps>) => {
  return (
    <Field className="flex items-center gap-2" disabled={disabled}>
      <Label className="text-sm/6 font-medium data-[disabled]:opacity-50">
        {label}
      </Label>
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

export default CheckboxField
