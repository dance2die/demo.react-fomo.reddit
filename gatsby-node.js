/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/

    https://github.com/dance2die/SHANc/blob/master/gatsby-node.js
 */
const axios = require("axios")
const crypto = require("crypto")

const buildContentDigest = content =>
  crypto
    .createHash(`md5`)
    .update(JSON.stringify(content))
    .digest(`hex`)

const createRedditSource = async ({ createNode }) => {
  const postCount = 3
  // For some reason Reddit API returns "2" more result than the limit
  const limit = postCount - 2
  const redditURL = `https://www.reddit.com/r/reactjs/.json?limit=${limit}`
  const reddit = await axios.get(redditURL)

  // Expose a ReactJS subreddit content available for GraphQL query
  const createRedditNode = (redditData, type) =>
    redditData.children.map(({ data }) => {
      const id = data.id
      const redditNode = {
        id,
        parent: null,
        internal: { type },
        children: [],
        item: data,
      }

      redditNode.internal.contentDigest = buildContentDigest(redditNode)

      createNode(redditNode)
    })

  createRedditNode(reddit.data.data, "Reddit")
}

exports.sourceNodes = async ({ boundActionCreators }) => {
  await createRedditSource(boundActionCreators)
}
