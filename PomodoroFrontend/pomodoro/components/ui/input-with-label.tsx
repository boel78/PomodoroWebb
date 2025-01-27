import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps {
  label: string
  id: string
  type?: string
  name: string
  placeholder?: string
  required?: boolean
}

export default function InputWithLabel({ label, id, type = "text", placeholder, name, required = false }: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} name={name} id={id} placeholder={placeholder} required={required} />
    </div>
  )
}
