import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Button,
} from "@headlessui/react"
import { useModal, useModalControl } from "./ModalContext"

export default function Modal() {
  const { open, modal } = useModal()
  const { closeModal } = useModalControl()

  return (
    <>
      {open && (
        <Dialog
          open={open}
          onClose={() => closeModal(false)}
          className="relative z-50"
          role={modal.type === "alert" ? "alertdialog" : "dialog"}
        >
          <DialogBackdrop className="fixed inset-0 bg-[var(--secondary-background)]" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 bg-[var(--main-background)] p-12">
              <DialogTitle className="text-2xl font-bold">
                {modal.title}
              </DialogTitle>
              <p>{modal.content}</p>
              <div className="flex justify-end gap-4">
                {modal.type === "alert" && (
                  <Button
                    type="button"
                    className="rounded-md border border-solid border-[var(--border)] px-3 py-1.5 text-sm/6 font-semibold"
                    onClick={() => closeModal(false)}
                  >
                    {modal.cancelLabel}
                  </Button>
                )}
                <Button
                  type="button"
                  className="rounded-md border border-solid border-[var(--border)] bg-[var(--secondary-background)] px-3 py-1.5 text-sm/6 font-semibold"
                  onClick={() => closeModal(true)}
                >
                  {modal.okLabel}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </>
  )
}
