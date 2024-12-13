"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import Alert, { MessageSeverity } from "./Alert"

export interface Message {
  severity: MessageSeverity
  content: string
}

export interface MessageContextType {
  showMessage: (message: Message) => void
}

const MessageContext = createContext<MessageContextType | null>(null)

export default function MessageProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<Message>()

  const showMessage = useCallback((message: Message) => {
    setMessage(message)
    setOpen(true)

    // auto dismiss after 6 seconds
    setTimeout(() => setOpen(false), 6000)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ showMessage }), [])
  /*    
    NOTE: We should always use a memoized object for the context value to make sure it doesn't change (by creating a new
    object) when the component is re-rendered and there's no change in the context value. And, to make sure there's no
    undesired changes in the context value, we should always use memoized functions.

    React re-renders children that are subscribed to the context whenever the context value changes. The above ensures
    there's no unnecessary re-renders, which can harm performance.
  */

  return (
    <>
      <MessageContext.Provider value={value}>
        {children}
      </MessageContext.Provider>
      <div className="fixed bottom-8 left-8 w-full">
        {open && (
          <Alert severity={message!.severity} message={message!.content} />
        )}
      </div>
    </>
  )
}

export const useMessage = () => useContext(MessageContext)
