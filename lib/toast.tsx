'use client';

/**
 * RONIN HQ — Toast Context & Provider
 *
 * Provides a global toast notification system via React context.
 * Toasts auto-dismiss after 5 seconds and render into a live="polite" region.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

/* ------------------------------------------------------------
   Types
   ------------------------------------------------------------ */

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  timestamp: number;
}

interface ToastContextValue {
  toasts: readonly Toast[];
  addToast: (message: string, type?: ToastType) => string;
  removeToast: (id: string) => void;
}

/* ------------------------------------------------------------
   Context
   ------------------------------------------------------------ */

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 5_000;
let toastCounter = 0;

function generateId(): string {
  toastCounter += 1;
  return `toast-${Date.now()}-${toastCounter}`;
}

/* ------------------------------------------------------------
   Provider
   ------------------------------------------------------------ */

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));

    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info'): string => {
      const id = generateId();
      const toast: Toast = {
        id,
        message,
        type,
        timestamp: Date.now(),
      };

      setToasts((prev) => [...prev, toast]);

      const timer = setTimeout(() => {
        removeToast(id);
      }, AUTO_DISMISS_MS);

      timersRef.current.set(id, timer);

      return id;
    },
    [removeToast],
  );

  // Clean up all timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

/* ------------------------------------------------------------
   Viewport (rendered via the provider)
   ------------------------------------------------------------ */

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: readonly Toast[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="toast-container"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      aria-relevant="additions removals"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast"
          data-type={toast.type}
          role="status"
        >
          <ToastIcon type={toast.type} />
          <div className="toast-body">
            <p className="toast-message">{toast.message}</p>
          </div>
          <button
            className="toast-close"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   Toast Icon
   ------------------------------------------------------------ */

function ToastIcon({ type }: { type: ToastType }) {
  const colorMap: Record<ToastType, string> = {
    success: '#34d399',
    error: '#C51E29',
    warning: '#C59A57',
    info: '#0EA5E9',
  };

  const labelMap: Record<ToastType, string> = {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
  };

  return (
    <svg
      className="toast-icon"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="8" stroke={colorMap[type]} strokeWidth="1.5" />
      {type === 'success' && (
        <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke={colorMap[type]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {type === 'error' && (
        <>
          <path d="M6.5 6.5L11.5 11.5" stroke={colorMap[type]} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M11.5 6.5L6.5 11.5" stroke={colorMap[type]} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
      {type === 'warning' && (
        <path d="M9 6V10" stroke={colorMap[type]} strokeWidth="1.5" strokeLinecap="round" />
      )}
      {type === 'info' && (
        <>
          <circle cx="9" cy="6" r="0.75" fill={colorMap[type]} />
          <path d="M9 8.5V12" stroke={colorMap[type]} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
      <title>{labelMap[type]}</title>
    </svg>
  );
}

/* ------------------------------------------------------------
   Hook
   ------------------------------------------------------------ */

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }

  return context;
}
