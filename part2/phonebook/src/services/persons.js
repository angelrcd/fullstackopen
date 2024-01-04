import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data);
}

const create = newObject => {
  const request =  axios.post(baseUrl, newObject)
  return request.then(res => res.data)
}

const updateNumber = (person, newNumber) => {
  const request = axios.put(baseUrl + `/${person.id}`, {...person , number: newNumber});
  return request.then(res => res.data)
}

const deletePerson = (id) => {
  const request = axios.delete(baseUrl + `/${id}`);
  return request.then(res => res.data)
}

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }

export default { getAll, create, updateNumber, delete: deletePerson }