window.dom = {

  // 查

  create(string) {
    // return document.createElement(tagName);
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  wrap(node, parent) {
    dom.before(node, parent)
    dom.append(parent, node)
  },

  // 删

  remove(node) {
    node.parentNode.removeChild(node) //让这个节点的爸爸,删除它的儿子
    return node //返回移除的对象
  },
  empty(node) { //干掉这个节点的所有儿子
    // node.innerHTML = '' 可以用这个,但是不能获取引用节点
    // const childNodes = node.childNodes 这个是语法
    // const { childNodes } = node  上面语法的简写
    const array = []  //引用,需要创建一个空数组
    let x = node.firstChild //找到第一个儿子
    while (x) { //当x存在时,我就把他移除,然后放到我的数组里面
      array.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return array
  },


  //改 

  attr(node, name, value) { //这叫重载
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  test(node, string) { //适配
    if (arguments.length === 2) {
      if ('innerText' in node) {
        node.innerText = string //ie
      } else {
        node.textContent = string //firefox/Chrome
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        //dom.style(div,'color')
        return node.style[name]
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        const object = name
        for (let key in object) {
          node.style[key] = object[key]
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      return node.classList.contains(className)
    }
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
    //意思:如果有scope,那我就在scope里面调用querySelectorAll;如果没有,那就在document里面调用querySelectorAll
  },
  parent(node) {
    return node.parentNode
  },
  children(node) {
    return node.children
  },
  siblings(node) {
    return Array.from(node.parentNode.children)
      //伪数组变成数组
      .filter(n => n !== node)
    //之后对它进行过滤,只要这个数组不等于当前这个节点,就把它放到这个数组里面
  },
  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      //如果x存在且不是文本,那就运行下一个,如果是就返回
      x = x.previousSibling
    }
    return x
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  },
  index(node) {
    const list = dom.children(node.parentNode)
    //获取它爸爸的儿子,并把儿子叫list
    let i
    for (i = 0; i < list.length; i++) {//遍历这个list
      if (list[i] === node) {//然后每个和它做对比
        break  //如果等于就别动了
      }
    }
    return i
  }
};



// dom.create = function () { }; 可以写外面,也可以写window.dom里面;