import React from 'react';
import { useField } from 'formik';
import { Select } from 'antd';
import { SelectFieldProps } from './types';

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const field = useField(props.name);

  return (
    <div className="select w-100">
      <Select
        {...field}
        placeholder={props.placeholder}
        onChange={(event) => props.onChange(event, props.name)}
      >
        {
          props.options.map((item, index) => (
            <Select.Option
              key={index}
              value={item.id}
              style={{ fontSize: '24px', margin: '4px' }}
            >
              {item.name}
            </Select.Option>
          ))
        }
      </Select>
    </div>
  )
}

export default SelectField