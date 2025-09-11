import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { evaluate } from 'mathjs';
import { motion } from "framer-motion"

interface EditableInputProps {
  value: string
  type?: string
  placeholder?: string
  onSave: (newValue: string) => void
}

export function EditableInput({ value, onSave, type = "text", placeholder = "Editar" }: EditableInputProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [internalValue, setInternalValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    if(type === "text"){
      onSave(internalValue)
    }

    if (type === "number") {
      let result = calculateValue(internalValue)
      if(result === "")
        result = value
      onSave(result)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSave()
    }
    if (event.key === "Escape") {
      setInternalValue(value)
      setIsEditing(false)
    }
  }

  const calculateValue = (expr: string): string => {
    try {
      const result = evaluate(expr);
      return result.toString();
    } catch (error) {
      return "";
    }
  };
      
  

  return isEditing ? (
    <Input
      ref={inputRef}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={handleKeyDown}
      type="text"
      className="w-full focus-visible:border-ring focus-visible:ring-ring/10 focus-visible:ring-[1px]"
    />
  ) : (
    
    <motion.button
      whileHover={{ x: 0, y: -5 }}
      onClick={() => setIsEditing(true)}
      className={"p-2 hover:cursor-pointer cursor-pointer"}
    >
      {value || placeholder}
    </motion.button>
  )
}