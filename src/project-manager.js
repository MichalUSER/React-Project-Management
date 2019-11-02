import React from 'react'
import ProjectList from './project-list'

class ProjectManager extends React.Component {
    constructor() {
        super()
        this.state = { lists: [], listName: "", addListStyle: "invisible", showAddListStyle: "showAddList unselectable" }
    }

    handleChange = (event) => {
        let { value, name } = event.target
        this.setState({ [name]: value })
    }

    showAddList = () => {
        this.setState({ addListStyle: "addList", showAddListStyle: "invisible" })
    }

    hideAddList = () => {
        this.setState({ addListStyle: "invisible", showAddListStyle: "showAddList unselectable", listName: "" })
    }

    addList = () => {
        if (this.state.listName !== "" && this.state.listName.length < 25) {
            this.state.lists.push([this.state.lists.length, this.state.listName])
            this.setState({ listName: "", addListStyle: "invisible", showAddListStyle: "showAddList unselectable" })
        }
    }
    addListKey = (event) => {
        if (event.key === "Enter") {
            if (this.state.listName !== "" && this.state.listName.length < 25) {
                this.state.lists.push([this.state.lists.length, this.state.listName])
                this.setState({ listName: "", addListStyle: "invisible", showAddListStyle: "showAddList unselectable" })
            }
        } else if (event.key === "Escape") {
            this.setState({ addListStyle: "invisible", showAddListStyle: "showAddList unselectable", listName: "" })
        }
    }

    deleteList = (id) => {
        delete this.state.lists[id]
        this.setState({})
    }
    editList = (id, editListName) => {
        this.state.lists[id][1] = editListName
        this.setState({})
    }

    render() {
        /*
            <div className="infoBar">
                <p className="projectName">Project</p>
                <p className="logo">Logo</p>
            </div>
        */

        const projectLists = this.state.lists.map(projectlist => <ProjectList name={projectlist[1]} id={projectlist[0]} deleteList={this.deleteList} editList={this.editList} />)
        return (
            <div>
                <div className="hbox">
                    {projectLists}
                    <div className={this.state.addListStyle}>
                        <input type="text" className="addListInput" name="listName" value={this.state.listName} placeholder="Enter list title..." onChange={this.handleChange} onKeyDown={this.addListKey} />
                        <p className="addListButton unselectable" onClick={this.addList}>Add List</p>
                        <p className="fa fa-times hideListButton" onClick={this.hideAddList}></p>
                    </div>
                    <div className={this.state.showAddListStyle} onClick={this.showAddList}>
                        <p>Add another list</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectManager