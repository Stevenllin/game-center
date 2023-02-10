import { Categories } from 'app/api/model/get/getQuizCategory';

export interface SelectFieldProps {
  placeholder: string;
  options: Categories[];
  name: string;
  onChange: (value: number, type: string) => void;
}
