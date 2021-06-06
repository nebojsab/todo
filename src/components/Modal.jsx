import React from "react";
import TodosForm from "./TodosForm";
import styled from "styled-components";

const ModalContent = styled.div`
    background: #efeeee;
    border-radius: 5px;
    z-index: 999;
    width: 100%;
    max-width: 420px;
    left: calc(50% - 210px);
    top: 150px;
    padding: 1em 2em 2em;
    position: absolute;
    box-shadow: 9px 9px 16px 9px rgba(0, 0, 0, 0.1),
        -9px -9px 9px 9px rgba(255, 255, 255, 0.5),
        9px 9px 20px 8px rgba(0, 0, 0, 0) inset,
        -9px -9px 18px 8px rgba(255, 255, 255, 0) inset;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.9);
    opacity: 0.75;
`;

const ButtonClose = styled.button`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #efeeee;
    cursor: pointer;
    box-shadow: 9px 9px 16px 9px rgba(0, 0, 0, 0.1),
        -9px -9px 9px 9px rgba(255, 255, 255, 0.5),
        9px 9px 20px 8px rgba(0, 0, 0, 0) inset,
        -9px -9px 18px 8px rgba(255, 255, 255, 0) inset;

    &::after {
        position: absolute;
        content: "";
        width: 10px;
        height: 1px;
        background: #000;
        transform: rotate(45deg);
    }

    &::before {
        position: absolute;
        content: "";
        width: 10px;
        height: 1px;
        background: #000;
        transform: rotate(-45deg);
    }
`;

export default function Modal({
    modalRef,
    modalVisible,
    toggleModal,
    date,
    title,
    description,
    category,
    handleSubmit,
    handleTitleOnChange,
    handleDescriptionOnChange,
    handleDateOnChange,
    handleCategoryOnChange,
}) {
    return modalVisible ? (
        <div id="modalEl">
            <ModalContent ref={modalRef}>
                <TodosForm
                    handleSubmit={handleSubmit}
                    handleTitleOnChange={handleTitleOnChange}
                    handleDescriptionOnChange={handleDescriptionOnChange}
                    handleDateOnChange={handleDateOnChange}
                    handleCategoryOnChange={handleCategoryOnChange}
                    title={title}
                    description={description}
                    date={date}
                    category={category}
                />
                <ButtonClose onClick={toggleModal}></ButtonClose>
            </ModalContent>
            <ModalOverlay />
        </div>
    ) : null;
}
