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

const nextPrevLinkStyle = {
    color: 'black',
    background: '#c2ccc3',
    borderRadius: '10px',
    borderColor: '#303030',
    marginLeft: '6px'
};

function ListPagination({number, pageCount, onPageClick, startPage, endPage, first, last}) {
    console.log({number, pageCount, onPageClick, startPage, endPage, first, last});
    let active = number;
    let items = [];

    for (let index = startPage - 1; index < endPage; index++) {
        items.push(
            <Pagination.Item
                key={index}
                onClick={() => onPageClick(index)}
                linkStyle={index === active ? activePageStyle : pageStyle}
            >
                {index + 1}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Pagination>
                {(startPage > 10) && <Pagination.Prev
                    onClick={() => onPageClick(startPage - 2)}
                    linkStyle={nextPrevLinkStyle}
                />}
                {items}
                {!last && <Pagination.Next
                    onClick={() => onPageClick(endPage)}
                    linkStyle={nextPrevLinkStyle}
                />}
            </Pagination>
        </div>
    )
};

export default ListPagination;
