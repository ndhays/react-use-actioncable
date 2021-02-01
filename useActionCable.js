import { createConsumer } from "@rails/actioncable"
import { useState, useEffect } from 'react';

const consumer = createConsumer()

export default function useActionCable(channel, params) {
    
    const [msg, setMsg] = useState();

    useEffect(() => {
        const subscription = consumer.subscriptions.create(
            { channel, ...params },
            {
                received: (msg) => setMsg(msg)
            }
        )
    
        return () => {
            subscription.unsubscribe()
        }
  }, [channel, params])

  return msg
}