import styled, {css} from "styled-components";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import {PaginationProps, PageButtonsProps } from '../../assets/interface/Mypage.interface'
function Pagination({data, currentPage, onPageChange}:PaginationProps) {
  console.log(data)
   const  totalPages  = data.pageInfo.totalPage;
   const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const goToPage = (page:number) => {
    onPageChange(page);
  };
 
    return (
      <>
      <Nav>
        <PrevButton onClick={goToPreviousPage}><AiOutlineArrowLeft/></PrevButton>
        {totalPages === 0 ? (
          <PageButtons key={1} onClick={() => goToPage(1)} active={currentPage === 1}>
            1
          </PageButtons>
        ) : (
          Array.from(Array(totalPages), (_, index) => index + 1).map((page) => (
            <PageButtons key={page} onClick={() => goToPage(page)} active={page === currentPage}>
              {page}
            </PageButtons>
          ))
        )}
        <NextButton onClick={goToNextPage}><AiOutlineArrowRight/></NextButton>
      </Nav>
        
      </>
    );
  }
export default Pagination;

const baseButtonStyles = css`
  width: 30px;
  height: 30px;
  background-color: var(--gray);
  border: 1px solid var(--light-gray);
  color: var(--dark-gray);
  border-radius: 50%;
  margin: 0 0.2rem;
  
`;

const PrevButton = styled.button<PageButtonsProps>`
  ${baseButtonStyles}  
  :hover {
    background-color: #ccc;
    transition: all 0.3s ease;
  }  
`;

const NextButton = styled.button<PageButtonsProps>`
  ${baseButtonStyles}
  :hover {
    background-color: #ccc;
    transition: all 0.3s ease;
  }  
`;

const PageButtons = styled.button<PageButtonsProps>`
  ${baseButtonStyles}
  color: var(--white);
  background-color: ${({ active }) => (active ? 'var(--blue-purple)' : 'var(--purple)')};
  &:hover {
    background-color: ${({ active }) => (active ? 'var(--blue-purple)' : '#8d8ad3')};
    transition: all 0.3s ease;
  }
`;

const Nav = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;