import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FormData } from '../../types/types';

export interface TextInputProps {
  className: string;
  label: string;
  id: string;
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  // refer: React.RefObject<HTMLInputElement>;
}

const TextInput = ({ className, label, id, name, register }: TextInputProps) => {
  const validateUppercase = (value: string) => {
    const isUppercase = /[A-Z]/.test(value);
    return isUppercase || 'Name must include at least one uppercase letter';
  };
  return (
    <div className={className}>
      <label htmlFor={id}>
        {label}
        <input {...register(name, { required: true })} data-testid="title" id={id} type="text" />
      </label>
    </div>
  );
};

export default TextInput;
