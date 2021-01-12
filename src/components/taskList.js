import React, { Component } from 'react';
import TaskItem from './taskItem';
import { connect } from 'react-redux';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName : "",
            filterStatus : -1 //-1 all, 1 Kich hoat, 0 An
        }
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.props.onFilter(
            name==="filterName" ? value : this.state.filterName, 
            name === "filterStatus" ? value : this.state.filterStatus);
        this.setState({
            [name] : value
        });
    }

    render() {
        let {tasks} = this.props;
        const taskel = tasks.map((task, index) => {
            return <TaskItem key={task.id} index={index} task={task}
            />;
        });
        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" 
                                className="form-control" 
                                name="filterName" 
                                value={this.state.filterName}
                                onChange={this.onChange} />
                        </td>
                        <td>
                            <select className="form-control" 
                                name="filterStatus" 
                                value={this.state.filterStatus}
                                onChange={this.onChange}>
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    { taskel }
                </tbody>
            </table>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        tasks : state.tasks
    }
}

export default connect(mapStateToProp, null)(TaskList);
