import axios from 'axios'
import { Contact } from '../types'

export const getContacts = async () => {
  try {
    const res = await axios.get<Contact[]>('https://api.green-api.com/waInstance1101822189/GetContacts/976be9cdfb7b4bdabc0f416729d2b8db2f99cce91b654923a7')

    return res.data
  } catch(err) {
    console.log(err)
  }
}
