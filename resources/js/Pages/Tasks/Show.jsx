import React from 'react'

export default function Show({task}) {
  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  )
}
