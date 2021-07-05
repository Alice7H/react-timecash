export default function TextError(props) {
    // used only in input generic
    return (
        <div className='error' style={{color: "red"}}>
            {props.children}
        </div>
    )
}
