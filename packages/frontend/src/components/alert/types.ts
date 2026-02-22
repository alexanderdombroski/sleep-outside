export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertOptions {
  message: string;
  type?: AlertType;
  duration?: number; // ms
  styles?: Partial<{
    background: string;
    color: string;
    border: string;
  }>;
}
