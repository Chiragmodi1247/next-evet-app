import { connectToDb, getAllDocuments, insertToDb } from '../../../helpers/db-util'

async function handler (req, res) {
  const eventId = req.query.eventId

  let client
  try {
    client = await connectToDb()
  } catch (error) {
    res.status(500).json({message: 'Error connecting to DB'})
    return
  }

  if(req.method === 'POST') {
    // server side validation
    const { email, name, text } = req.body
    if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input' })
      client.close()
    } else {
      const newComment = {
        email,
        name,
        text,
        eventId
      }
      let result

      try {
        result = await insertToDb(client, 'comments', newComment)        
        newComment._id = result.insertedId
        res.status(201).json({ message: 'Added comment', comment: newComment })
      } catch (error) {
        res.status(500).json({message: 'Db insertion error'})
      }
    }
  }

  if(req.method === 'GET') {
    try {
      const results = await getAllDocuments(client, 'comments', { _id: -1 })
      res.status(200).json({ comments: results })
    } catch (error) {
      res.status(500).json({message: 'Error fetching data'})
    }
  }

  client.close()
}

export default handler