import { MessageEvent } from '@line/bot-sdk'
import { storage } from '~/utils/firebase'
import { lineClient, makeReplyMessage } from '~/utils/line'
import { errorLogger } from '~/utils/util'

// *********
// main関数
// *********

export const messageTextHandler = async (event: MessageEvent): Promise<void> => {
  try {
    // await storage.bucket().file('cancel.jpg').makePublic()
    const publicUrl = storage.bucket().file('cancel.jpg').publicUrl()
    console.log(publicUrl)

    await lineClient.replyMessage(event.replyToken, {
      type: 'image',
      originalContentUrl: publicUrl,
      previewImageUrl: publicUrl
    })
  } catch (err) {
    errorLogger(err)
    throw new Error('message text handler')
  }
}
