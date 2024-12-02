

export default function DropDown2({selectedValue, setSelectedValue}){
    const options = Array.from({ length: 12 }, (_, index) => index + 1);

    return (
      <div>
        <select 
          id="dropdown" 
          value={selectedValue || ''} 
          onChange={(event) => setSelectedValue(Number(event.target.value))}
        >
          <option value="" disabled>
            -- Select a month --
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
