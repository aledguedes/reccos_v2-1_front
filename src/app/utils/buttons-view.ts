export const changeViewCards: IButtonView[] = [
  {
    icon: 'ri-align-justify',
    control: 'table',
    severity: 'info',
    size: 'large',
    rounded: true,
    text: true,
  },
  {
    icon: 'ri-function-line',
    control: 'portrait',
    severity: 'primary',
    size: 'large',
    rounded: true,
    text: true,
  },
  {
    icon: 'ri-layout-grid-line',
    control: 'landscape',
    severity: 'success',
    size: 'large',
    rounded: true,
    text: true,
  },
];

export interface IButtonView {
  icon: string;
  control: 'landscape' | 'portrait' | 'table';
  severity:
    | 'info'
    | 'success'
    | 'warn'
    | 'danger'
    | 'help'
    | 'primary'
    | 'secondary'
    | 'contrast'
    | null
    | undefined;
  size: 'small' | 'large' | undefined;
  rounded: boolean;
  text: boolean;
}
