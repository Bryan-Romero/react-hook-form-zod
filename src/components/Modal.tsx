import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  id?: string;
  onClose?: () => void;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  children?: React.ReactNode;
};

export default function Modal({
  id,
  onClose,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        onClose?.();
      }
    };

    const onClickOutside = (event: MouseEvent) => {
      if (
        closeOnOutsideClick &&
        modalRef.current &&
        event.target === modalRef.current
      ) {
        onClose?.();
      }
    };

    window.addEventListener("keydown", onEscape);
    window.addEventListener("click", onClickOutside);

    return () => {
      window.removeEventListener("keydown", onEscape);
      window.removeEventListener("click", onClickOutside);
    };
  }, [onClose, closeOnOutsideClick]);

  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      id={id}
      tabIndex={-1}
      className="bg-black/30 fixed inset-0 grid place-items-center p-4"
    >
      {children}
    </div>,
    document.getElementById("modal-root")!
  );
}
