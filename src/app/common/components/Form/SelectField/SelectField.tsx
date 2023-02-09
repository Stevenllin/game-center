import React from 'react';
import { useField } from 'formik';
import { Select } from 'antd';
import { SelectFieldProps } from './types';

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const field = useField(props.name);

  return (
    <div className="select-01 w-100">
      <Select
        {...field}
        placeholder="Choose your questions"
        onChange={props.onChange}
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