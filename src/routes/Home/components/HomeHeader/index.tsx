import React, { useState, CSSProperties } from 'react';
import { BarsOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';
//ts默认不支持png格式,需要添加images.d.ts声明文件以支持加载png
import logo from '../../../../assets/images/logo.jpg';

import './index.less';
const duration = 300;
//默认样式
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}
interface TransitionStyles {
    entering: CSSProperties;//进入时的样式
    entered: CSSProperties;//进入成功时的样式
    exiting: CSSProperties;//退出时的样式
    exited: CSSProperties;//退出成功时的样式
}
const transitionStyles: TransitionStyles = {
    entering: { opacity: 1 },//不透明度为1
    entered: { opacity: 1 }, //不透明度为1
    exiting: { opacity: 0 }, //不透明度为0
    exited: { opacity: 0 },  //不透明度为0
};


interface Props {
    currentCategory: string;//当前选中的分类 此数据会放在redux仓库中
    setCurrentCategory: (currentCategory: string) => any;// 改变仓库中的分类
}
function HomeHeader(props: Props) {
    let [isMenuVisible, setIsMenuVisible] = useState(false);//设定标识位表示菜单是否显示
    //设置当前分类,把当前选中的分类传递给redux仓库
    const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
        let target: HTMLUListElement = event.target as HTMLUListElement;
        let category = target.dataset.category;//获取用户选择的分类名称
        props.setCurrentCategory(category);//设置分类名称
        setIsMenuVisible(false);//关闭分类选择层
    }
    return (
        <header className="home-header">
            <div className="logo-header">
                <img src={logo} />
                <BarsOutlined onClick={() => setIsMenuVisible(!isMenuVisible)} />
            </div>
            <Transition in={isMenuVisible} timeout={duration}>
                {
                    (state: keyof TransitionStyles) => (
                        <ul
                            className="category"
                            onClick={setCurrentCategory}
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                            <li data-category="all" className={classnames({ active: props.currentCategory === 'all' })}>全部课程</li>
                            <li data-category="react" className={classnames({ active: props.currentCategory === 'react' })}>React课程</li>
                            <li data-category="vue" className={classnames({ active: props.currentCategory === 'vue' })}>Vue课程</li>
                        </ul>
                    )
                }
            </Transition>
        </header>
    )
}
export default HomeHeader;