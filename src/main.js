const div = dom.create("<div>newDiv</div>");
console.log(div);

dom.after(test, div);

const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test, div3);

// 删 

const nodes = dom.empty(window.empty) //获取所有的节点
console.log(nodes);


// 改

dom.attr(test, 'title', 'Hi,I am wxh') //三个参数写
const title = dom.attr(test, 'title')//两个参数读
console.log(`title:${title}`)//读完后输出


dom.test(test, '你好,这是新的内容')
dom.test(test)

dom.style(test, { border: '1px solid red', color: 'blue' });
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid black')


dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'blue')
console.log(dom.class.has(test, 'blue'))



// 监听

const fn = () => {
  console.log('点击了')

}

dom.on(test, 'click', fn)
// 删除监听
dom.off(test, 'click', fn)


//查

const testDiv = dom.find('#test')[0]
console.log(testDiv)

const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0])


console.log(dom.parent(test))



s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))


//遍历所有节点
const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))
//找到所有t的children,对它进行集体操作,每一个用n占位的color:red


//元素排名第几
console.log(dom.index(s2))

