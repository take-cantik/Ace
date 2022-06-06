import { UnsendEvent } from '@line/bot-sdk'
import { db, storage } from '~/utils/firebase'
import { lineClient } from '~/utils/line'
import { errorLogger } from '~/utils/util'

export const unsendHandler = async (event: UnsendEvent): Promise<void> => {
  try {
    const unsendMessageId = event.unsend.messageId
    const doc = db.collection('losers').doc(unsendMessageId)
    const ref = await doc.get()

    if (ref.data()) {
      await doc.delete()

      const publicUrl = storage.bucket().file('thanks.jpg').publicUrl()

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
