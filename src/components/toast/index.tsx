import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
  PropsWithChildren,
} from "react";

import { ToastProps, Toast, ToastContainer } from "./toast";

const ToastContext = createContext<{
  addToast(toast: ToastProps): void;
  removeToast(toastId: string): void;
  clearToasts(): void;
}>({
  addToast: () => null,
  removeToast: () => null,
  clearToasts: () => null,
});

const ToastMessage = ({ id, timeOut = 7000, ...props }: ToastProps) => {
  const timer = useRef<number>();
  const { removeToast } = useContext(ToastContext);

  useEffect(() => {
    timer.current = setTimeout(
      () => removeToast(id),
      timeOut
    ) as unknown as number;
    return () => clearTimeout(timer.current);
  }, []);

  return <Toast {...{ ...props, id }} />;
};

export default ({ children }: PropsWithChildren<any>) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: ToastProps) => setToasts((prev) => [...prev, toast]);
  const removeToast = (toastId: string) =>
    setToasts((prev) => prev.filter((toast) => toast.id !== toastId));

  const clearToasts = () => setToasts([]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer>
        {toasts.map((props) => (
          <ToastMessage {...{ ...props, removeToast }} key={props.id} />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { addToast, removeToast, clearToasts } = useContext(ToastContext);
  return { addToast, removeToast, clearToasts };
};
