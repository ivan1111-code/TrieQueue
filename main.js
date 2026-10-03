const { trie, queue } = require("./init")
const { printTrieService } = require("./trieService")

printTrieService(trie, "./trie.json")

queue.enqueue(1, "app")
queue.enqueue(0, "b")


while (queue.queue.length > 0) {
    console.log(trie.autocomplete(queue.dequeue()))
}