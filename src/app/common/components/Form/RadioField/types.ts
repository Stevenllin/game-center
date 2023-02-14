export interface RadioFieldProps {
  name: string;
  options: string[];
  onChange: (value: string, name: string) => void;
}
