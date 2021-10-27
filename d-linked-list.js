/** Node: node for a singly linked list. */

class Node {
constructor(val) {
    this.val = val;
    this.next = null;
    this.prev=null
}
}

/** LinkedList: chained together nodes. */

class DoubleLinkedList {
    constructor(vals = []) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        for (let val of vals) this.push(val);
    }
    /**
     * 
     * Read(): retriev each node into an array for reading. 
     */
    read(){
        if(this.length===0){return null}
        let current = this.head;
        let arr=[];
        while(current!==null){
            arr.push(current.val)
            current=current.next;
        }
        return arr;

    }

    /** push(val): add new value to end of list. */

    push(val) {
        let node = new Node(val)
        if(this.head===null){
            this.head=node; 
            this.tail=node
        }
        else{
            let temp = this.tail
            temp.next= node;
            node.prev=temp;
            this.tail=node
        }
        this.length++;
    }

    /** unshift(val): add new value to start of list. */

    unshift(val) {
        let node = new Node(val)
        if(this.head===null){
            this.head =node; 
            this.tail=node
        }
        else{
            let temp = this.head;
            temp.prev = node;
            node.next=temp
            this.head=node;
        }
        this.length++
    }

    /** pop(): return & remove last item. */

    pop() {
        if(this.length===0){throw new Error('LinkedList.pop is not valid on empty lists')}
        this.length-=1;
        let current= this.head;
        if(current===null)return undefined;
        while(current.next!==null){
            current = current.next
        }
        if(current.prev){
            this.tail = current.prev;
            this.tail.next=null;
        }
        else{
            this.tail=null;
            this.head=null;
        }
        
        return current.val;

    }

    /** shift(): return & remove first item. */
    shift() {
        this.length-=1;
        let temp = this.head
        if(this.length<=0){
            this.head=null;
            this.tail=null;
        }
        else{
            let node = this.head.next
            this.head=node;
            node.prev=null;
        }
        return temp.val

    }

    /** getAt(idx): get val at idx. */

    getAt(idx) {
        if(idx>this.length-1)throw new Error(`Invalid index ${idx}`)
        let current = {node:this.head,index:0};
        while(current.index!==idx ){
            current.node = current.node.next
            current.index++;
        }
        return current.node.val

    }

    /** setAt(idx, val): set val at idx to val */

    setAt(idx, val) {
        if(idx > this.length || idx < 0)throw new Error(`Invalid index ${idx}`)
        if(idx===this.length){
            this.push(val)
        }
        else{
            let current = {node:this.head,index:0};
            while(current.index!==idx ){
                current.node = current.node.next
                current.index++;
            }
            current.node.val=val
            return current.node.val
        }
    }

    /** insertAt(idx, val): add node w/val before idx. */

    insertAt(idx, val) {
        let current = {node:this.head,index:0};
        switch(idx){
        case 0: 
            return this.unshift(val);
        case this.length:
            return this.push(val)
        default:
            if(idx > this.length)throw new Error(`Invalid index ${idx}`)
            while(current.index!==idx ){
            current.node = current.node.next
            current.index++;
            }
            let node = new Node(val);
            let prev = current.node.prev;
            node.next=current.node
            node.prev=prev;
            prev.next=node;
            current.prev=node;
            this.length++     
        }
    }

    /** removeAt(idx): return & remove item at idx, */

    removeAt(idx) {
        let current = {node:this.head,index:0};
        let next;
        switch(idx){
        case 0:
            this.shift()
            break
        case this.length:
            this.pop()
            break
        default:
            if(idx > this.length)throw new Error(`Invalid index ${idx}`)
            while(current.index!==idx ){
                current.node = current.node.next
                current.index++;
            }
            let{prev, next} = current
            prev.next=next;
            next.prev=prev;

        }
    }

    /** average(): return an average of all values in the list */

    average() {
        if(this.length===0){return 0}
        let acc= {val:0,indx:0};
        let current = this.tail;
        while(current!==null){
            acc.val+=current.val;
            acc.indx+=1;
            current= current.prev;
        }
        return acc.val/acc.indx;
    }
    reverse(){
        let current = this.head;
        [this.head,this.tail] = [this.tail,this.head]
        while(current!==null){
            [current.prev,current.next]=[current.next,current.prev]
            current = current.prev;
        }
    }
    static sort(list1,list2){
        let current1=list1.head
        let current2=list2.head
        let vals=[]
        while(current1!==null || current2!==null){
            if(current1===null) {
                vals.push(current2);
                current2=current2.next;
            }
            else if(current2===null){
                vals.push(current1);
                current1=current1.next;
                
            }
            else if(current2.val<current1.val){
                vals.push(current2.val)
                current2=current2.next;
            }
            else{
                vals.push(current1.val)
                current1=current1.next;

            }
        }
        return new DoubleLinkedList(vals)
    }
}

module.exports = DoubleLinkedList;
