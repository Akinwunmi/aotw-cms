export interface Chip {
  label: string;
  icon?: string;
  active: boolean;
  disabled: boolean;
}

export interface Tab {
  id: number;
  name: string;
  label: string;
  disabled: boolean;
}
