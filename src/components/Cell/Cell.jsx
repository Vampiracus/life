import './Cell.css'

function Cell({ isAlive, onClick }) {
    return (
        <div 
        onClick={onClick}
        className={"matrix__cell " + (isAlive ? 'matrix__cell_alive' : '')}
        />
    );
}

export default Cell