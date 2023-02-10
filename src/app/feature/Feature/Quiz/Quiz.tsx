import React, { useState, useEffect } from 'react';
import apiService from 'app/api/service/apiService';
import SelectField from 'app/common/components/Form/SelectField';
import { Categories } from 'app/api/model/get/getQuizCategory';
import { Results } from 'app/api/model/get/getQuizQuestions';
import { Form, FormikProvider, useFormik } from 'formik';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import { AiFillStar } from "react-icons/ai";
import { DifficultyTextEnum } from 'app/core/enum/feature/Quiz';
import { FormValues } from './types';

const Quiz: React.FC = () => {
  const controls = useAnimation();
  const [options, setOptions] = useState<Categories[]>([]);
  const [questions, setQuestions] = useState<Results[]>([]);
  const optionsNumber: Categories[] = [
    {
      id: 9,
      name: '9'
    },
    {
      id: 16,
      name: '16'
    },
    {
      id: 25,
      name: '25'
    }
  ]
  /* initialize the form */
  const formik = useFormik<FormValues>({
    initialValues: {
      category: 1,
      amount: 10
    },
    onSubmit: async (formValues) => {
      const response = await apiService.getQuizQuestions({
        params: {
          amount: formValues.amount,
          category: formValues.category
        }
      })
      if (response.length > 0) {
        controls.start('start');
        setQuestions(response);
      }
    }
  });

  /* initialize the options */
  useEffect(() => {
    (async () => {
      const response = await apiService.getQuizCategory({});
      if (response) {
        setOptions(response);
      }
    })();
  }, []);
  console.log('questions', questions);
  /* framer-motion */
  const variants = {
    start: {
      y: -40,
      opacity: 0 ,
      transition: {
        duration: 1.5
      },
      transitionEnd: {
        display: 'none'
      }
    },
    reset: {
      rotate: 0
    }
  };
  /* select field */
  const handleSelectChange = (value: number, type: string) => {
    switch (type) {
      case ('category'): {
        formik.setFieldValue('category', value);
        break;
      }
      case ('amount'): {
        formik.setFieldValue('amount', value);
        break;
      }
    }
  }
  
  /* styled-component */
  const QuizItem = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: repeat(${props => props.theme.size}, 1fr);
  `
  QuizItem.defaultProps = {
    theme: {
      size: Math.sqrt(formik.values.amount)
    }
  }
  return (
    <div id="quiz" className="quiz-container">
      <motion.div
        className="form-container"
        variants={variants}
        animate={controls}
      >
        <FormikProvider value={formik}>
          <Form>
            <div className="my-2">
              <SelectField placeholder="Choose your questions" name="category" options={options} onChange={handleSelectChange}/>
            </div>
            <div className="my-2">
              <SelectField placeholder="Select the number of questions" name="amount" options={optionsNumber}  onChange={handleSelectChange}/>
            </div>
            <div className="w-100 d-flex justify-content-center">
              <motion.button
                type="submit"
                className="button-main mt-5"
                whileHover={{ scale: 1.2, transition: {
                  default: {
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01]
                  },
                  scale: {
                    type: "spring",
                    damping: 4,
                    stiffness: 100,
                    restDelta: 0.001
                  }
                } }}
              >
                Submit
              </motion.button>
            </div>
          </Form>
        </FormikProvider>
      </motion.div>
      {
        questions.length > 0 && (
          <motion.div
            className="h-100"
            initial={{ y: -100, opacity: 0, display: 'none' }}
            animate={{ y: 0, opacity: 1, display: 'block' }}
            transition={{ delay: 1.5, ease: [0, 0.71, 0.2, 1.01] , duration: 1.5 }}
          >
            <QuizItem>
              {
                questions.map((item, index) => (
                  <div
                    key={index}
                    className="quiz-card"
                  >
                    <div className="d-flex justify-content-between">
                      <p>{index + 1}</p>
                      <p>Difficulty:
                        {
                          item.difficulty === DifficultyTextEnum.Easy && (
                            <span className="ms-3">
                              <AiFillStar />
                            </span>
                          )
                        }
                        {
                          item.difficulty === DifficultyTextEnum.Medium && (
                            <span
                              className="ms-3"
                            >
                              <AiFillStar />
                              <AiFillStar />
                            </span>
                          )
                        }
                        {
                          item.difficulty === DifficultyTextEnum.Hard && (
                            <span
                              className="ms-3"
                            >
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />
                            </span>
                          )
                        }
                      </p>
                    </div>
                    <p>{item.question}</p>
                  </div>
                ))
              }
            </QuizItem>
          </motion.div>
        )
      }
    </div>
  )
}

export default Quiz;
