import React, { useEffect, useState } from 'react';
import './DataList.css';
import ReactPaginate from 'react-paginate';

const DataList = () => {
  const [userList, setUserList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=209')
      .then((res) => res.json())
      .then((data) => setUserList(data.results));
    //.catch(error=>console.error(error))
  }, []);

  const displayUsers = userList
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <div className='col-md-4 my-5' key={user.id.value}>
          <div className='card h-100 user-card'>
            <img
              src={user.picture.medium}
              alt='Card cap'
              className='card-img-top img-fluid'
            />
            <div className='card-body text-left'>
              <h4 className='card-title text-center'>
                {user.name.first + ' ' + user.name.last}
              </h4>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p className='text-capitalize'>Gender: {user.gender}</p>

              <p>Country: {user.location.country}</p>
            </div>
          </div>
        </div>
      );
    });
  const pageCount = Math.ceil(userList.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className='container'>
      <h2 className='my-3'> Random Users information</h2>
      <div className='d-flex justify-content-center'>
        <div className='row mb-5'>
          {displayUsers}

          {/* {
             userList.map((user) => (
                <div className='col-md-4 my-5' key={user.id.value}>
                <div className='card h-100 user-card'>
                <img
          src={user.picture.medium}
          alt='Card cap'
          className='card-img-top img-fluid'
        />
                    <div className='card-body'>
                      <h4 className='card-title'>
                        {user.name.first + ' ' + user.name.last}
                      </h4>
                      <h4>{user.email}</h4>
                      <h4>{user.gender}</h4>
                      <h4>{user.phone}</h4>
                      <h4>{user.location.country}</h4>
                    </div>
                  </div>
                </div>
              ))
          } */}
        </div>
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
    </div>
  );
};

export default DataList;
