import React, { useState, useEffect } from 'react';
import apiService from 'app/api/service/apiService';
import SelectField from 'app/common/components/Form/SelectField';
import { Categories } from 'app/api/model/get/getQuizCategory';
import { Form, FormikProvider, useFormik } from 'formik';
import { FormValues } from './types';

const Quiz: React.FC = () => {
  const [options, setOptions] = useState<Categories[]>([]);

  const formik = useFormik<FormValues>({
    initialValues: {
      category: 1,
      amount: 10
    },
    onSubmit: (formValues) => {
      console.log('formValues', formValues);
    }
  });

  useEffect(() => {
    (async () => {
      const response = await apiService.getQuizCategory({});
      if (response) {
        setOptions(response);
      }
      console.log(await apiService.getQuizQuestions({
        params: {
          amount: 10,
          category: 9
        }
      }))
    })();
  }, []);

  const handleSelectChange = (value: number) => {
    formik.setFieldValue('category', value);
  }

  return (
    <div id="quiz" className="quiz-container" >
      <FormikProvider value={formik}>
        <Form>
          <SelectField name="category" options={options} onChange={handleSelectChange}/>
          <div className="w-100 d-flex justify-content-center">
            <button type="submit" className="button-main mt-5">Submit</button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  )
}

export default Quiz;
