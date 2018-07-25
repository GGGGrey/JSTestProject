function My$(id) {
    return document.getElementById(id);
}

//兼容代码
function setInnerText(element,text) {
    //判断浏览器是否支持这个属性
    if(element.textContent){//支持谷歌、火狐、IE8+
            element.textContent=text;
    }else{//不支持IE8
        element.innerText=text;
    }
}
function getInnerText(element) {
    if(element.textContent){
        return element.textContent;
    }else {
        return element.innerText;
    }
}

//获取元素兼容代码
//1.获取第一个子元素
function getFirstElementChild(element) {
    if(element.firstElementChild){
        return element.firstElementChild;
    }else{//IE8不支持
        var node=element.firstChild;
        while(node&&node.nodeType!=1){//防止有的浏览器获取的是子节点，遍历直到node为标签类型
            node=node.nextSibling;
        }
        return node;
    }
}
//2.获取最后一个子元素
function getLastElementChild(element) {
    if(element.lastElementChild){
        return element.lastElementChild;
    }else{//IE8不支持
        var node=element.lastChild;
        while(node&&node.nodeType!=1){//防止有的浏览器获取的是子节点，遍历直到node为标签类型
            node=node.previousSibling;
        }
        return node;
    }
}

//为元素绑定事件兼容代码
function  addEventListener(element,type,fn) {
    if(element.addEventListener){   //火狐、谷歌
        element.addEventListener(type,fn,false);
    }else if(element.attachEvent){  //IE8
        element.attachEvent("on"+type,fn);
    }else{                      //其他
        element["on"+type]=fn;
    }
}
