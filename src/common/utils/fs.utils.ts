const fs = require("fs").promises

export async function updateJsonFile(data: any) {
    try {
        await fs.writeFile("./data/sessions.json", JSON.stringify(data))
    } catch (error) {
        console.error(`Got an error trying to write to a file: ${error.message}`)
    }
}
