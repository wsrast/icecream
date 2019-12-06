import React from 'react';
import styled from 'styled-components/macro';

export const TextFieldStyled = styled.label`
	padding: 1em 2em;
`;

const TextField = props => {
	const { label, location, onChange, placeholder, id } = props;

	return (
		<TextFieldStyled {...props}>
			{label}
			<input
				type="text"
				name={id}
				id={id}
				value={location}
				placeholder={placeholder}
				onChange={onChange}
			/>
			<br />
		</TextFieldStyled>
	);
};
export default TextField;
