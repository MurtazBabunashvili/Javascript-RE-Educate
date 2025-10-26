const http = require("http")
const PORT = 8000
const url = require("url")
const querystring = require("querystring")
const { read, write, fetch_API, pagination } = require("./utils/helper.js")

// შევქმნათ users.json და posts.json API-ების და-fetch-ვით.

async function initialize() {
    let users = await fetch_API("https://jsonplaceholder.typicode.com/users")
    let posts = await fetch_API("https://jsonplaceholder.typicode.com/posts")

    await write("users.json", users)
    await write("posts.json", posts)
}

initialize()

//შევქმნათ სერვერი

const server = http.createServer(async (req, res) => {
    res.writeHead(200, { "content-type": "application/json" })
    const parsedURL = url.parse(req.url)
    const query = querystring.parse(parsedURL.query)
    console.log(query)
    const parseUserData = await read("users.json", true)
    const parsePostsData = await read("posts.json", true)

    if (parsedURL.pathname === "/") {
        return res.end("Hello world")
    } else if (parsedURL.pathname === "/users") {
        let users = parseUserData
        if (query.id) {
            users = users.filter(el => el.id === Number(query.id))
        } else if (query.name) {
            users = users.filter(el => el.name.toLowerCase() === query.name.toLowerCase())
        }
        let page = Number(query.page) || 1
        let limit = Number(query.limit) || 5
        let paginated = pagination(users, page, limit)

        return res.end(JSON.stringify(paginated))

    } else if (parsedURL.pathname === "/posts") {
        let posts = parsePostsData

        if (query.id) {
            posts = posts.filter(el => el.id === Number(query.id))
        } else if (query.title) {
            posts = posts.filter(el => el.title.toLowerCase() === query.title.toLowerCase())
        }
        let page = Number(query.page) || 1
        let limit = Number(query.limit) || 5
        let paginated = pagination(posts, page, limit)

        return res.end(JSON.stringify(paginated))
    }
})

server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})