import Pagination from 'react-bootstrap/Pagination';

const pageStyle = {
    color: '#bfbfbf',
    background: '#222222',
    borderRadius: '17px',
    borderColor: '#303030',
    marginLeft: '5px'
};

const activePageStyle = {
    color: 'black',
    background: '#c2ccc3',
    borderRadius: '17px',
    borderColor: '#303030',
    marginLeft: '5px'
};

const nextPrevLinkStyle = {
    color: '#bfbfbf',
    background: '#222222',
    borderRadius: '17px',
    borderColor: '#303030',
    marginLeft: '6px'
};

function ListPagination({number, pageCount, onPageClick, startPage, endPage, first, last}) {
    console.log({number, pageCount, onPageClick, startPage, endPage, first, last});
    let active = number;
    let items = [];
    let isLastSection = false;

    for (let index = startPage - 1; index < endPage; index++) {
        if (index === pageCount) {
            isLastSection = true;
        }
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
            <Pagination size='sm'>
                {(startPage > 10) && <Pagination.Prev
                    onClick={() => onPageClick(startPage - 2)}
                    linkStyle={nextPrevLinkStyle}
                />}
                {items}
                {!isLastSection && <Pagination.Next
                    onClick={() => onPageClick(endPage)}
                    linkStyle={nextPrevLinkStyle}
                />}
            </Pagination>
        </div>
    )
};

export default ListPagination;
