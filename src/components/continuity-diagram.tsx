"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import styles from "./continuity-diagram.module.css";

const RemiWorkflow = dynamic(() => import("./remi/remi-workflow").then(module => module.RemiWorkflow), {
  ssr: false,
  loading: () => <p role="status" aria-label="…">…</p>,
});

export function ContinuityDiagram({ index, locale = "en" }: { index: number; locale?: "en" | "es" }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");
  const [open, setOpen] = useState(false);

  function show() {
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setOpen(true);
    dialog.current?.showModal();
  }

  function restore() {
    setOpen(false);
    document.body.style.overflow = previousOverflow.current;
    trigger.current?.focus({ preventScroll: true });
  }

  return <>
    <button ref={trigger} type="button" className={styles.trigger} onClick={show} aria-haspopup="dialog">
      <span>0{index + 1}</span><strong>{locale === "es" ? "Diagramas de continuidad" : "Continuity diagrams"} <span aria-hidden="true">↗</span></strong>
    </button>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="continuity-dialog-title" onClose={restore}>
      <header className={styles.header}>
        <h2 id="continuity-dialog-title">{locale === "es" ? "CNP Jalisco · Flujo de trabajo REMI" : "CNP Jalisco · REMI workflow"}</h2>
        <button type="button" onClick={() => dialog.current?.close()} aria-label={locale === "es" ? "Cerrar diagrama" : "Close workflow"}>{locale === "es" ? "Cerrar ×" : "Close ×"}</button>
      </header>
      <div className={styles.content}>{open && <RemiWorkflow locale={locale} />}</div>
    </dialog>
  </>;
}
