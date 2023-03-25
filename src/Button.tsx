type ButtonPropsType = {
    onClickHandler: ()=> void
    className?:string
    children: React.ReactNode
}

const Button = ({children, className, onClickHandler}:ButtonPropsType) =>{
    return(
    <button onClick={onClickHandler} className={className}>
        {children}
    </button>
    )
}

export default Button