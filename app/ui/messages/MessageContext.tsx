"use client"

import { createContext, Dispatch, Reducer, useContext, useReducer } from "react"
import Message from "./Message"
import { MessageSeverity } from "./Alert"

interface MessageType {
  severity: MessageSeverity
  content: string
}

type MessageState =
  | { open: false; message?: MessageType }
  | { open: true; message: MessageType }

type MessageAction = { type: "open"; message: MessageType } | { type: "close" }

const MessageContext = createContext<MessageState | null>(null)
const MessageDispatchContext = createContext<Dispatch<MessageAction> | null>(
  null,
)

function messageReducer(
  state: MessageState,
  action: MessageAction,
): MessageState {
  switch (action.type) {
    case "open":
      return { open: true, message: action.message }

    case "close":
      return { open: false }
  }
}

export default function MessageProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [state, dispatch] = useReducer<Reducer<MessageState, MessageAction>>(
    messageReducer,
    { open: false },
  )

  return (
    <>
      <MessageContext.Provider value={state}>
        <MessageDispatchContext.Provider value={dispatch}>
          {children}
          <Message />
        </MessageDispatchContext.Provider>
      </MessageContext.Provider>
    </>
  )
  /*
    NOTE: Providing the state and dispatcher contexts separately ensures that components that only need to subscribe to one
    of them only get re-rendered if that context value is updated.
  */
}

export const useMessage = () => useContext(MessageContext) as MessageState
export const useMessageDispatch = () =>
  useContext(MessageDispatchContext) as Dispatch<MessageAction>
