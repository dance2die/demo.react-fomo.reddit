import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Posts = ({ posts }) => (
  <ul>
    {posts.map(({ node: { item: post } }) => (
      <li key={post.id}>
        <a href={post.url} target="_blank" rel="noopener noreferrer">
          <h3>{post.title}</h3>
          <p>
            by {post.author} with score of {post.score}
          </p>
        </a>
      </li>
    ))}
  </ul>
)

export default () => {
  const {
    allReddit: { edges: posts },
  } = useStaticQuery(graphql`
    query subreddit {
      allReddit {
        edges {
          node {
            item {
              id
              subreddit
              score
              author
              num_comments
              url
              title
              thumbnail
            }
          }
        }
      }
    }
  `)

  return (
    <div>
      <Posts posts={posts} />
    </div>
  )
}
