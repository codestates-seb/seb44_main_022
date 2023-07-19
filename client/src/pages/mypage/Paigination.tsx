import styled, {css} from "styled-components";
import {useState} from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import {PaginationProps, PageButtonsProps } from '../../assets/interface/Mypage.interface'
function Pagination({data}:PaginationProps) {
// const numPages = Math.ceil(total / limit);
   const [currentPage, setCurrentPage] = useState(1);
   const  totalPages  = data.pageInfo.totalPage;
//    const handlePageChange = (page:number) => {
//      setCurrentPage(page);
//    };
   const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToPage = (page:number) => {
    setCurrentPage(page);
  };
 
    return (
      <>
      <Nav>
        <PrevButton onClick={goToPreviousPage}><AiOutlineArrowLeft/></PrevButton>
        {Array.from(Array(totalPages), (_, index) => index + 1).map((page) => (
        <PageButtons
          key={page}
          onClick={() => goToPage(page)}
          active={page === currentPage}
        >
          {page}
        </PageButtons>
      ))}
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
    background-color: var(--light-gray);
    transition: all 0.5s ease;
  }  
`;

const NextButton = styled.button<PageButtonsProps>`
  ${baseButtonStyles}
  :hover {
    background-color: var(--light-gray);
    transition: all 0.5s ease;
  }  
`;

const PageButtons = styled.button<PageButtonsProps>`
  ${baseButtonStyles}
  color: var(--white);
  background-color: ${({ active }) => (active ? 'var(--blue-purple)' : 'var(--purple)')};
`;

const Nav = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;