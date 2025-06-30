import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import Button from "@/components/ui/Button"
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
                  <Button onClick={() => closeModal(false)} variant="secondary">
                    {modal.cancelLabel}
                  </Button>
                )}
                <Button onClick={() => closeModal(true)}>
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
