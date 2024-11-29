import './PasswordItem.css'
const Passworditem = props => {
  const {Details, ischecked, updatetheList} = props
  const {id, websiteName, username, password} = Details
  const onDeleteitem = () => {
    updatetheList(id)
  }
  return (
    <li>
      <p>{websiteName}</p>
      <p>{username}</p>
      {ischecked ? (
        <p>{password}</p>
      ) : (
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          alt="stars"
        />
      )}
      <button type="button" onClick={onDeleteitem} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default Passworditem
