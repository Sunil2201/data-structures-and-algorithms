type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;

        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("Oh no! You can't do that");
        } else if (idx == this.length) {
            this.append(item);
            return;
        } else if (idx == 0) {
            this.prepend(item);
            return;
        }

        this.length++;
        let curr = this.head;
        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }

        curr = curr as Node<T>;
        const node = { value: item } as Node<T>;

        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;
        if (node.prev) {
            node.prev.next = node;
        }
    }

    append(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;

        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; ++i) {
            if (curr.value === item) {
                break;
            }

            curr = curr.next;
        }

        if (!curr) {
            return undefined;
        }

        if (this.length === 1) {
            const out = this.head?.value
            this.head = this.tail = undefined;
            return out;
        } else {
            if (curr.prev) {
                curr.prev.next = curr.next;
            }

            if (curr.next) {
                curr.next.prev = curr.prev;
            }

            if (curr === this.head) {
                this.head = curr.next;
            }

            if (curr === this.tail) {
                this.tail = curr.prev;
            }
        }

        this.length--;
        curr.prev = curr.next = undefined;
        return curr.value;
    }
    get(idx: number): T | undefined {}
    removeAt(idx: number): T | undefined {}
}
