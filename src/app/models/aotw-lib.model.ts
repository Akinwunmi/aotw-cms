export interface Chip {
  label: string;
  icon?: string;
  size?: 'small' | 'medium';
  active: boolean;
  disabled: boolean;
}

export interface Tab {
  id: number;
  name: string;
  label: string;
  disabled: boolean;
}
