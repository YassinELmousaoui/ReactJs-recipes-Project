import React from 'react';
import {Redirect} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup'

class Ingredients extends React.Component{
    constructor(props) {
        super(props)
        if(this.props.match.params.id==="new"){
            this.editMode=true;
        }else{
            this.editMode=false;
        }
        this.state={
            editMode:this.editMode,
            redirect:false,
            nameValue:'',
            discriptionValue:'',
            ingredientValue:'',
            ingredientList:[],
            recipes:[],
        }
    };

    nameChangeHandler = (e)=>{
        this.setState({ nameValue: e.target.value });
    }
    discriptionChangeHandler = (e)=>{
        this.setState({ discriptionValue: e.target.value });
    }
    ingredientChangeHandler = (e)=>{
        this.setState({ ingredientValue: e.target.value });
    }

    addIngredientHandler = (event) => {
        event.preventDefault();
        const ingredientList = this.state.ingredientList;
        if(this.state.ingredientValue !== ''){
            ingredientList.push(this.state.ingredientValue);
            this.setState({ingredientList:ingredientList,ingredientValue:''})
        }       
    }
    removeIngredientHandler = (event) => {
        event.preventDefault();
        var array = [...this.state.ingredientList];
        var index = array.indexOf(event.target.value)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ingredientList: array});
        }
    }

    storageAvailable = (type) =>{
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    }
   
   
    componentWillUpdate(nextProps, nextState) { 
        if(this.storageAvailable('localStorage')) { 
            localStorage.setItem('recipes', JSON.stringify(nextState.recipes)) 
        } else { 
            console.error('Your browser doesn\'t support local storage'); 
        } 
        
    } 
    componentWillMount() { 
        if(this.storageAvailable('localStorage')) { 
            const localRef = localStorage.getItem('recipes', JSON.stringify(this.state.recipes)) 
            if(localRef) { 
                this.setState({ recipes: JSON.parse(localRef) }) 
            } 
        } else { 
            console.error('Your browser doesn\'t support local storage'); 
        } 
    }
    handelSave = (event) => {
        event.preventDefault();
        if(this.state.nameValue !=='' && this.state.discriptionValue!=='' && this.state.ingredientList.length>0){
            if(this.props.match.params.id==="new"){
                this.addRecipe()
            } else {
                this.editRecipe(this.props.match.params.id)
            }
            this.setState({redirect:true});
            
        } 
    }
    addRecipe = () => { 
        const recipes = this.state.recipes; 
        recipes.push( {
            id:recipes.length,
            name: this.state.nameValue,
            discription:this.state.discriptionValue,
            ingredients:this.state.ingredientList
        }); 
        this.setState({recipes:recipes}); 
    
        
    }
    editRecipe = (key) => { 
        const recipes = this.state.recipes;
        recipes[key].name=this.state.nameValue
        recipes[key].discription=this.state.discriptionValue
        recipes[key].ingredients=this.state.ingredientList
        this.setState({recipes:recipes}); 
        
    }
    handelEdit = (event,current ) => { 
        event.preventDefault();
        this.setState({
            editMode:true,
            nameValue:current.name,
            discriptionValue:current.discription,
            ingredientList:current.ingredients,
        });
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{pathname: "/",}} />
        }
    }

    handelDelete = (event ,recipe) => {
        event.preventDefault();
        const recipes = this.state.recipes; 
        var index = recipes.indexOf(recipe)
        if (index !== -1) {
            recipes.splice(index, 1);
            this.setState({recipes: recipes,redirect:true,editMode:true});
        }
        
    }
    
        
    render(){
        if(this.state.editMode){
            return(
                <div className="detailContainer editMode">
                     {this.renderRedirect()}
                    <Form>
                        
                        <Form.Group >
                            <Form.Label>Recipe Name </Form.Label>
                            <Form.Control type="text"  onChange={this.nameChangeHandler} value={this.state.nameValue}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Discription </Form.Label>
                            <Form.Control as='textarea' onChange={this.discriptionChangeHandler} value={this.state.discriptionValue}/>
                        </Form.Group>
                        <div>
                            {this.state.ingredientList.map((item,index) => {
                                return(
                                    <InputGroup key={index} className="mb-3">
                                        <Form.Control readOnly defaultValue={item} />
                                        <InputGroup.Append>
                                            <Button variant="secondary" onClick={this.removeIngredientHandler} value={item}>remove</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                )
                            })}
                        </div>
                        <InputGroup  className="mb-3">
                            <Form.Control type="text" onChange={this.ingredientChangeHandler} value={this.state.ingredientValue}/>
                            <InputGroup.Append>
                                <Button onClick={this.addIngredientHandler}>add ingredient</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Button onClick={this.handelSave} size="lg" block >Save</Button>
                    </Form>
                </div>
            );
        } else {
            const current =this.state.recipes.find((item)=>{
             return item.id == this.props.match.params.id?true:false})
            return(
                <div className="detailContainer">
                     {this.renderRedirect()}
                     <ButtonGroup size="lg" className="mb-2">
                        <Button onClick={(e)=>{this.handelEdit(e,current)}} className="EditButton" >Edit</Button>
                        <Button onClick={(e)=>{this.handelDelete(e,current)}} variant="danger" className="deleteButton">Delete</Button>
                     </ButtonGroup>
                    <h1 className="detailName">
                        {current.name}
                    </h1>
                    <div className="detailDiscription">
                        {current.discription}
                    </div>

                    <ListGroup >
                    <ListGroup.Item variant="secondary" className="ingredientName">Ingredients</ListGroup.Item>
                        {current.ingredients.map((item,index) => {
                            return(<ListGroup.Item className="ingredientItem" key={index}>{item}</ListGroup.Item>)
                        })}
                    </ListGroup>
                </div>
            )
        }
    };

    

   
}
export default Ingredients;