import { connectToDb, insertToDb } from '../../../helpers/db-util'

async function handler (req, res) {
  if(req.method === 'POST') {
    const userEmail = req.body.email
    if(!userEmail || !userEmail.includes('@')) {
      res.status(422).json({message: 'Invalid email'})
      return
    }

    let client
    try {
      client = await connectToDb()
    } catch (error) {
      res.status(500).json({message: 'Error connecting to DB'})
      return
    }

    try {
      await insertToDb(client, 'newsletter', { email: userEmail })
      client.close()
    } catch (error) {
      res.status(500).json({message: 'Error inserting'})
      return
    }

    console.log('userEmail', userEmail)
    res.status(201).json({message: 'Subscribed'})
  }
}

export default handler