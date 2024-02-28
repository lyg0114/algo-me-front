import Pagination from 'react-bootstrap/Pagination';


const pageStyle = {
    color: '#bfbfbf',
    background: '#222222',
    borderRadius: '10px',
    borderColor: '#303030',
    marginLeft: '6px'
};

const activePageStyle = {
    color: 'black',
    background: '#c2ccc3',
    borderRadius: '10px',
    borderColor: '#303030',
    marginLeft: '6px'
};

function ListPagination() {
    let active = 5;
    let items = [];
    for (let number = 1; number <= 10; number++) {
        items.push(
            <Pagination.Item
                key={number}
                linkStyle={number === active ? activePageStyle : pageStyle}
            >
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    )
};

export default ListPagination;
