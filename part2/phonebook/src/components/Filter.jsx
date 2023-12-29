const Filter =({filter, onFilterChange})=> {

  return (
    <label>Filter: <input type="search" value={filter} onChange={onFilterChange} /></label>
  )
}

export default Filter;