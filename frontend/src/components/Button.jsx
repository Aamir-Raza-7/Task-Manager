import '../components/Button.css'
const Button = ({ text = "Submit", onClick }) => {
    return (
        <button className='btn' onClick={onClick}>
            <span className='btn-text'>
                {text}
            </span>
        </button>
    )
}
export default Button