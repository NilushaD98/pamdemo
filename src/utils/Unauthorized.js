
const divClasses = {
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333'
}

const h1Classes = {
    color: 'white',
    fontSize: '48px',
    fontWeight: 900
}

const Unauthorized = () => {


    return (
        <div style={divClasses}>
            <h1 style={h1Classes}>401 Unauthorized</h1>
        </div>
    );
}

export default Unauthorized;