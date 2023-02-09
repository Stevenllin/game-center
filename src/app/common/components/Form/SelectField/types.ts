import { Categories } from 'app/api/model/get/getQuizCategory';

export interface SelectFieldProps {
  options: Categories[];
  name: string;
  onChange: (value: number) => void;
}
