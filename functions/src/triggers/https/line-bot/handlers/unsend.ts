import { UnsendEvent } from '@line/bot-sdk'
import { storage } from '~/utils/firebase'
import { lineClient } from '~/utils/line'
import { errorLogger } from '~/utils/util'

export const unsendHandler = async (event: UnsendEvent): Promise<void> => {
  try {
    const unsendMessageId = event.unsend.messageId
    console.log(unsendMessageId)
    // DBからmessage調べる

    const text = 'test敗北者'
    if (text.includes('敗北者')) {
      const publicUrl = storage.bucket().file('cancel.jpg').publicUrl()

      const returnId =
        event.source.type === 'group'
          ? event.source.groupId
          : event.source.type === 'room'
          ? event.source.roomId
          : event.source.userId

      await lineClient.pushMessage(returnId, {
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
