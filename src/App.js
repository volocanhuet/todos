import React, {  Component } from 'react';
import {Col, Row,Button,InputGroup,  InputGroupAddon, Input,Table 
} from 'reactstrap';
import "./App.css"

import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"




class App extends Component {
  constructor(props) {
    super()
    this.state = {
      isDisplayForm : false,
      tasks : [],
      taskEdit : null,
      name : "",
      sort: null
      
      
    }

  }
componentWillMount() {
  if(localStorage && localStorage.getItem('tasks')) {
    var tasks = JSON.parse(localStorage.getItem('tasks'))
      this.setState({
        tasks: tasks
      })
    
  }

}
createId () {
  return '_' + Math.random().toString(36).substr(2, 9)
}
onDisplayTaskForm = () => {
  if(this.state.isDisplayForm && this.state.taskEdit!== null) {
    this.setState({
      isDisplayForm: true,
      taskEdit : null
    })


  }
  else
    {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEdit : null
      })

    }
  
}
onCloseTaskForm = () => {
  this.setState({
    isDisplayForm:false,
    taskEdit: null
  })
}
onShowTaskForm = () => {
  this.setState({
    isDisplayForm:true
  })
}

onSubmit = (data) => {
  let tasks = this.state.tasks
 
  
  if(data.id === "") {  
    data.id = this.createId();
    tasks = tasks.concat(data);

  }
  else {
      for(var i = 0 ; i < tasks.length; i++) {
        if(data.id === tasks[i].id) 
        {

          tasks[i] = data
        }
      }
      
    }
  

  
  this.setState({
    tasks: tasks
  })
  localStorage.setItem('tasks', JSON.stringify(tasks)) 
}
onChangeStatus = (index) => {
  let tasks = this.state.tasks
  let indexOf = tasks.indexOf(index)
  tasks[indexOf].status = !tasks[indexOf].status
  this.setState ({
    tasks: tasks
  })
  localStorage.setItem('tasks', JSON.stringify(tasks)) 

}
onDeleteItem = (index) => {
  let tasks = this.state.tasks
  let indexOf = tasks.indexOf(index)
   tasks.splice(indexOf,1)
   localStorage.setItem('tasks', JSON.stringify(tasks)) 
   this.setState ({
    tasks: tasks
  })


}
onUpdate = (item) => {
  
  let tasks = this.state.tasks
  let indexOf = tasks.indexOf(item)
  
  this.setState({
    taskEdit: tasks[indexOf]
  })
 

  this.onShowTaskForm()
  

}
onChange = (event) => {
 
   let target = event.target
  let name = target.name
   let value = target.value
   
   this.setState({
     [name] : value
   })
   
  
}


  render() {

    var {isDisplayForm,tasks,taskEdit,name,sort} = this.state
    if(name) {
      tasks = tasks.filter( (task) => { return task.name.indexOf(name)!= -1})

    }
   else if(sort ==="1") {
     tasks = tasks.filter(task => task.status === false)
     
    
   }
   else if(sort ==="2") {
    tasks = tasks.filter((task) => task.status === true )
  }
  else if(sort ==="3") {
    tasks = tasks.sort((a, b) => (a.name > b.name) ? 1 : -1)
  }
  else if(sort ==="4"){
    tasks = tasks.sort((a, b) => (a.name < b.name) ? 1 : -1)
  }
   
    const elTaskFrom =
     isDisplayForm ? 
     <TaskForm
      onCloseTaskForm = { this.onCloseTaskForm}
      onSubmit = {this.onSubmit}
      taskEdit = {taskEdit} /> : ''
      
      let elTask = tasks.map((item,index) => 
        <TaskList item = {item}
                  key ={index} 
                  index = {index} 
                  onChangeStatus = {this.onChangeStatus} 
                  onDeleteItem = {this.onDeleteItem}
                  onUpdate = {this.onUpdate}
                  />
      )
    return (
      <div className="App">
        

        <div className = "container">
          <h1>TodoList</h1>
          <Row>
            <Col xs={isDisplayForm ? "4" : "0"}>
              {elTaskFrom}

            </Col>
            <Col xs={isDisplayForm ? "8" : "12"}>
              <Row>
                <Col xs={isDisplayForm ? "6" : "6"}>
                  <InputGroup>
                      <Input onChange = {this.onChange} name = "name" />
                     
                      <Button  type = "submit" outline color="secondary">Search</Button>{' '}
                      
                  </InputGroup>
                </Col>
                <Col xs={isDisplayForm ? "4" : "4"} >
                  <Button  type = "submit" outline color="secondary">
                    <span onClick= {this.onDisplayTaskForm} >Add</span>
                    
                  </Button>{' '}
                </Col>
                <Col xs={isDisplayForm ? "1" : "2"}>
                <select onChange = {this.onChange} id = "dropdown" name = "sort">
                  <option value="Sort">Sort</option>
                  <option value="1">Hide</option>
                  <option value="2">Active</option>
                  <option value="3">A-Z</option>
                  <option value="4">Z_A</option>
                </select>
              
                </Col>
  
              </Row>
              <Table className ="mt-50">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th className="title">Title</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {elTask}
                  
                 
                </tbody>
               </Table>
              
  
            </Col>
          </Row>
        </div>
        
      </div>
    );

  }

}

export default App;
