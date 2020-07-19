import React, {  Component } from 'react';
import {Button} from 'reactstrap'
 


class TaskList extends Component {
    constructor(props) {
        super()
    }
    onChangeStatus = ()=> {
        this.props.onChangeStatus(this.props.item)


}    
    onDeleteItem = () => {
        this.props.onDeleteItem(this.props.item)
    }
    onUpdate = () => {
        this.props.onUpdate(this.props.item)
    }

    
    render() {
        return(
            <tr>
            <th scope="row">{this.props.index+1}</th>
            <td>{this.props.item.name}</td>
            <td> <Button onClick = {this.onChangeStatus }color={this.props.item.status ? "success" : "danger" }>{this.props.item.status ? "Active" : "Hide"}</Button>{' '}</td>
            <td><Button type = "button" outline color="secondary" onClick ={this.onUpdate} >Edit</Button>{' '}
            <Button onClick = {this.onDeleteItem}  outline color="secondary">Delete</Button>{' '}</td>
          </tr>
        )
    }

}
export default TaskList