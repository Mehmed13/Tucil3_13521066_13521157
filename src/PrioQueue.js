// class PrioQueue adalah class yang digunakan untuk membuat queue dengan prioritas berdasarkan cost yang dimiliki, terurut menaik
// Attribute:
// - items: object yang berisi item-item yang ada di queue => item yang digunakan bertipe Route
// - headIndex: index dari item yang paling depan

class PrioQueue {
    constructor() {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
    }
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
                if (this.items[i].getCost() > item.getCost()) {
                    // Masukkan item pada index i
                    this.items[this.tailIndex] = item;
                    this.tailIndex++;
                    found = true;
                } else {
                    i++;
                }
            }
            if (!found) {
                // Masukkan item pada index tailIndex
                this.items[this.tailIndex] = item;
                this.tailIndex++;
            }
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
        return this.items.length == 0;
    }
    print() {
        let str = "";
        for (let i = this.headIndex; i < this.tailIndex; i++) {
            str += this.items[i] + "; ";
        }
        console.log(str);
    }
}

module.exports = { PrioQueue };