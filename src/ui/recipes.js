import React from 'react';
import {Link} from "react-router-dom";
import Card from './card';


class Recipes extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            recipes:[],
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
    
    componentWillMount() { 
        if(this.storageAvailable('localStorage')) { 
            //localStorage.setItem('recipes', JSON.stringify(mockRecipes))
            const localRef = localStorage.getItem('recipes', JSON.stringify(this.state.recipes)) 
            if(localRef) { 
                const recipes = JSON.parse(localRef);       
                this.setState({ recipes:recipes }) 
            } 
        } else {
            console.error('Your browser doesn\'t support local storage'); 
        } 
    }
 
    render(){
        return(
            <div style={this.BgStyle} >
            <div >
                <Link to="/ingredients/new" className="addRecipe"> add recipie</Link>
            </div>
            <div className="CardsContainer">
                {this.state.recipes.map((rec)=> <Card recipe={rec} />)}
            </div>
            
        </div> 

        );
    }
  
    
}


export default Recipes;