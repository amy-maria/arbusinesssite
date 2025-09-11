import { NextResponse } from 'next/server'

const API_URL = 'http://localhost:10031/graphql'
//const WP_AUTH_TOKEN = process.env.WP_AUTH_TOKEN! // optional, if mutations need auth

export async function POST(req: Request) {
  const { postId, action } = await req.json() // action = "like" or "dislike"

  const mutation = `
    mutation UpdateLikes($postId: ID!, $action: String!) {
      updateLikes(postId: $postId, action: $action) {
        likes
        dislikes
      }
    }
  `

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${WP_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      query: mutation,
      variables: { postId, action },
    }),
  })

  const data = await res.json()
  return NextResponse.json(data)
}
