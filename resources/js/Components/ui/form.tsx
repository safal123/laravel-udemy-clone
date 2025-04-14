import * as React from "react"
import { Label } from "./label"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function FormField({ label, error, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label: string
}

export function FormInput({ label, error, className, ...props }: FormInputProps) {
  return (
    <FormField label={label} error={error}>
      <Input
        className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
        {...props}
      />
    </FormField>
  )
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label: string
}

export function FormTextarea({ label, error, className, ...props }: FormTextareaProps) {
  return (
    <FormField label={label} error={error}>
      <Textarea
        className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
        {...props}
      />
    </FormField>
  )
}
