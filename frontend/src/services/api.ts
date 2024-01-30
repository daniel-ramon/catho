import axios from "axios"
import { application } from "@config/application"

export const api = axios.create({
  baseURL: `${application.API_URL}`,
})
