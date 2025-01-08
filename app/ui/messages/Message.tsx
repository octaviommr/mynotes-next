import { useEffect } from "react"
import Alert from "./alert"
import { useMessage, useMessageDispatch } from "./message-context"

export default function Message() {
  const { open, message } = useMessage()
  const dispatch = useMessageDispatch()

  // auto dismiss after 6 seconds
  useEffect(() => {
    if (open) {
      setTimeout(() => dispatch({ type: "close" }), 6000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <div className="fixed bottom-8 left-8 w-full">
      {open && <Alert severity={message.severity} message={message.content} />}
    </div>
  )
}
