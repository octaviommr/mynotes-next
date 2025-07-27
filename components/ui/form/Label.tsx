import { Label as HeadlessLabel } from "@headlessui/react"

export default function Label({
  label,
  required,
}: Readonly<{ label: string; required?: boolean }>) {
  return (
    <HeadlessLabel className="text-sm/6 font-medium data-[disabled]:opacity-50">
      {required ? `${label} (required)` : label}
    </HeadlessLabel>
  )
}
