import React from 'react';
import { useField } from 'formik';
import { RadioFieldProps } from './types';

const RadioField: React.FC<RadioFieldProps> = (props) => {
  const [field] = useField(props.name);
  return (
    <>
      {
        props.options.map((item, index) => (
          <div key={index} className="radio-offset">
            <label className="radio-label">
              <input
                type="radio"
                {...field}
                checked={field.value === item}
                value={item}
                onChange={(event) => props.onChange(event.target.value, props.name)}
              />
              <span className="radio-text">{item}</span>
            </label>
          </div>
        ))
      }
    </>
  )
}

export default RadioField;