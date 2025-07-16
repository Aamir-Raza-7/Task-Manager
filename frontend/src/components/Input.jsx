import "./Input.css"
const Input = ({label, type = "text", name, value, onChange})=>{
    return (
        <>
            <div className="input-container">
                <label htmlFor="">{label}</label>
                <input 
                    type={type} 
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    placeholder={`Enter your ${label}`}
                />
            </div>
        </>
    )
}
export default Input