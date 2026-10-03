class Request {
    constructor(priority, prefix) {
        this.priority = priority
        this.prefix = prefix
    }
}

class PriorityQueue {
    constructor(trie) {
        this.trie = trie
        this.queue = []
    }

    enqueue(priority, prefix) {
        if (![0, 1].includes(priority)) {
            return "priority must be 0 or 1"
        }

        if (typeof prefix !== "string") {
            return "prefix must be a string (prefix)"
        }

        if (prefix.length >= 30) {
            return "prefix must be less then 30 symbols"
        }

        this.queue.push(new Request(priority, prefix))
    }

    dequeue() {
        for (let request = 0; request < this.queue.length; request++) {
            if (this.queue[request].priority === 1) {
                const mostPriority = this.queue[request]
                this.queue.splice(request, 1)
                return mostPriority.prefix
            }
        }
        const restPriority = this.queue[0]
        this.queue.splice(0, 1)
        return restPriority.prefix
    }
}

module.exports = { Request, PriorityQueue }