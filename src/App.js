import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/taskForm';
import Control from './components/control';
import TaskList from './components/taskList';
import _, { findIndex } from 'lodash';
import demo from './tranning/demo';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component{
    constructor (props) {
        super(props);
        this.state = {
            filter : {
                name : "",
                status : -1
            },
            keyword : '',
            sortBy : "name",
            sortValue : 1
        };
    }
    onGenerate = () => {
        let tasks = [
            {id: 1, name : 'hoc lap trinh', status :true},
            {id: 2, name : 'hoc vo', status :true},
            {id: 3, name : 'hoc choi', status :false}
        ];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
   
    onToggleForm = () => {
        this.props.onToggleForm();
    }
    

    // onUpdateStatus = (id) => {
    //     let {tasks} = this.state;
    //     let result  = findIndex(tasks, function(task){
    //         return task.id ===id;
    //     });
    //     if(result!==-1) {
    //         tasks[result].status = !tasks[result].status;
    //         this.setState({
    //             tasks : tasks
    //         });
    //         localStorage.setItem('tasks' ,JSON.stringify(tasks));
    //     }
    // }

    findById (id) {
        let {tasks} = this.state;
        let result  = -1;
        tasks.forEach((task,index) => {
            if(task.id === id) {
                result = index;
            }
        });

        return result;
    }
    // onDelete = (id) => {
    //     let result = this.findById(id);
    //     let {tasks} = this.state;
    //     if(result!==-1) {
    //         tasks.splice(result, 1);
    //         this.setState({
    //             tasks : tasks
    //         });
    //         localStorage.setItem('tasks' ,JSON.stringify(tasks));
    //     }
    //     this.onCloseForm();
    // }
    onShowForm = () => {
        this.setState({
            displayForm : true
        })
    }

    // onUpdate = (id) => {
    //     let {tasks} = this.state;
    //     let index = this.findById(id);
    //     this.setState ({
    //         updateTask : tasks[index]
    //     });
    //     this.onShowForm();
    // }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        });
    }
    onSearch = (keyword) => {
        this.setState({
            keyword : keyword
        });
    }
    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        });
    }

    render () {
        let { 
         sortBy,
         sortValue } = this.state;

        let { isDisplayForm } = this.props;

        // if (filter) {
        //     if (filter.name) {
        //         tasks= _.filter(tasks, (task) => {
        //             return task.name.toLowerCase().indexOf(filter.name) !==-1;
        //         });
        //     }

        //     tasks = _.filter(tasks, (task) => {
        //         if (filter.status===-1) {
        //             return task;
        //         } else {
        //             return task.status === (filter.status===1 ? true : false);
        //         }
        //     });
        // }

        // if (keyword) {
        //     tasks = tasks.filter((task) => {
        //         return task.name.toLowerCase().indexOf(keyword.toLowerCase())!== -1;
        //     });
        // }

        // if (sortBy==="name") {
        //     tasks.sort((a,b) => {
        //         if (a.name > b.name) return sortValue;
        //         else if (a.name < b.name) return -sortValue;
        //         else return 0;
        //     })
        // } else {
        //     tasks.sort((a,b) => {
        //         if (a.status > b.status) return -sortValue;
        //         else if (a.status < b.status) return sortValue;
        //         else return 0;
        //     })
        // }
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "" }>
                        <TaskForm /> 
                    </div>
                    <div className={ isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
                        <button type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <button type="button"
                            className="btn btn-warning"
                            onClick={this.onGenerate}>
                            Generate Data
                        </button>
                        <Control onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}/>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList onFilter={this.onFilter}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm
    };
}

const mapDispatchToProps = (dispatch,props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
