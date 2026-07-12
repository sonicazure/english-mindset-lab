import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { Toast as ToastType } from '@/hooks/useToast';

const iconMap = {
  success: <CheckCircle size={16} color="#00ff9d" />,
  info: <Info size={16} color="#00ccff" />,
  warning: <AlertTriangle size={16} color="#ff6b00" />,
};

const bgMap = {
  success: 'rgba(0,255,157,0.1)',
  info: 'rgba(0,204,255,0.1)',
  warning: 'rgba(255,107,0,0.1)',
};

const borderMap = {
  success: 'rgba(0,255,157,0.2)',
  info: 'rgba(0,204,255,0.2)',
  warning: 'rgba(255,107,0,0.2)',
};

export default function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'fixed',
        top: '72px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10001,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '90%',
        maxWidth: '400px',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          index={index}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  index,
  onRemove,
}: {
  toast: ToastType;
  index: number;
  onRemove: (id: string) => void;
}) {
  return (
    <div
      role="status"
      style={{
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        borderRadius: '12px',
        background: bgMap[toast.type],
        border: `1px solid ${borderMap[toast.type]}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        animation: `toastIn 0.35s ease-out ${index * 0.05}s both`,
      }}
    >
      {iconMap[toast.type]}
      <span
        style={{
          fontSize: '14px',
          color: '#fff',
          flex: 1,
          fontWeight: 500,
        }}
      >
        {toast.message}
      </span>
      <button
        onClick={() => onRemove(toast.id)}
        aria-label="关闭提示"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.4)',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <X size={14} />
      </button>

      <style>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
