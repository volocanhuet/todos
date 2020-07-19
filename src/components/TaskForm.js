import React, {  Component } from 'react';
import {Toast,ToastBody,ToastHeader,Form,Button} from'reactstrap'
import X from "../x.svg"


class TaskForm extends Component {
    constructor(props) {
        super()
    
    this.state = {

        id : "",   
        name  : "",
        status : true,
        
    }

    }
componentWillMount() {
  if(this.props.taskEdit) {
    this.setState({
      id : this.props.taskEdit.id,
      name : this.props.taskEdit.name,
      status : this.props.taskEdit.status
    })
  }
  }
  componentWillReceiveProps(props) {
    
    if(props && props.taskEdit) {
      this.setState({
        id : props.taskEdit.id,
        name : props.taskEdit.name,
        status : props.taskEdit.status
      })

    }
    else if(!props.taskEdit) {
      this.setState({
        id : "",   
        name  : "",
        status : 
        true,
      })
    }
    
  }
  
onCloseForm = () =>{
    this.props.onCloseTaskForm()

}
onChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.value    
    if(name ==="status") {
        value =  target.value ==="true" ? true : false 
    }
   
      this.setState({
        [name] : value
    
    })  
}

onSubmit = (event) => {
    event.preventDefault();
    this.setState({
       name : ""
  
  })
  this.props.onCloseTaskForm()
  this.props.onSubmit(this.state)
    
}
onClear = () => {
  this.setState({
    name : "",
    status : true
    
  })
}
    render() {
        return(
            <Toast>
            <ToastHeader >
        <span> {this.state.name !== "" ?  "Change item" : "Add new to do"}</span>
              <span onClick= {this.onCloseForm}className="x-icon"><img src ={X} width = {12} height ={12}></img></span>
              
            </ToastHeader>
            <ToastBody>
              <Form onSubmit = {this.onSubmit}>
                <div className="form-group">
                  <label >Title :</label>
                  <input onChange = {this.onChange} value = {this.state.name} type="text" name = "name" className="form-control"></input>
                </div>
                <label>Status</label>
                <select onChange = {this.onChange} className="form-control" required="required" name="status">
                  <option value="true">Active</option>
                  <option value="false">Hide</option>
                </select>
                <div className = "button">
                  <Button type = "submit" outline color="secondary">
                    Add
                    
                    </Button>{' '}
                  <Button onClick = {this.onClear} type = "submit" outline color="secondary">Cancel</Button>{' '}
                </div>

              </Form>
            </ToastBody>
        </Toast>
        )
    }
}
export default TaskForm