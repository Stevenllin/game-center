import React, { useState, useEffect } from 'react';
import apiService from 'app/api/service/apiService';
import commonService from 'app/core/service/commonService';
import SelectField from 'app/common/components/Form/SelectField';
import RadioField from 'app/common/components/Form/RadioField';
import { Categories } from 'app/api/model/get/getQuizCategory';
import { Form, FormikProvider, useFormik } from 'formik';
import { motion, useAnimation } from 'framer-motion';
import { AiFillStar } from "react-icons/ai";
import { DifficultyTextEnum, SelectFieldTextEnum } from 'app/core/enum/feature/Quiz';
import { SearchFormValues, QuizFormValues, Questions, QuizTimes } from './types';

const Quiz: React.FC = () => {
  const controls = useAnimation();
  const [quizTimeState, setQuizTimeState] = useState<QuizTimes>({
    isValid: false,
    seconds: 0,
    minutes: 0
  });
  const [options, setOptions] = useState<Categories[]>([]);
  const [questions, setQuestions] = useState<Questions[]>([]);
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
  /* initialize the search form */
  const searchFormik = useFormik<SearchFormValues>({
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
        const responseUpdate: Questions[] = response.map((item, index) => {
          const answer = commonService.decodeString(item.correct_answer)
          const options = [
            ...item.incorrect_answers.map(a => commonService.decodeString(a)), 
            answer
          ]
          return {
            id: index,
            difficulty: item.difficulty,
            question: commonService.decodeString(item.question),
            answer: item.answer,
            options: options
          }
        })
        setQuestions(responseUpdate);
      }
    }
  });
  /** initialize the quiz form */
  const quizFormik = useFormik<QuizFormValues>({
    initialValues: {
      answers: []
    },
    onSubmit: async (formValues) => {
      console.log('formValues', formValues);
    }
  })
  /* initialize the options */
  useEffect(() => {
    (async () => {
      const response = await apiService.getQuizCategory({});
      if (response) {
        setOptions(response);
      }
    })();
  }, []);

  useEffect(() => {
    const target = new Date (commonService.getQuizValidTime(0.3));
    
    if (!quizTimeState.isValid) {
      const interval = setInterval(() => {
        const current = new Date();
        const difference = target.getTime() - current.getTime();
        const minutesUpdate = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const secondsUpdate = Math.floor((difference % (1000 * 60)) / (1000))
        if (minutesUpdate >= 0 && secondsUpdate >= 0) {
          setQuizTimeState({
            minutes: minutesUpdate,
            seconds: secondsUpdate,
            isValid: false
          })
        } else {
          setQuizTimeState({
            minutes: 0,
            seconds: 0,
            isValid: true
          })
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [questions, quizTimeState.isValid])

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
      case (SelectFieldTextEnum.Category): {
        searchFormik.setFieldValue('category', value);
        break;
      }
      case (SelectFieldTextEnum.Amount): {
        searchFormik.setFieldValue('amount', value);
        break;
      }
    }
  }

  const handleRadioChange = (value: string, name: string) => {
    quizFormik.setFieldValue(name, value);
  }

  return (
    <div id="quiz" className="quiz-container">
      <motion.div
        className="form-container"
        variants={variants}
        animate={controls}
      >
        <FormikProvider value={searchFormik}>
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
          <FormikProvider value={quizFormik}>
            <Form>
              <motion.p
                initial={{ y: -100, opacity: 0, display: 'none' }}
                animate={{ y: 0, opacity: 1, display: 'block' }}
                transition={{ delay: 1.5, ease: [0, 0.71, 0.2, 1.01] , duration: 1.5 }}
                className="timer mb-5"
              >
                {
                  // eslint-disable-next-line no-mixed-operators
                  quizTimeState.minutes === 0 && quizTimeState.seconds <= 10 && (
                    <span className="quiz-text-danger">{quizTimeState.minutes}:{quizTimeState.seconds}</span>
                  // eslint-disable-next-line no-mixed-operators
                  ) || <span>{quizTimeState.minutes}:{quizTimeState.seconds}</span>
                }
              </motion.p>
              <motion.div
                className="quiz-card-container"
                initial={{ y: -100, opacity: 0, display: 'none' }}
                animate={{ y: 0, opacity: 1, display: 'block' }}
                transition={{ delay: 1.5, ease: [0, 0.71, 0.2, 1.01] , duration: 1.5 }}
              >
                <div
                  className={`quiz-item ${searchFormik.values.amount === 9 ? 'repeat-3' : '' } ${searchFormik.values.amount === 16 ? 'repeat-4' : '' } ${searchFormik.values.amount === 25 ? 'repeat-5' : '' }`}>
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
                        <RadioField name={`answers.${index}`} options={item.options} onChange={handleRadioChange} />
                      </div>
                    ))
                  }
                </div>
              </motion.div>
            </Form>
          </FormikProvider>
        )
      }
    </div>
  )
}

export default Quiz;
