type ButtonPropsType = {
    onClickHandler: (e:any)=> void
    className?:string
    children: React.ReactNode
}

const Button = ({children, className, onClickHandler}:ButtonPropsType) =>(
    <button onClick={onClickHandler} className={className}>
        {children}
    </button>
)

export default Button