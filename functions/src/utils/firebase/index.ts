import admin from 'firebase-admin'
import { STORAGE_BUCKET } from '../secrets'

const firebaseAdminOptions: admin.AppOptions = {
  credential: admin.credential.applicationDefault(),
  storageBucket: STORAGE_BUCKET
}

if (admin.apps.length === 0) {
  admin.initializeApp(firebaseAdminOptions)
}

// Auth

export const auth = admin.auth()

// Firestore

export const db = admin.firestore()

// Storage

export const storage = admin.storage()

export { admin }
