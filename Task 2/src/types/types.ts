export interface DropdownOption {
  value: string | number;
  label: string;
  currency: string;
  icon: string;
}

export interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
}

export interface InputProps {
  label: string;
  value: string;
  onAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalProps {
  onClose: () => void;
}

export interface Currency {
  currency: string;
  price: number;
  value?: string | number;
  label?: string;
}
