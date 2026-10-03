class TrieNode {
    constructor(char) {
        this.char = char
        this.freq = 0
        this.isEnd = false
        this.children = []
    }
}

class TrieRoot {
    constructor() {
        this.freq = 0
        this.isEnd = false
        this.children = []
    }
}

class Trie {
    constructor() {
        this.root = new TrieRoot()
    }

    throwAllWords(words) {
        for (let { word, freq } of words) {
            this.throwWord(word, freq)
        }
        console.log("all valid words was added")
    }

    throwWord(word, freq) {
        if (typeof word !== "string") {
            console.log(`symbol <${JSON.stringify(word)}> is not a string!`)
            return
        } if (word.length < 1) {
            console.log(`symbol <${word}> is not a word`)
            return
        } if (typeof freq !== "number") {
            console.log(`value of atribute freq must be a number: freq: <${freq}>`)
            return
        } if (freq < 0) {
            console.log(`freq <${freq}> less then 0`)
            return
        } if (this.searchWord(word) === true) {
            console.log(`word <${word}> already exist`)
            return
        }

        let curNode = this.root

        for (let char of word) {

            let isCharExist = false

            for (let childNode of curNode.children) {
                if (childNode.char === char) {
                    curNode = childNode
                    isCharExist = true
                }
            }

            if (!isCharExist) {
                const newNode = new TrieNode(char)
                curNode.children.push(newNode)
                curNode = newNode
            }

            curNode.freq += freq
        }

        curNode.isEnd = true

        console.log(`(throw word success, <data object> {word: ${word}, freq: ${freq}} was added)`)
        return
    }

    searchWord(word) {
        let curNode = this.root

        for (let char of word) {

            let isChar = false

            for (let childNode of curNode.children) {
                if (childNode.char === char) {
                    curNode = childNode
                    isChar = true
                }
            }

            if (!isChar) {
                return false
            }
        }

        return curNode.isEnd
    }

    autocomplete(prefix) {
        let curNode = this.root

        for (let char of prefix) {
            let next = curNode.children.find(c => c.char === char)
            if (!next) return []
            curNode = next
        }

        const heap = []
        const K = 5

        const push = (item) => {
            heap.push(item)
            let i = heap.length - 1
            while (i > 0) {
                const p = (i - 1) >> 1
                if (heap[p].freq <= heap[i].freq) break;
                [heap[p], heap[i]] = [heap[i], heap[p]]
                i = p
            }
        }

        const replaceRoot = (item) => {
            heap[0] = item
            let i = 0
            while (true) {
                const l = 2 * i + 1, r = 2 * i + 2
                let s = i
                if (l < heap.length && heap[l].freq < heap[s].freq) s = l
                if (r < heap.length && heap[r].freq < heap[s].freq) s = r
                if (s === i) break;
                [heap[i], heap[s]] = [heap[s], heap[i]]
                i = s
            }
        }

        const dfs = (node, word) => {
            if (node.isEnd) {
                const item = { word, freq: node.freq }
                if (heap.length < K) push(item)
                else if (item.freq > heap[0].freq) replaceRoot(item)
            }
            for (const child of node.children) {
                if (heap.length === K && child.freq <= heap[0].freq) continue
                dfs(child, word + child.char)
            }
        }

        dfs(curNode, prefix)

        const result = []
        while (heap.length) {
            result.push(heap[0].word)
            const last = heap.pop()
            if (heap.length) {
                heap[0] = last
                let i = 0
                while (true) {
                    const l = 2 * i + 1, r = 2 * i + 2
                    let s = i
                    if (l < heap.length && heap[l].freq < heap[s].freq) s = l
                    if (r < heap.length && heap[r].freq < heap[s].freq) s = r
                    if (s === i) break;
                    [heap[i], heap[s]] = [heap[s], heap[i]]
                    i = s
                }
            }
        }

        return result.reverse()
    }

    clearTrie() {
        this.root = new TrieRoot()
    }
}

module.exports = { Trie, TrieRoot, TrieNode }