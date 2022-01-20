
// 被观察者
class Subject {
  constructor(name) {
    this.name = name
    this.observers = []
    this.state = '开心'
  }
  attach(o) {
    this.observers.push(o)
  }
  setState(newState) {
    this.state = newState
    // 通知所有的观察者我发生了变化
    this.observers.forEach(o => o.update(this)) // this=>Subject的实例baby
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update(s) { // 传入被观察者实例，就可以获取实例上的属性
    console.log(`我是${this.name}:当前的宝宝状态`, s.state)
  }
}

const baby = new Subject('小宝宝')
const m = new Observer('妈妈')
const f = new Observer('爸爸')
baby.attach(m)
baby.attach(f)
baby.setState('不开心')
setTimeout(() => {
  baby.setState('又开心了')
}, 1000)

