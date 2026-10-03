const fs = require("fs")
const { Trie } = require("./trie")
const { PriorityQueue } = require("./queue")

const trie = new Trie()

const { words } = JSON.parse(fs.readFileSync("./words.json"))

trie.throwAllWords(words)

const queue = new PriorityQueue(trie)

module.exports = { trie, queue }