import { useEffect } from "react";

function ModalComponent({ onFechar, children }) {
    // Fecha o modal ao apertar ESC
    useEffect(() => {
        function aoApertarTecla(e) {
            if (e.key === "Escape") onFechar();
        }
        document.addEventListener("keydown", aoApertarTecla);
        return () => document.removeEventListener("keydown", aoApertarTecla);
    }, [onFechar]);

    return (
        <div className="modal-fundo" onClick={onFechar}>
            <div className="modal-caixa" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default ModalComponent;