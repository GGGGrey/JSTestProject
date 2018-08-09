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
    if(element.addEventListener){   //火狐、谷歌、IE11
        element.addEventListener(type,fn,false);
    }else if(element.attachEvent){  //IE8
        element.attachEvent("on"+type,fn);
    }else{                      //其他
        element["on"+type]=fn;
    }
}
function  removeEventListener(element,type,fnName) {
    if(element.removeEventListener){   //火狐、谷歌、IE11
        element.removeEventListener(type,fnName,false);
    }else if(element.detachEvent){  //IE8
        element.detachEvent("on"+type,fnName);
    }else{                      //其他
        element["on"+type]=null;
    }
}

//获取滚动距离的函数getScroll.left||.top
function getScroll() {
    return {
        left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,
        top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
    };
}

// 获取元素计算后的样式属性值
function getStyle(element,attr) {
    return window.getComputedStyle?window.getComputedStyle(element,null)[attr]:element.currentStyle[attr]||0;
}

//多种属性修改变速动画函数
function animate(element, json) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        //判断是否全部到达目标值
        var flag=true;
        for (var attr in json) {
            var current = parseInt(getStyle(element, attr));
            var target = json[attr];
            //每次移动距离,变速快到慢
            var step = (target - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //当前移动的位置
            current += step;
            element.style[attr] = current + "px";
            if(current!=target){//判断是否有任意一项未达到目标值
                flag=false;
            }
            if(flag){
                clearInterval(element.timeId);
            }
        }
    }, 50);
}