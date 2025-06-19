"use client"

import {
  createContext,
  useContext,
  useReducer,
  Reducer,
  useCallback,
  useMemo,
} from "react"
import Modal from "./modal"

// set up a discriminated union to represent the available modal types
type ModalType =
  | {
      type: "notification"
      title: string
      content: string
      okLabel: string
    }
  | {
      type: "alert"
      title: string
      content: string
      okLabel: string
      cancelLabel: string
    }

type ModalState =
  | { open: false; modal?: ModalType }
  | { open: true; modal: ModalType }

type ModalAction = { type: "open"; modal: ModalType } | { type: "close" }

/*
  Set up the type for the context used to control the modal state.

  In this case, this context value can't be just the "dispatch" function yielded by the "useReducer" hook. This is
  because we need to have side effects associated with the state transitions in order to return a promise of the modal
  result to the user, but reducers must be pure.
    
  Instead, we provide functions that run the needed side effects, besides calling "dispatch" to update the state.
*/
interface ModalControlContextType {
  showModal: (modal: ModalType) => Promise<boolean>
  closeModal: (result: boolean) => void
}

const ModalContext = createContext<ModalState | null>(null)
const ModalControlContext = createContext<ModalControlContextType | null>(null)

let resolveResult: (value: boolean) => void // this will hold the resolver function for the promise of the modal result

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case "open":
      return { open: true, modal: action.modal }

    case "close":
      return { open: false }
  }
}

export default function ModalProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [state, dispatch] = useReducer<Reducer<ModalState, ModalAction>>(
    modalReducer,
    { open: false },
  )

  const showModal = useCallback((modal: ModalType): Promise<boolean> => {
    dispatch({ type: "open", modal })

    // return a promise which will be resolved with the modal result once the user closes it
    return new Promise((resolve) => {
      resolveResult = resolve
    })
  }, [])

  const closeModal = useCallback((result: boolean) => {
    resolveResult(result)

    dispatch({ type: "close" })
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const controlContextValue = useMemo(() => ({ showModal, closeModal }), [])
  /*    
    NOTE: We should always use a memoized object for the context value to make sure it doesn't change when the component is
    re-rendered (by creating a new object) and there's no actual change in the context value. And to make sure there's no
    undesired changes in the context value, we should always use memoized functions too.

    React re-renders children that are subscribed to the context whenever the context value changes. The above ensures
    there are no unnecessary re-renders, which can harm performance.
  */

  return (
    <>
      <ModalContext.Provider value={state}>
        <ModalControlContext.Provider value={controlContextValue}>
          {children}
          <Modal />
        </ModalControlContext.Provider>
      </ModalContext.Provider>
    </>
  )
  /*
    NOTE: Providing the state and control contexts separately ensures that components that only need to subscribe to one
    of them only get re-rendered if that context value is updated.
  */
}

export const useModal = () => useContext(ModalContext) as ModalState
export const useModalControl = () =>
  useContext(ModalControlContext) as ModalControlContextType
