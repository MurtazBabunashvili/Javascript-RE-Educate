const fs = require('fs/promises')

async function deleteFoldersOnly() {
    await fs.mkdir('folder1', { recursive: true })
    await fs.mkdir('folder2', { recursive: true })

    await fs.writeFile('file1.txt', 'First file')
    await fs.writeFile('file2.txt', 'Second file')
    await fs.writeFile('file3.txt', 'Third file')
    let info = await fs.readdir(__dirname)
    console.log('Before deletion:', info)
    for (let item of info) {
        let stats = await fs.lstat(item)
        if (stats.isDirectory()) {
            await fs.rm(item, { recursive: true })
        }
    }
    info = await fs.readdir(__dirname)
    console.log('After deletion:', info)
}

deleteFoldersOnly()
