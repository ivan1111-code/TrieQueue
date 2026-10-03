const fs = require("fs")

const printTrieService = (trie, trieFilePath) => {
    fs.writeFileSync(trieFilePath, JSON.stringify(trie, null, 4))
}

module.exports = { printTrieService }