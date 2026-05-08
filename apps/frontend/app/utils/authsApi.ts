import { SignupData, SigninData } from '../../../shared/types/authTypes'

const baseApi = '/api/v1'

const parseJson = async (response: Response) => {
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed')
  }

  return data
}

export const signup = async (data: SignupData) => {
  const response = await fetch(`${baseApi}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  return parseJson(response)
}

export const signin = async (data: SigninData) => {
  const response = await fetch(`${baseApi}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  return parseJson(response)
}

export const signout = async () => {
  const response = await fetch(`${baseApi}/auth/signout`, {
    method: 'POST',
    credentials: 'include',
  })

  return parseJson(response)
}

export const getMe = async () => {
  const response = await fetch(`${baseApi}/auth/me`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  })

  return parseJson(response)
}
