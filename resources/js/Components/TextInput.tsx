import { Input } from '@/Components/ui/input'
import { forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react'

export default forwardRef(function TextInput(
  {type = 'text', className = '', isFocused = false, ...props}: InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean
  },
  ref
) {
  const localRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }))

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
      <Input
        {...props}
        type={type}
        className={className}
        ref={localRef}
      />
    );
});
