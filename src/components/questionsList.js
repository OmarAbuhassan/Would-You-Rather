import React from 'react';
import Question from './question'

class List extends React.Component {



    render() {
        console.log(this.props)
        return (
            <div >

                {this.props.ids.map((id) => (
                    <li key={id}>
                        <Question id={id} />
                    </li>
                ))}


             </div>
        );
    }
}


export default (List);
