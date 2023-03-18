import React, { useEffect, useState } from "react";


const List = () => {
	const [tareas, setNueva] = useState ([]);
	const [input, setInput] = useState ("");
	
	function Actualizar() { 
		var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify(tareas);

			var requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
			};

			fetch("http://assets.breatheco.de/apis/fake/todos/user/nmoz88", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));

	}
    useEffect (()=>{
        fetch("http://assets.breatheco.de/apis/fake/todos/user/nmoz88")
			.then((response) => response.json())
      		.then((data) => setNueva(data))
			
			console.log(tareas);
    },[]);
	
	useEffect (()=>{
		Actualizar();
	},[tareas]);

	return (
		<div className="container">
			
			<h1>Todo List</h1>
			<form onSubmit={(event)=>{
				event.preventDefault();
				setNueva([...tareas,event.target[0].value])
				setInput("")
			}}>
				<li>
				<input 
					placeholder="ingrese su tarea" 
					value={input} onChange={(event)=>{setInput(event.target.value)}}
				/>
				</li>
			</form>
			
			
			{tareas.map((value,index,arr)=>{
				return <li key={index}>{value.label} 
					<i  class="far fa-trash-alt" 
						onClick={() => setNueva(tareas.filter((value, currentIndex) => index != currentIndex))}>
						
					</i></li>		
			})}
			<div>{tareas.length} task</div>
		</div>
		
	);
};

export default List;