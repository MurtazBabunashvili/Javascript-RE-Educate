const fs = require('fs/promises')

async function combineTxtFiles() {
    await fs.mkdir('my_folder', { recursive: true })
    await fs.writeFile('my_folder/file1.txt', 'First file')
    await fs.writeFile('my_folder/file2.txt', 'Second file')
    await fs.writeFile('my_folder/file3.txt', 'Third file')
    await fs.writeFile('my_folder/first.js', 'console.log("Hello World")')
    await fs.writeFile('my_folder/second.js', 'console.log("Hello World")')
    await fs.writeFile('my_folder/third.js', 'console.log("Hello World")')

    let items = await fs.readdir('my_folder')
    let allTxtContent = ""
    for (let item of items) {
        if (item.endsWith('.txt')) {
            let content = await fs.readFile('my_folder/' + item, 'utf-8')
            allTxtContent += content + '\n'
        }
    }
    await fs.writeFile('my_folder/all.txt', allTxtContent)
}

combineTxtFiles()
