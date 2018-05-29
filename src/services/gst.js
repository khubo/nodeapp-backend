import axios from 'axios'

const baseUrl = 'http://api.mathjs.org/v4/?expr='

export const calculateTotal = (price, gst) => {
  price = Number(price)
  gst = Number(gst)
  let url = encodeURI(`${baseUrl}${price} * ${gst} / 100 + ${price}`)

  return axios.post(url, {expr: [`det(${price} * ${gst} / 100 + ${price})`]}).then(res => res.data.result[0])
}
