import { WebhookEvent } from '@line/bot-sdk'
import { lineClient } from '~/utils/line'
import { msgError } from '~line/notice-messages/other'

import { messagesHandler } from './messages'
import { errorLogger } from '~/utils/util'
import { unsendHandler } from './unsend'

export const handlers = async (event: WebhookEvent): Promise<void> => {
  try {
    switch (event.type) {
      case 'message':
        return await messagesHandler(event)
      case 'unsend':
        return await unsendHandler(event)
      default:
    }
  } catch (err) {
    lineClient.pushMessage(event.source.userId!, msgError).catch
    errorLogger(err)
    throw new Error('handlers')
  }
}
