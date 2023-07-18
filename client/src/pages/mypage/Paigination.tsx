import styled, {css} from "styled-components";
import {useState} from "react";
import { ButtonHTMLAttributes } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
interface Product {
    cartId: number;
    productId: number;
    productName: string;
    productImagePath: string;
    productPrice: number;
    productCount: number;
  }
  
  interface OrderData {
    orderId: number;
    orderProducts: Product[];
    totalPrice: number;
    orderTimestamp: string;
    deliveryStatus: string;
  }
  
  interface PageInfo {
    page: number;
    size: number;
    totalElement: number;
    totalPage: number;
  }
  
  interface Data {
    orderdata: OrderData[];
    pageInfo: PageInfo;
  }

interface PaginationProps {
    data: Data; 
  }
interface PageButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
  }
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
        {Array.from(Array(totalPages), (x, index) => index + 1).map((page) => (
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
  :hover {
    background-color: var(--light-gray);
    transition: all 0.5s ease;
  }
  
`;

const PrevButton = styled.button<PageButtonsProps>`
  ${baseButtonStyles}
  
`;

const NextButton = styled.button<PageButtonsProps>`
  ${baseButtonStyles}
`;

const PageButtons = styled.button<PageButtonsProps>`
  ${baseButtonStyles}
  color: var(--white);
  background-color: ${({ active }) => (active ? 'var(--purple)' : 'gray')};
  :hover{
    background-color: var(--blue-purple);
    transition: all 0.5s ease;
  }
`;

const Nav = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;