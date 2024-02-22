const Filter = ({ search, onChange }) => {
  return (
    <div>
      filter shown with<input name="pbfilter" value={search} onChange={onChange} />
    </div>
  )
}
export default Filter