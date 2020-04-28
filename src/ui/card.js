import React from 'react';
import {Redirect} from "react-router-dom";


class Card extends React.Component{
    state = {
        redirect: false
    }
   
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect push
          to={{pathname: "/ingredients/"+this.props.recipe.id,}
          } />
        }
      }
    render(){
        
        return(
            <div className="card" onClick={()=>{this.setState({redirect: true })
            }}>
                {this.renderRedirect()}
                <div className="cardTitle">
                    {this.props.recipe.name}
                </div>
                <div className="cardDiscription">
                    {this.props.recipe.discription}
                </div>
            </div>
        )
    } 
}


export default Card;