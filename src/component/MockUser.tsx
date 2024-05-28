import React from "react"

export interface User {
  id: string | any
  user_id: string | any
  name: string
  email?: string
  created_at: string
}

export const mockUsers: User[] = [
  {
    id: "1",
    user_id: "auniqueid",
    email: "remcostoeten@hotmail.com",
    name: "Remco Stoeten",
    created_at: new Date().toISOString(),
  },
]

export let MockUser: User | null = mockUsers[0]

export function LogoutButton() {
  const handleLogout = () => {
    if (MockUser) {
      MockUser = null
      console.log("User has been logged out.")
    } else {
      MockUser = mockUsers[0]
      console.log("User has been set to mock user.")
    }
  }

  return <button onClick={handleLogout}>Logout</button>
}
