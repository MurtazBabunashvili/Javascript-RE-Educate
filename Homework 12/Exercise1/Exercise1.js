const { read, write } = require("../utils/helpers")

async function create_file() {
    await write("firstfile.txt", "Text1")
    await write("secondfile.txt", "text2")

    let first_data = await read('firstfile.txt')
    let second_data = await read("secondfile.txt", false)
    return first_data + " " + second_data
}


create_file().then(result => console.log(result))
