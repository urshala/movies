import React from 'react';
import './dropdown.css';

const Dropdown = ({genres, onGenreChange}) =>{
		return(
			<div className="selection">
				<label>Genre</label>
				<select name="select"  onChange={onGenreChange}>
					{genres.map(genre =>
						<option value={genre.name} key={genre.id}>{genre.name}</option>
					)}
				</select>
			</div>
		)
	}

export default Dropdown;