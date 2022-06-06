import { MessageEvent, TextEventMessage } from '@line/bot-sdk'
import { storage } from '~/utils/firebase'
import { lineClient } from '~/utils/line'
import { errorLogger } from '~/utils/util'

// *********
// main関数
// *********

export const messageTextHandler = async (event: MessageEvent): Promise<void> => {
  try {
    const { text } = event.message as TextEventMessage

    if (text.includes('敗北者')) {
      const publicUrl = storage.bucket().file('cancel.jpg').publicUrl()

      await lineClient.replyMessage(event.replyToken, {
        type: 'image',
        originalContentUrl: publicUrl,
        previewImageUrl: publicUrl
      })
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('message text handler')
  }
}
