/**
 * Created by Administrator on 2017/8/15 0015.
 */

import React from 'react';
import uuid from 'uuid';
import './index.less';

import CreateBar from '../CreateBar/index.jsx';
import List from '../List/index.jsx';
import ItemEditor from '../ItemEditor/index.jsx';
import ItemShowLayer from '../ItemShowLayer/index.jsx';

class Deskmark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {id: 'id1', title: 'title1', content: 'content1&nbsp;', time: 1459030208359},
                {id: 'id2', title: 'title2', content: 'content2&nbsp;', time: 1458030408359}
            ],
            selectedId: null,    // 表示当前选择的内容
            editing: false       // 表示在编辑状态还是浏览状态
        };
        // this.selectItem = this.selectItem.bind(this);
        // this.saveItem = this.saveItem.bind(this);
        // this.deleteItem = this.deleteItem.bind(this);
        // this.createItem = this.createItem.bind(this);
        // this.editItem = this.editItem.bind(this);
        // this.cancelEdit = this.cancelEdit.bind(this);
    }

    // 选择某一个
    selectItem(id) {
        // alert('selectItem:' + id);
        if (id === this.state.selectedId) {
            return;
        }
        this.setState({
            selectedId: id,
            editing: false
        });
        console.log(this.state);
    }

    // 创建新文章 显示输入框
    createItem() {
        this.setState({
            selectedId: null,
            editing: true
        });
        console.log(this.state);
    }

    // 创建新文章 按钮
    saveItem(item) {
        // item是编辑器返回的对象，里面应该包括标题和内容
        console.log(item);
        let items = this.state.items;
        console.error(this.state);
        if (!item.id) {
            alert('没有这个ID的时候');
            item.id = uuid.v4();
            item.time = new Date().getTime();
            items = [...items, item];
            this.setState({
                items: items
            });
            console.log(this.state);
        } else {
            alert('有这个ID的时候');
            // items = items.map(
            //     exist=>(
            //         exist.id === item.id ? {
            //             exist: exist,
            //             item: item
            //         } : exist
            //     )
            // )
        }
        console.log(this.state);
    }

    // 取消创建、取消编辑
    cancelEdit() {
        this.setState({editing: false});
    }

    editItem(id) {
        this.setState({
            selectedId: id,
            editing: true
        });
    }

    // 删除某篇文章
    deleteItem(id) {
        if (!id)return;
        this.setState({
            items: this.state.items.filter(
                result=>result.id !== id
            )
        })
    }

    render() {
        const {items, selectedId, editing} = this.state;
        const selected = selectedId && items.find(item=>item.id === selectedId);
        const mainPart = editing ? (
            <ItemEditor item={selected} onCancel={this.cancelEdit.bind(this)} onSave={this.saveItem.bind(this)}/>
        ) : (
            <ItemShowLayer item={selected} onEdit={this.editItem.bind(this)} onDelete={this.deleteItem.bind(this)}/>
        );
        return (
            <section className="deskmark-component">
                <nav className="container-fuild">
                    <div className="text-center bg-danger">Nav</div>
                </nav>
                <div className="container-fluid bg-success">
                    <div className="col-md-6">
                        <CreateBar onClick111={this.createItem.bind(this)}/>
                        <hr />
                        <List onSelect={this.selectItem.bind(this)} items={this.state.items}/>
                    </div>
                    <div className="col-md-6">
                        {/*
                         <ItemEditor onSave={this.saveItem.bind(this)}/>
                         <div className="clearfix"></div>
                         <ItemShowLayer onEdit={this.editItem}/>
                         */}
                        {mainPart}
                    </div>
                </div>
            </section>
        );
    }
}

export default Deskmark;
