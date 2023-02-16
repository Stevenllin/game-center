export interface InputTextFieldProps {
  name: string;
  placeholder: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}
