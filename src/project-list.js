import React from 'react'

class ProjectList extends React.Component {
    constructor() {
        super()
        this.state = { projects: [], currentProjectId: 0, projectName: "", editProjectName: "", editListName: "", showAddProjectStyle: "project-list-showaddproject unselectable", addProjectStyle: "invisible", editProjectStyle: "invisible", editListStyle: "invisible" }
    }

    deleteProject = (id) => {
        delete this.state.projects[id]
        this.setState({})
    }
    editProject = () => {
        if (this.state.editProjectName !== "" && this.state.editProjectName.length < 25) {
            this.state.projects[this.state.currentProjectId][0] = this.state.editProjectName
            this.setState({ editProjectName: "", editProjectStyle: "invisible" })
        } else {
            this.setState({ editProjectName: "", editProjectStyle: "invisible" })
        }
    }
    showEditProject = (id) => {
        this.setState({ currentProjectId: id, editProjectStyle: "project-list-editProject center" })
    }
    ProjectItem = (props) => {
        return (
            <div className="project-list-item">
                <div className={this.state.editProjectStyle}>
                    <input type="text" className="project-list-editProjectInput" name="editProjectName" value={this.state.editProjectName} placeholder="Rename to" onChange={this.handleChange} />
                    <p className="project-list-renameProjectButton unselectable" onClick={this.editProject}>OK</p>
                </div>
                <p className="fa fa-trash-o project-item-delete" onClick={() => this.deleteProject(props.id)}></p>
                <p className="fa fa-pencil project-item-edit" onClick={() => this.showEditProject(props.id)}></p>
                <p>{props.name}</p>
            </div>
        )
    }

    handleChange = (event) => {
        let { value, name } = event.target
        this.setState({ [name]: value })
    }

    showAddProject = () => {
        this.setState({ showAddProjectStyle: "invisible", addProjectStyle: "project-list-addproject" })
    }
    hideAddProject = () => {
        this.setState({ showAddProjectStyle: "project-list-showaddproject unselectable", addProjectStyle: "invisible" })
    }

    addProject = () => {
        if (this.state.projectName !== "" && this.state.projectName.length <= 25) {
            this.state.projects.push([this.state.projectName, this.state.projects.length])
            this.setState({ projectName: "" })
            this.setState({ showAddProjectStyle: "project-list-showaddproject unselectable", addProjectStyle: "invisible" })
        }
    }
    addProjectKey = (event) => {
        if (event.key === 'Enter') {
            if (this.state.projectName !== "" && this.state.projectName.length <= 25) {
                this.state.projects.push([this.state.projectName, this.state.projects.length])
                this.setState({ projectName: "" })
                this.setState({ showAddProjectStyle: "project-list-showaddproject unselectable", addProjectStyle: "invisible" })
            }
        } else if (event.key === 'Escape') {
            this.setState({ projectName: "" })
            this.setState({ showAddProjectStyle: "project-list-showaddproject unselectable", addProjectStyle: "invisible" })
        }
    }

    editList = () => {
        if (this.state.editListName !== "" && this.state.editListName.length <= 10) {
            this.props.editList(this.state.currentListId, this.state.editListName)
            this.setState({ editListName: "", editListStyle: "invisible" })
        } else {
            this.setState({ editListName: "", editListStyle: "invisible" })
        }
    }
    showEditList = (id) => {
        this.setState({ currentListId: id, editListStyle: "editList center" })
    }

    render() {
        const projects = this.state.projects.map(project => <this.ProjectItem name={project[0]} id={project[1]} />)
        return (
            <div className="project-list">
                <div className={this.state.editListStyle}>
                    <input type="text" className="editListStyleInput" name="editListName" value={this.state.editListName} placeholder="Rename to" onChange={this.handleChange} />
                    <p className="editListButton unselectable" onClick={this.editList}>OK</p>
                </div>

                <p className="project-list-name">{this.props.name}</p>
                <p className="fa fa-trash-o project-list-delete" onClick={() => this.props.deleteList(this.props.id)}></p>
                <p className="fa fa-pencil showEditListButton" onClick={() => this.showEditList(this.props.id)}></p>
                <div className="region1"></div>
                {projects}
                <div className={this.state.addProjectStyle}>
                    <input type="text" className="project-list-addProjectInput" name="projectName" value={this.state.projectName} placeholder="Enter a title for this card..." onChange={this.handleChange} onKeyDown={this.addProjectKey} />
                    <p className="project-list-addProjectButton unselectable" onClick={this.addProject}>Add List</p>
                    <p className="fa fa-times project-list-hideProjectButton" onClick={this.hideAddProject}></p>
                </div>
                <p className={this.state.showAddProjectStyle} onClick={this.showAddProject}>Add Another Card</p>
            </div>
        )
    }
}

export default ProjectList