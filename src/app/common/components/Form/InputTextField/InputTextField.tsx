import React from 'react';
import { useField } from 'formik';
import { Input } from 'antd';
import { InputTextFieldProps } from './types';

const InputField: React.FC<InputTextFieldProps> = (props) => {
  const field = useField(props.name);

  return (
    <Input
      {...field}
      placeholder={props.placeholder}
      onChange={(value: any) => props.onChange(value)}
    />
  )
}

export default InputField;
