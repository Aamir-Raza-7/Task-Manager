const Button = ({text = "Submit", onClick}) => {
    return (
        <div className="button-container">
            <button onClick={onClick}>{text}</button>
        </div>
    )
}
export default Button