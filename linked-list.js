/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let node = new Node(val)
    if(this.head===null){this.head =node; this.tail=node}
    
    this.tail.next= node;
    this.tail=node
    this.length+=1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let node = new Node(val)
    if(this.head===null){this.head =node; this.tail=node}
    node.next=this.head;
    this.head=node
    this.length+=1;

  }

  /** pop(): return & remove last item. */

  pop() {
    if(this.length===0){throw new Error('LinkedList.pop is not valid on empty lists')}
    this.length-=1;
    let prev;
    let current= this.head
    if(this.head===null)return undefined;
    while(current.next!==null){
      prev=current;
      current = current.next
    }
    if(prev){
      this.tail = prev;
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
    let node = this.head.next
    let temp = this.head
    this.head=node;
    if(this.length<=0){
      this.head=null;
      this.tail=null;
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
    if(idx > this.length)throw new Error(`Invalid index ${idx}`)
    let current = {node:this.head,index:0};
    while(current.index!==idx ){
      current.node = current.node.next
      current.index++;
    }
    current.node.val=val
    return current.node.val

  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let current = {node:this.head,index:0};
    let prev;
    switch(idx){
      case 0: 
        return this.unshift(val);
      case this.length:
        return this.push(val)
      default:
        if(idx > this.length)throw new Error(`Invalid index ${idx}`)
        while(current.index!==idx ){
          prev=current.node
          current.node = current.node.next
          current.index++;
        }
        let node = new Node(val)
        node.next=current.node
        prev.next=node;
        this.length++     
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let current = {node:this.head,index:0};
    let prev;
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
          prev=current.node
          current.node = current.node.next
          next=current.node.next
          current.index++;
        }
        prev.next=next;

    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if(this.length===0){return 0}
    let acc= {val:0,indx:0};
    let current = this.head;
    while(current!==null){
      acc.val+=current.val;
      acc.indx+=1;
      current= current.next;
    }
    return acc.val/acc.indx;
  }
}

module.exports = LinkedList;
