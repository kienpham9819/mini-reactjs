import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/taskForm';
import Control from './components/control';
import TaskList from './components/taskList';
import _, { findIndex } from 'lodash';

class App extends Component{
    constructor (props) {
        super(props);
        this.state = {
            tasks : [],
            displayForm : true,
            updateTask : null,
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
    componentWillMount(){
        if (localStorage && localStorage.getItem('tasks')) {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            });
        }
    }

    onToggleForm = () => {
        if (this.state.displayForm && this.state.updateTask!==null) {
            this.setState({
                displayForm : true,
                updateTask : null
            });
        } else {
            this.setState({
                displayForm : !this.state.displayForm,
                updateTask : null
            });
        }
    }

    onCloseForm = () => {
        this.setState ({
            displayForm : false
        });
    }

    onSubmit = (data) => {
        let { tasks } = this.state;
        if (data.id==="") {
            data.id = Math.random();
        console.log(data);
            tasks.push(data);
        } else {
            let index = this.findById(data.id);
            tasks[index] = data;
        }
        
        this.setState({
            tasks : tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        // let result = this.findById(id);
        let {tasks} = this.state;
        let result  = findIndex(tasks, function(task){
            return task.id ===id;
        });
        if(result!==-1) {
            tasks[result].status = !tasks[result].status;
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks' ,JSON.stringify(tasks));
        }
    }

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
    onDelete = (id) => {
        let result = this.findById(id);
        let {tasks} = this.state;
        if(result!==-1) {
            tasks.splice(result, 1);
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks' ,JSON.stringify(tasks));
        }
        this.onCloseForm();
    }
    onShowForm = () => {
        this.setState({
            displayForm : true
        })
    }

    onUpdate = (id) => {
        let {tasks} = this.state;
        let index = this.findById(id);
        this.setState ({
            updateTask : tasks[index]
        });
        this.onShowForm();
    }

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
        console.log(keyword);
        this.setState({
            keyword : keyword
        });
        console.log(this.state);
    }
    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        });
        console.log(this.state);
    }

    render () {
        let { tasks,
         displayForm, 
         updateTask, 
         filter, 
         keyword,
         sortBy,
         sortValue } = this.state;
        let isDisplayForm = displayForm ? <TaskForm
            onCloseForm={this.onCloseForm}
            onSubmit={this.onSubmit}
            task={updateTask}
        /> : '';

        if (filter) {
            if (filter.name) {
                tasks= _.filter(tasks, (task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !==-1;
                });
            }

            tasks = _.filter(tasks, (task) => {
                if (filter.status===-1) {
                    return task;
                } else {
                    return task.status === (filter.status===1 ? true : false);
                }
            });
        }

        if (keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase())!== -1;
            });
        }

        if (sortBy==="name") {
            tasks.sort((a,b) => {
                if (a.name > b.name) return sortValue;
                else if (a.name < b.name) return -sortValue;
                else return 0;
            })
        } else {
            tasks.sort((a,b) => {
                if (a.status > b.status) return -sortValue;
                else if (a.status < b.status) return sortValue;
                else return 0;
            })
        }
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={ displayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "" }>
                       { isDisplayForm }
                    </div>
                    <div className={ displayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
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
                                <TaskList tasks={ tasks } 
                                    onUpdateStatus={this.onUpdateStatus}
                                    onDelete={this.onDelete} 
                                    onUpdate={this.onUpdate}
                                    onFilter={this.onFilter}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
}

export default App;
