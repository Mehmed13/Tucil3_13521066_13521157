// class PrioQueue adalah class yang digunakan untuk membuat queue dengan prioritas berdasarkan cost yang dimiliki, terurut menaik
// Attribute:
// - items: object yang berisi item-item yang ada di queue => item yang digunakan bertipe Route
// - headIndex: index dari item yang paling depan

class PrioQueue {
    // ctor
    constructor() {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
    }

    // Method
    enqueue(item) {
        // Jika kosong, langsung masukkan route pada queue
        if (this.isEmpty()) {
            this.items[this.tailIndex] = item;
            this.tailIndex++;
        } else {
            // Jika tidak kosong Lakukan insertion sort, terurut menaik berdasarkan cost
            let i = this.headIndex;
            let found = false;
            while ((i < this.tailIndex) && (!found)) {
                if ((this.items[i].getCost() + this.items[i].getCurrentNode().getHeuristic()) > (item.getCost() + item.getCurrentNode().getHeuristic())) {
                    found = true;
                } else {
                    i++;
                }
            }
            if (!found) {
                // Masukkan item pada index tailIndex
                this.items[this.tailIndex] = item;
            } else {
                // Masukkan item pada index i
                for (let j = i; j < this.tailIndex; j++) {
                    this.items[j + 1] = this.items[j];
                }
                this.items[i] = item;
            }
            this.tailIndex++;
        }
    }
    dequeue() {
        const item = this.items[this.headIndex];
        delete this.items[this.headIndex];
        this.headIndex++;
        return item;
    }
    peek() {
        return this.items[this.headIndex];
    }

    // isEmpty function
    isEmpty() {
        // return true if the queue is empty.
        return this.headIndex == this.tailIndex;
    }
    print() {
        let str = "";
        for (let i = this.headIndex; i < this.tailIndex; i++) {
            str += this.items[i].getCurrentNode().getName() + ", " + (this.items[i].getCost() + this.items[i].getCurrentNode().getHeuristic()).toString() + "; ";
        }
        console.log(str);
    }
}

// module.exports = { PrioQueue };
export { PrioQueue };