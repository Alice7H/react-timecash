export default function TextError(props) {
    return (
        <div className='error' style={{color: "red"}}>
            {props.children}
        </div>
    )
}
