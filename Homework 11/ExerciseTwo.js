const fs = require('fs/promises')

const main_js_content = `const fs = require('fs/promises')

let index_js_content = \`const fs = require('fs/promises')
async function createMessageFile() {
    await fs.writeFile('../message.txt', 'Hello, World!')
    let content = await fs.readFile('../message.txt', 'utf-8');
    let reversed = content.split('').reverse().join('')
    await fs.writeFile('../message.txt', reversed)
}
createMessageFile()\`

async function main() {
    await fs.mkdir('folder', { recursive: true })
    await fs.writeFile('folder/index.js', index_js_content)
}
main()`

async function main() {
    await fs.mkdir('main_folder', { recursive: true })
    await fs.writeFile('main_folder/main.js', main_js_content)

}

main()

// node ExerciseTwo.js -> node main_folder/main.js -> node folder/index.js