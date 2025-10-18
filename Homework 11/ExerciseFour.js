const http = require('http')

const animals = [
    { id: 1, name: 'Lion' },
    { id: 2, name: 'Tiger' },
    { id: 3, name: 'Elephant' }
]

const cars = [
    { name: 'Toyota', model: 'Corolla' },
    { name: 'Honda', model: 'Civic' },
    { name: 'Ford', model: 'Mustang' }
]

const motorcycle = [
    { name: 'Harley-Davidson', type: 'Cruiser' },
    { name: 'Ducati', type: 'Sport' },
    { name: 'Kawasaki', type: 'Naked' }
]

const server = http.createServer((req, res) => {
    if (req.url === '/animals') {
        res.writeHead(200, { "content-type": 'application/json' })
        res.write(JSON.stringify(animals))
    }
    if (req.url === '/cars') {
        res.writeHead(200, { "content-type": 'application/json' })
        res.write(JSON.stringify(cars))
    }
    if (req.url === '/motorcycle') {
        res.writeHead(200, { "content-type": 'application/json' })
        res.write(JSON.stringify(motorcycle))
    }
    res.end()
})
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})