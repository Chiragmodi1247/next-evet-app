import { MongoClient } from 'mongodb'

export async function connectToDb () {
  const client = await MongoClient.connect(
    'mongodb+srv://nextDB:nextDB@cluster0.3kw4a.mongodb.net/events?retryWrites=true&w=majority'
  )
  return client
}

export async function insertToDb (client, collection, document) {
  const db = client.db()

  const result = await db.collection(collection).insertOne(document)
  return result
}

export async function getAllDocuments (client, collection, sort) {
  const db = client.db()

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray()

  return documents
}
