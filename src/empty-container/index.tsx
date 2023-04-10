export const EmptyContainer = () => {
    const max = 300;
    const height = Math.floor(Math.random() * max);

    return (
        <div style={{width: '100%', height: `${height}px`, border: '1px solid red'}}>

        </div>
        )
}