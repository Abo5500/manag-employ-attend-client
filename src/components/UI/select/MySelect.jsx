const MySelect = ({options, defaultValue, value, onChange, ...props}) => {
    return (
        <select style={{border: '1px solid teal'}} value={value} onChange={e => onChange(e.target.value)} {...props}>
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>
            )}
        </select>
    );
}

export default MySelect;