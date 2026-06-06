import { toast } from "sonner";

export const demoToast = (title: string, description?: string) =>
  toast(title, { description, duration: 2400 });

export const demoSuccess = (title: string, description?: string) =>
  toast.success(title, { description, duration: 2400 });
