export interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}

export function scrollIntoView(id: string) {
  const element = document.getElementById(id);
  console.log(id);
  if (element) element.scrollIntoView({ block: "center", behavior: "smooth" });
}
